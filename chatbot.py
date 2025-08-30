from flask import Flask, render_template, request, jsonify
from datetime import datetime
import json
import os

# Local utilities and knowledge base
from utils.gemini_advisor import RegenerativeAdvisor
from utils.weather_service import WeatherService
from data.kenya_agriculture import KENYA_CROPS, SOIL_TYPES, KENYAN_REGIONS

app = Flask(_name_)
advisor = RegenerativeAdvisor()
weather_service = WeatherService()

# === Knowledge Base === #
AGRICULTURE_KNOWLEDGE = {
    "crops": {
        "maize": {
            "regenerative_practices": [
                "Practice intercropping with legumes like beans to fix nitrogen",
                "Use cover crops during off-season to protect soil",
                "Apply organic mulch to retain moisture and suppress weeds",
                "Rotate with other crops every 2-3 seasons"
            ],
            "soil_health": [
                "Add compost or well-decomposed manure before planting",
                "Minimize tillage to preserve soil structure",
                "Plant diverse cover crops to improve soil biology"
            ],
            "pest_management": [
                "Use companion planting with crops like basil or marigold",
                "Encourage beneficial insects with flowering plants",
                "Apply neem oil or botanical extracts for natural pest control"
            ]
        },
        "beans": {
            "regenerative_practices": [
                "Excellent nitrogen-fixing crop for soil improvement",
                "Intercrop with maize for maximum land use efficiency",
                "Use rhizobium inoculants to enhance nitrogen fixation",
                "Practice crop rotation with cereals"
            ],
            "water_management": [
                "Mulch heavily to reduce water evaporation",
                "Plant during optimal rainfall periods",
                "Use drip irrigation if available"
            ]
        },
        "sorghum": {
            "regenerative_practices": [
                "Drought-tolerant crop excellent for climate resilience",
                "Deep roots help break soil compaction",
                "Leave crop residues to improve soil organic matter",
                "Intercrop with legumes for nitrogen fixation"
            ],
            "climate_adaptation": [
                "Choose drought-resistant varieties",
                "Plant early to catch maximum rainfall",
                "Use water harvesting techniques"
            ]
        },
        "sweet_potato": {
            "regenerative_practices": [
                "Excellent ground cover that suppresses weeds naturally",
                "Vines can be used as livestock feed",
                "Plant on ridges to improve drainage",
                "Use orange-fleshed varieties for better nutrition"
            ],
            "soil_improvement": [
                "Helps prevent soil erosion with ground coverage",
                "Improves soil structure with fibrous root system",
                "Crop residues add organic matter to soil"
            ]
        }
    },
    "soil_types": {
        "clay": {
            "challenges": ["Poor drainage", "Compaction", "Slow warming"],
            "solutions": [
                "Add organic matter to improve structure",
                "Create raised beds for better drainage",
                "Avoid working when soil is too wet",
                "Use cover crops with deep taproots"
            ]
        },
        "sandy": {
            "challenges": ["Fast drainage", "Nutrient leaching", "Low water retention"],
            "solutions": [
                "Add compost and organic matter regularly",
                "Use mulching to retain moisture",
                "Apply nutrients in smaller, frequent doses",
                "Plant cover crops to reduce erosion"
            ]
        },
        "volcanic": {
            "advantages": ["High fertility", "Good structure", "Rich in minerals"],
            "management": [
                "Maintain organic matter levels",
                "Practice minimal tillage",
                "Use crop rotation to maintain soil health"
            ]
        }
    }
}

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
    """Generate personalized regenerative agriculture plan"""
    data = request.json
    location = data.get('location', '')
    size = data.get('size', 0)
    crops = data.get('crops', '')
    soil_type = data.get('soil_type', '')
    experience = data.get('experience', 'beginner')
    goals = data.get('goals', 'increase_yield')

    plan = generate_farming_plan(location, size, crops, soil_type, experience, goals)
    weather_info = get_weather_info(location)

    return jsonify({
        'success': True,
        'plan': plan,
        'weather': weather_info
    })

@app.route('/chat', methods=['POST'])
def chat():
    """Handle chatbot questions"""
    data = request.json
    question = data.get('question', '')
    plan_context = data.get('plan', '')

    reply = generate_chatbot_response(question, plan_context)

    return jsonify({'reply': reply})

