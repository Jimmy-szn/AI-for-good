# utils/weather_service.py
import requests
import os

class WeatherService:
    def __init__(self):
        self.api_key = os.getenv('OPENWEATHER_API_KEY')
        self.base_url = "http://api.openweathermap.org/data/2.5"
    
    def get_location_weather(self, location):
        """Get current weather for Kenyan location"""
        
        # Kenya county coordinates (simplified)
        kenya_coords = {
            'nakuru': {'lat': -0.3031, 'lon': 36.0800},
            'kiambu': {'lat': -1.1748, 'lon': 36.8356},
            'machakos': {'lat': -1.5177, 'lon': 37.2634},
            'kakamega': {'lat': 0.2827, 'lon': 34.7519},
            'kisumu': {'lat': -0.0917, 'lon': 34.7680},
            'meru': {'lat': 0.0467, 'lon': 37.6550},
            'uasin_gishu': {'lat': 0.5143, 'lon': 35.2698},
            'kitui': {'lat': -1.3667, 'lon': 38.0167}
        }
        
        # Default to Nairobi if location not found
        coords = kenya_coords.get(location.lower().replace(' ', '_'), 
                                 {'lat': -1.2921, 'lon': 36.8219})
        
        try:
            response = requests.get(f"{self.base_url}/weather", params={
                'lat': coords['lat'],
                'lon': coords['lon'],
                'appid': self.api_key,
                'units': 'metric'
            })
            
            if response.status_code == 200:
                data = response.json()
                return {
                    'temperature': round(data['main']['temp'], 1),
                    'humidity': data['main']['humidity'],
                    'description': data['weather'][0]['description'],
                    'rainfall': data.get('rain', {}).get('1h', 0)
                }
        except Exception as e:
            print(f"Weather API error: {e}")
        
        # Fallback data
        return {
            'temperature': 22,
            'humidity': 65,
            'description': 'partly cloudy',
            'rainfall': 0
        }