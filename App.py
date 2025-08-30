<<<<<<< HEAD
# app.py
from flask import Flask, render_template, request, jsonify
=======

# app.py
from flask import Flask, render_template, request, jsonify, session, send_from_directory

>>>>>>> 964f08e96a84c8f5b6aba9bf5e6dec22594ab530
from utils.gemini_advisor import RegenerativeAdvisor
from utils.weather_service import WeatherService
from data.kenya_agriculture import KENYA_CROPS, SOIL_TYPES, KENYAN_REGIONS
import os
<<<<<<< HEAD

app = Flask(__name__)
advisor = RegenerativeAdvisor()
=======
from datetime import datetime
import google.generativeai as genai
import requests
import re
import json

app = Flask(__name__)
app.secret_key = os.environ.get('FLASK_SECRET_KEY', os.urandom(24))  # For session management

# Initialize services
try:
    advisor = RegenerativeAdvisor()
    print("✅ Gemini AI advisor initialized successfully")
except Exception as e:
    print(f"❌ Error initializing Gemini advisor: {e}")
    advisor = None

>>>>>>> 964f08e96a84c8f5b6aba9bf5e6dec22594ab530
weather_service = WeatherService()

# Inflection AI configuration
INFLECTION_API_KEY = "4ljCG368SMKUHcoPBbSe1BetnewoGvi2eI7o95ipos"
INFLECTION_API_URL = "https://api.inflection.ai/v1/chat/completions"

# Farming-related keywords to filter questions
FARMING_KEYWORDS = [
    'farm', 'farming', 'crop', 'soil', 'harvest', 'irrigation', 'fertilizer',
    'pesticide', 'organic', 'livestock', 'cattle', 'poultry', 'agriculture',
    'compost', 'tillage', 'crop rotation', 'permaculture', 'agroforestry',
    'hydroponics', 'aquaponics', 'greenhouse', 'seed', 'planting', 'growing',
    'regenerative', 'sustainable', 'cover crop', 'weed', 'pest', 'disease',
    'climate', 'weather', 'rainfall', 'drought', 'crop yield', 'harvesting',
    'storage', 'organic matter', 'nutrient', 'pH', 'soil health', 'erosion',
    'water management', 'crop diversity', 'pollination', 'bee', 'composting',
    'manure', 'crop protection', 'food security', 'rural', 'farm equipment',
    'tractor', 'plow', 'harvester', 'subsistence', 'commercial farming',
    'maize', 'beans', 'coffee', 'tea', 'wheat', 'barley', 'sorghum', 'millet',
    'cassava', 'potato', 'sweet potato', 'banana', 'sugarcane', 'cotton',
    'tomato', 'onion', 'cabbage', 'kale', 'spinach', 'carrot', 'avocado',
    'mango', 'orange', 'passion fruit', 'pineapple', 'papaya'
]

def is_farming_related(question):
    """Check if the question is related to farming"""
    if not question or not isinstance(question, str):
        return False
        
    question_lower = question.lower()
    
    # Check for farming keywords
    for keyword in FARMING_KEYWORDS:
        if keyword in question_lower:
            return True
    
    # Additional pattern matching for common farming questions
    farming_patterns = [
        r'.*(how to|what is|when to|where to|why).*(grow|plant|harvest|soil|crop).*',
        r'.*(best).*(for|to).*(crop|plant|soil|growth).*',
        r'.*(agricultur|farm|farmer|crop|harvest).*',
    ]
    
    for pattern in farming_patterns:
        if re.match(pattern, question_lower):
            return True
    
    return False

def convert_gemini_history_to_serializable(history):
    """Convert Gemini chat history to a JSON-serializable format"""
    serializable_history = []
    for item in history:
        # Extract text content from Gemini's response format
        if hasattr(item, 'parts'):
            parts_text = [part.text for part in item.parts if hasattr(part, 'text')]
            text = ' '.join(parts_text) if parts_text else ''
        elif hasattr(item, 'content'):
            text = item.content
        else:
            text = str(item)
            
        serializable_history.append({
            'role': getattr(item, 'role', 'unknown'),
            'content': text
        })
    return serializable_history

def convert_serializable_to_gemini_format(history):
    """Convert serialized history back to Gemini format"""
    gemini_history = []
    for item in history:
        # Create a simple object with the required attributes
        class SimpleMessage:
            def __init__(self, role, parts):
                self.role = role
                self.parts = parts
        
        class SimplePart:
            def __init__(self, text):
                self.text = text
        
        gemini_history.append(SimpleMessage(
            item['role'], 
            [SimplePart(item['content'])]
        ))
    return gemini_history

@app.route('/')
def home():
    """Main landing page"""
    return render_template('index.html', 
                         crops=list(KENYA_CROPS.keys()),
                         soil_types=list(SOIL_TYPES.keys()),
                         regions=KENYAN_REGIONS)

@app.route('/generate-plan', methods=['POST'])
def generate_plan():
    """Generate regenerative agriculture plan"""
    try:
        # Get form data
        farm_data = {
            'location': request.json.get('location', ''),
            'size': request.json.get('size', ''),
            'crops': request.json.get('crops', ''),
            'soil_type': request.json.get('soil_type', ''),
            'experience': request.json.get('experience', 'beginner'),
            'goals': request.json.get('goals', '')
        }
        
        # Get weather data
        weather_data = weather_service.get_location_weather(farm_data['location'])
        
        # Generate AI plan
        regenerative_plan = advisor.generate_farming_plan(farm_data, weather_data)
