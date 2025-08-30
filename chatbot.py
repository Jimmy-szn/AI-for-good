# app.py
from flask import Flask, render_template, request, jsonify
from utils.gemini_advisor import RegenerativeAdvisor
from utils.weather_service import WeatherService
from data.kenya_agriculture import KENYA_CROPS, SOIL_TYPES, KENYAN_REGIONS
import os

app = Flask(__name__)
advisor = RegenerativeAdvisor()
weather_service = WeatherService()

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
        