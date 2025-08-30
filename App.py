
# app.py
from flask import Flask, render_template, request, jsonify, session, send_from_directory

from utils.gemini_advisor import RegenerativeAdvisor
from utils.weather_service import WeatherService
from data.kenya_agriculture import KENYA_CROPS, SOIL_TYPES, KENYAN_COUNTIES
import os
from datetime import datetime
import google.generativeai as genai

app = Flask(__name__)
app.secret_key = os.urandom(24)  # For session management

# Initialize services
try:
    advisor = RegenerativeAdvisor()
    print("✅ Gemini AI advisor initialized successfully")
except Exception as e:
    print(f"❌ Error initializing Gemini advisor: {e}")
    advisor = None

weather_service = WeatherService()

@app.route('/')
def home():
    """Main landing page with farm input form"""
    return render_template('index.html', 
                         crops=KENYA_CROPS,
                         soil_types=SOIL_TYPES,
                         counties=sorted(KENYAN_COUNTIES),
                         current_year=datetime.now().year)

@app.route('/plan')
def plan_page():
    """Results page template"""
    return render_template('plan.html')

@app.route('/api/generate-plan', methods=['POST'])
def generate_plan():
    """API endpoint to generate regenerative agriculture plan"""
    try:
        if not advisor:
            return jsonify({
                'success': False,
                'error': 'AI advisor not available. Check API key configuration.'
            }), 500
        
        # Validate and extract form data
        data = request.get_json()
        required_fields = ['location', 'size', 'crops', 'soil_type']
        
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    'success': False,
                    'error': f'Missing required field: {field}'
                }), 400
        
        farm_data = {
            'location': data.get('location', '').strip(),
            'size': float(data.get('size', 0)),
            'crops': data.get('crops', ''),
            'soil_type': data.get('soil_type', ''),
            'experience': data.get('experience', 'beginner'),
            'goals': data.get('goals', 'improve_soil')
        }
        
        # Get weather data for the location
        weather_data = weather_service.get_agricultural_forecast(farm_data['location'])
        
        # Generate the regenerative plan using Gemini AI
        print(f"Generating plan for {farm_data['location']} - {farm_data['size']} acres")
        regenerative_plan = advisor.generate_farming_plan(farm_data, weather_data)

        # Initialize chat history in session for the new plan
        system_instruction = f"""
            You are Dr. Margaret Wanjiru, Kenya's leading regenerative agriculture specialist. 
            Your role is to act as a friendly, patient, and knowledgeable mentor to a smallholder farmer.
            Use simple, clear language. Do not use technical jargon unless you explain it.
            Always refer to the provided regenerative plan and the farmer's details to give context-aware answers.
            Do not provide new, un-related information.
            """
        
        session['chat_history'] = [{
            'role': 'user',
            'parts': [{'text': f"""
                I am a smallholder farmer in {farm_data['location']} County, with a {farm_data['size']} acre farm, growing {farm_data['crops']} on {farm_data['soil_type']} soil. 
                My main goal is to {farm_data['goals']}. 
                Here is the plan you just generated for me:\n\n{regenerative_plan}
                Based on this, please answer my follow-up questions.
            """}]
        }]
        
        return jsonify({
            'success': True,
            'plan': regenerative_plan,
            'weather': weather_data,
            'farm_data': farm_data,
            'generated_at': datetime.now().isoformat()
        })
        
    except ValueError as e:
        return jsonify({
            'success': False,
            'error': f'Invalid input: {str(e)}'
        }), 400
    except Exception as e:
        print(f"Unexpected error: {e}")
        return jsonify({
            'success': False,
            'error': 'An unexpected error occurred. Please try again.'
        }), 500

@app.route('/api/chat', methods=['POST'])
def chat():
    """API endpoint for chatbot conversation"""
    try:
        if not advisor:
            return jsonify({
                'success': False,
                'error': 'AI advisor not available.'
            }), 500

        data = request.get_json()
        user_message = data.get('message', '')
        
        # Get chat history from session
        chat_history = session.get('chat_history', [])

        # Start a new chat session with the model
        model = genai.GenerativeModel('gemini-1.5-flash')
        chat = model.start_chat(history=chat_history)
        
        # Send user message and get response
        response = chat.send_message(user_message)
        
        # Update session history
        session['chat_history'] = chat.history
        
        return jsonify({
            'success': True,
            'response': response.text
        })
        
    except Exception as e:
        print(f"Chatbot API error: {e}")
        return jsonify({
            'success': False,
            'error': 'I am sorry, I cannot answer that question right now. Please try again later.'
        }), 500


@app.route('/api/quick-tips', methods=['POST'])
def quick_tips():
    """Get quick regenerative tips for immediate use"""
    if not advisor:
        return jsonify({'tips': 'Service temporarily unavailable'})
    
    try:
        data = request.get_json()
        crop = data.get('crop', 'maize')
        soil = data.get('soil', 'loamy')
        
        tips = advisor.get_quick_tips(crop, soil)
        return jsonify({'success': True, 'tips': tips})
    except:
        return jsonify({'success': False, 'tips': 'Unable to generate tips at the moment'})

@app.route('/api/weather/<county>')
def get_weather(county):
    """Get weather data for specific county"""
    try:
        weather = weather_service.get_location_weather(county)
        return jsonify({'success': True, 'weather': weather})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/health')
def health_check():
    """Health check endpoint for deployment"""
    status = {
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'gemini_available': advisor is not None,
        'weather_available': weather_service.api_key is not None
    }
    return jsonify(status)

@app.errorhandler(404)
def not_found(error):
    return render_template('index.html'), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({'error': 'Internal server error'}), 500

@app.route('/dashboard')
def dashboard():
    """Dashboard page"""
    return render_template('dashboard.html')

@app.route('/RegAI/project/dashboard.html')
def regai_dashboard():
    """Serve the RegAI dashboard HTML file"""
    return send_from_directory('RegAI/project', 'dashboard.html')

@app.route('/regai')
def regai():
    """Redirect to RegAI React app"""
    return render_template('regai_redirect.html')

@app.route('/chatbot')
def chatbot():
    """Chatbot page - placeholder for future implementation"""
    return render_template('chatbot_placeholder.html')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug_mode = os.environ.get('FLASK_ENV') == 'development'
    
    print(f"🌱 Kenya Agriculture Advisor starting on port {port}")
    print(f"🔗 Visit: http://localhost:{port}")
    
    app.run(host='0.0.0.0', port=port, debug=debug_mode)