<<<<<<< HEAD
=======

        # Initialize chat history in session for the new plan (using serializable format)
        initial_message = f"""
            I am a smallholder farmer in {farm_data['location']} County, with a {farm_data['size']} acre farm, growing {farm_data['crops']} on {farm_data['soil_type']} soil. 
            My main goal is to {farm_data['goals']}. 
            Here is the plan you just generated for me:\n\n{regenerative_plan}
            Based on this, please answer my follow-up questions.
        """
        
        session['chat_history'] = [{
            'role': 'user',
            'content': initial_message
        }]
>>>>>>> 964f08e96a84c8f5b6aba9bf5e6dec22594ab530
        
        return jsonify({
            'success': True,
            'plan': regenerative_plan,
            'weather': weather_data,
<<<<<<< HEAD
            'farm_info': farm_data
        })
=======
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
    """API endpoint for chatbot conversation - now with Inflection AI integration"""
    try:
        data = request.get_json()
        user_message = data.get('message', '').strip()
        
        if not user_message:
            return jsonify({
                'success': False,
                'error': 'Empty message'
            }), 400
        
        # Check if the question is farming-related
        if not is_farming_related(user_message):
            return jsonify({
                'success': True,
                'response': "I'm sorry, but I'm designed to only answer farming-related questions. Please ask me about agriculture, crops, soil management, regenerative farming, or other farming topics."
            })
>>>>>>> 964f08e96a84c8f5b6aba9bf5e6dec22594ab530
        
        # Try Inflection AI first
        try:
            # Prepare the request to Inflection API
            headers = {
                'Authorization': f'Bearer {INFLECTION_API_KEY}',
                'Content-Type': 'application/json'
            }
            
            # System prompt to focus on farming responses with Kenyan context
            system_prompt = """You are an expert farming assistant specializing in regenerative agriculture, 
            sustainable farming practices, crop management, soil health, and all aspects of agriculture. 
            You have particular expertise in Kenyan farming conditions, crops, and challenges.
            Provide detailed, practical advice to farmers. If a question is not related to farming, 
            politely decline to answer and explain that you specialize in farming topics.
            Use simple, clear language appropriate for smallholder farmers."""
            
            payload = {
                "model": "inflection-2.5",
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_message}
                ]
            }
            
            # Make the API request to Inflection AI
            response = requests.post(INFLECTION_API_URL, headers=headers, json=payload, timeout=10)
            
            if response.status_code == 200:
                result = response.json()
                ai_response = result['choices'][0]['message']['content']
                return jsonify({
                    'success': True,
                    'response': ai_response
                })
            else:
                print(f"Inflection API failed with status {response.status_code}, falling back to Gemini")
                raise Exception("Inflection API failed")
                
        except Exception as inflection_error:
            print(f"Inflection API error: {inflection_error}")
            
            # Fall back to Gemini if Inflection fails
            if advisor:
                try:
                    # Get chat history from session and convert to Gemini format
                    serialized_history = session.get('chat_history', [])
                    
                    # Start a new chat session with the model
                    model = genai.GenerativeModel('gemini-1.5-flash')
                    
                    if serialized_history:
                        # Convert serialized history back to Gemini format
                        gemini_history = convert_serializable_to_gemini_format(serialized_history)
                        chat = model.start_chat(history=gemini_history)
                    else:
                        chat = model.start_chat(history=[])
                    
                    # Send user message and get response
                    response = chat.send_message(user_message)
                    
                    # Convert history to serializable format and update session
                    serializable_history = convert_gemini_history_to_serializable(chat.history)
                    session['chat_history'] = serializable_history
                    
                    return jsonify({
                        'success': True,
                        'response': response.text
                    })
                    
                except Exception as gemini_error:
                    print(f"Gemini fallback also failed: {gemini_error}")
                    return jsonify({
                        'success': False,
                        'error': 'Both AI services are temporarily unavailable. Please try again later.'
                    }), 500
            else:
                return jsonify({
                    'success': False,
                    'error': 'AI service temporarily unavailable. Please try again later.'
                }), 500
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f"Error generating plan: {str(e)}"
        }), 500

@app.route('/quick-tips', methods=['POST'])
def quick_tips():
    """Generate quick regenerative tips"""
    crop = request.json.get('crop', 'maize')
    soil = request.json.get('soil', 'loamy')
    
    prompt = f"""Give 3 practical regenerative agriculture tips for {crop} farming on {soil} soil in Kenya. Each tip should be one clear sentence."""
    
    try:
        model = advisor.model
        response = model.generate_content(prompt)
        return jsonify({'tips': response.text})
    except:
<<<<<<< HEAD
        return jsonify({'tips': 'Tips temporarily unavailable. Please try the full plan generator.'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
=======
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
        'weather_available': weather_service.api_key is not None,
        'inflection_available': INFLECTION_API_KEY is not None
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
    """Chatbot page - now fully functional"""
    return render_template('chatbot.html')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug_mode = os.environ.get('FLASK_ENV') == 'development'
    
    print(f"🌱 Kenya Agriculture Advisor starting on port {port}")
    print(f"🔗 Visit: http://localhost:{port}")
    print(f"🤖 Chatbot endpoint available at /api/chat")
    
    app.run(host='0.0.0.0', port=port, debug=debug_mode)
>>>>>>> 964f08e96a84c8f5b6aba9bf5e6dec22594ab530