# === Helper Functions === #

def generate_chatbot_response(question, plan_context=""):
    """Generate contextual responses for farming-related questions"""
    q = question.lower()

    if any(word in q for word in ['weather', 'rain', 'drought', 'climate']):
        return """🌤️ *Weather & Climate Tips:*
* Monitor forecasts & plan planting accordingly
* Mulch heavily during dry seasons
* Improve drainage during heavy rains
* Use climate-smart crop varieties"""

    elif any(word in q for word in ['soil', 'fertility', 'nutrients', 'compost']):
        return """🏔️ *Soil Health Tips:*
* Test soil pH regularly (6.0-7.0 optimal)
* Add compost or manure regularly
* Reduce tillage & use cover crops"""

    elif any(word in q for word in ['pest', 'disease', 'insect']):
        return """🐛 *Pest Management:*
* Use marigolds & basil for natural pest control
* Neem oil & organic extracts are effective
* Rotate crops yearly to break pest cycles"""

    elif any(crop in q for crop in AGRICULTURE_KNOWLEDGE['crops']):
        crop_mentioned = next((crop for crop in AGRICULTURE_KNOWLEDGE['crops'] if crop in q), None)
        if crop_mentioned:
            crop_info = AGRICULTURE_KNOWLEDGE['crops'][crop_mentioned]
            response = f"🌾 *{crop_mentioned.title()} Farming Tips:*\n"
            for section, tips in crop_info.items():
                response += f"\n*{section.replace('_', ' ').title()}:*\n"
                for tip in tips:
                    response += f"• {tip}\n"
            return response

    return """🌱 *General Regenerative Agriculture Tips:*
* Build soil health using compost
* Diversify crops & rotate seasons
* Use cover crops & minimal tillage"""

def generate_farming_plan(location, size, crops, soil_type, experience, goals):
    """Generate a full regenerative agriculture plan"""
    plan = f"""
    <h2>🌱 Your Personalized Regenerative Agriculture Plan</h2>
    <p><strong>Location:</strong> {location} County |
    <strong>Farm Size:</strong> {size} acres |
    <strong>Main Crop:</strong> {crops.replace('_', ' ').title()}</p>

    <h3>🎯 Goal: {goals.replace('_', ' ').title()}</h3>

    <h3>🏔️ Soil Management for {soil_type.replace('_', ' ').title()} Soil:</h3>
    """

    if soil_type in AGRICULTURE_KNOWLEDGE['soil_types']:
        soil_info = AGRICULTURE_KNOWLEDGE['soil_types'][soil_type]
        if 'challenges' in soil_info:
            plan += "<p><strong>Challenges:</strong> " + ", ".join(soil_info['challenges']) + "</p>"
        if 'solutions' in soil_info:
            plan += "<ul>"
            for solution in soil_info['solutions']:
                plan += f"<li>{solution}</li>"
            plan += "</ul>"

    if crops in AGRICULTURE_KNOWLEDGE['crops']:
        crop_info = AGRICULTURE_KNOWLEDGE['crops'][crops]
        plan += f"<h3>🌾 {crops.replace('_', ' ').title()} Recommendations:</h3><ul>"
        for practice in crop_info.get('regenerative_practices', []):
            plan += f"<li>{practice}</li>"
        plan += "</ul>"

    plan += """
    <h3>📅 Implementation Timeline:</h3>
    <h4>Month 1-2: Preparation</h4>
    <ul><li>Test soil & prepare compost</li><li>Plan crop layout</li></ul>
    <h4>Month 3-4: Planting</h4>
    <ul><li>Apply organic matter</li><li>Plant main & cover crops</li></ul>
    <h4>Month 5-6: Monitoring</h4>
    <ul><li>Check soil moisture</li><li>Manage pests organically</li></ul>
    """

    return plan

def get_weather_info(location):
    """Placeholder for weather integration"""
    return {
        'location': location,
        'temperature': '25°C',
        'condition': 'Partly Cloudy',
        'humidity': '65%',
        'forecast': 'Light rain expected in 2-3 days'
    }

if _name_ == '_main_':
    app.run(debug=True)