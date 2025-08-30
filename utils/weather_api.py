# utils/weather_api.py
import requests
import os

def get_weather_data(location):
    api_key = os.getenv('OPENWEATHER_API_KEY')
    
    # Get coordinates for location (simplified)
    kenya_locations = {
        'nakuru': {'lat': -0.3031, 'lon': 36.0800},
        'meru': {'lat': 0.0467, 'lon': 37.6550},
        'kisumu': {'lat': -0.0917, 'lon': 34.7680}
    }
    
    coords = kenya_locations.get(location.lower().split()[0], 
                                {'lat': -1.2921, 'lon': 36.8219})  # Default to Nairobi
    
    url = f"http://api.openweathermap.org/data/2.5/weather"
    params = {
        'lat': coords['lat'],
        'lon': coords['lon'],
        'appid': api_key,
        'units': 'metric'
    }
    
    response = requests.get(url, params=params)
    data = response.json()
    
    return {
        'temperature': data['main']['temp'],
        'humidity': data['main']['humidity'],
        'rainfall': data.get('rain', {}).get('1h', 0)
    }