# utils/gemini_advisor.py
import google.generativeai as genai
import os
from dotenv import load_dotenv
import json

load_dotenv()
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

class RegenerativeAdvisor:
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-1.5-flash')
    
    def generate_farming_plan(self, farm_data, weather_data):
        """Generate comprehensive regenerative farming plan"""
        
        prompt = f"""
        You are Dr. Sarah Wanjiku, a leading regenerative agriculture expert in Kenya with 15 years of experience helping smallholder farmers. Create a detailed, actionable regenerative agriculture transition plan.

        FARM PROFILE:
        📍 Location: {farm_data['location']} County, Kenya
        📏 Farm Size: {farm_data['size']} acres
        🌾 Current Crops: {farm_data['crops']}
        🏔️ Soil Type: {farm_data['soil_type']}
        🌡️ Current Weather: {weather_data.get('temperature', 'N/A')}°C, Humidity: {weather_data.get('humidity', 'N/A')}%
        
        REQUIREMENTS:
        Create a practical 6-month regenerative transition plan that includes:

        ## 🔄 CROP ROTATION STRATEGY
        - Specific rotation sequence for next 2 planting seasons
        - Timing aligned with Kenya's rainfall patterns
        - Integration with nitrogen-fixing legumes

        ## 🌱 COVER CROP RECOMMENDATIONS  
        - 3 locally available cover crop options
        - Planting and management schedule
        - Expected benefits for soil health

        ## 🪱 SOIL HEALTH IMPROVEMENT
        - Composting setup using local materials
        - Minimal tillage transition plan
        - Natural fertilizer alternatives

        ## 💧 WATER MANAGEMENT
        - Rainwater harvesting techniques
        - Mulching strategies
        - Drought-resistant practices

        ## 📅 6-MONTH IMPLEMENTATION TIMELINE
        - Month-by-month action plan
        - Priority activities for each month
        - Expected outcomes and milestones

        ## 💰 COST-EFFECTIVE SOLUTIONS
        - Low-cost implementation options
        - Local resource utilization
        - Potential cost savings vs current methods

        CONTEXT: Focus on techniques proven successful in East Africa. Use local plant names where possible (Swahili/English). Consider the farmer has limited capital but strong community connections.

        Format with clear headers, bullet points, and practical steps a farmer can immediately implement.
        """

        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            return self.get_fallback_plan(farm_data)
    
    def get_fallback_plan(self, farm_data):
        """Fallback plan if API fails"""
        return f"""
        # Basic Regenerative Plan for {farm_data['location']}
        
        ## Starting Your Regenerative Journey
        
        Based on your {farm_data['size']}-acre {farm_data['crops']} farm:
        
        **Immediate Actions (Month 1-2):**
        • Start composting with kitchen scraps and crop residues
        • Reduce tillage - only till where absolutely necessary
        • Plant nitrogen-fixing beans between crop rows
        
        **Soil Building (Month 3-4):**
        • Apply compost to improve soil structure
        • Introduce cover crops during fallow periods
        • Create windbreaks with indigenous trees
        
        **Water Conservation (Month 5-6):**
        • Install simple rainwater collection
        • Apply mulch to retain soil moisture
        • Plant drought-resistant local varieties
        
        This is a basic plan. For detailed, location-specific advice, please try again when internet connection improves.
        """