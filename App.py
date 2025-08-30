from flask import Flask, render_template, request, jsonify
import json
import os

# Local utilities and knowledge base
from utils.gemini_advisor import RegenerativeAdvisor
from utils.weather_service import WeatherService
from data.kenya_agriculture import KENYA_CROPS, SOIL_TYPES, KENYAN_REGIONS

app = Flask(__name__)
advisor = RegenerativeAdvisor()
weather_service = WeatherService()

# === Routes === #

@app.route('/')
def home():
    """Main landing page"""
    return render_template(
        'index.html',
        crops=list(KENYA_CROPS.keys()),
        soil_types=list(SOIL_TYPES.keys()),
        regions=KENYAN_REGIONS
    )

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

        return jsonify({
            'success': True,
            'plan': regenerative_plan,
            'weather': weather_data,
            'farm_info': farm_data
        })

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
    except Exception:
        return jsonify({'tips': 'Tips temporarily unavailable. Please try the full plan generator.'})

@app.route('/chat', methods=['POST'])
def chat():
    """Handle chatbot questions using Gemini AI"""
    data = request.json
    question = data.get('question', '')
    plan_context = data.get('plan', '') # This can be used to give the AI more context if needed

    try:
        model = advisor.model
        
        # Prepare the prompt for the AI model
        prompt = f"""You are a helpful chatbot for a regenerative agriculture advisor app in Kenya. Your goal is to provide concise, friendly, and practical advice to small-scale farmers based on their questions.
        
        Context about the user's farm plan: {plan_context}
        
        User's question: {question}
        
        Provide a relevant and helpful response."""
        
        # Call the Gemini AI model to generate a response
        response = model.generate_content(prompt)
        
        return jsonify({'reply': response.text})
    
    except Exception as e:
        return jsonify({'reply': 'Sorry, I am unable to provide a response right now. Please try again later.'})


if __name__ == '__main__':
    app.run(debug=True, port=5000)
