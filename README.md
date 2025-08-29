🌱 Kenya Regenerative Agriculture
Advisor
A web application that uses Gemini AI to provide personalized regenerative agriculture advice
to smallholder farmers in Kenya.
🌟 Overview
This project serves as a digital agricultural extension officer, providing tailored farming plans
based on a farmer's location, crop, and soil type. The goal is to help farmers transition to
sustainable and climate-resilient practices, improving soil health and long-term yields.
✨ Features
● Personalized Farming Plans: Generates detailed, actionable plans covering crop
rotation, cover cropping, soil health, and water management.
● Location-Specific Advice: Integrates real-time (or estimated) weather data and local
agricultural knowledge to provide relevant recommendations for Kenyan counties.
● AI-Powered Insights: Utilizes Google's Gemini AI to synthesize complex agricultural
data into easy-to-understand advice.
● Responsive Web Interface: A simple and clean user interface built with Flask, Tailwind
CSS, and plain JavaScript, ensuring it works well on both desktop and mobile devices.
🛠 Tech Stack
● Backend: Python (Flask)
● AI: Google Gemini API (google-generativeai)
● Data: Local Python data files for Kenyan crops and soil types
● Weather API: OpenWeatherMap API
● Frontend: HTML, CSS (Tailwind CSS), JavaScript
● Deployment: Gunicorn for production, managed on platforms like Render
🚀 Getting Started
Prerequisites
1. Python 3.8+
2. Git
3. Google Gemini API Key
4. OpenWeatherMap API Key
Installation
1. Clone the repository:
git clone
[https://github.com/your-username/kenya-ag-advisor.git](https://github.com/your-usern
ame/kenya-ag-advisor.git)
cd kenya-ag-advisor
2. Create and activate a virtual environment:
python3 -m venv venv
source venv/bin/activate # On Windows, use `venv\Scripts\activate`
3. Install the required packages:
pip install -r requirements.txt
Environment Variables
1. Create a .env file in the root directory.
2. Add your API keys to the file:
GEMINI_API_KEY=your_gemini_api_key_here
WEATHER_API_KEY=your_openweather_api_key_here
Running the Application
1. From the project's root directory, start the Flask application:
python app.py
2. Open your web browser and navigate to http://localhost:5000.
📂 Project Structure
kenya-ag-advisor/
├── app.py
├── requirements.txt
├── .env
├── .gitignore
├── data/
│ └── kenya_agriculture.py
├── static/
│ ├── css/
│ │ └── style.css
│ └── js/
│ └── main.js
├── templates/
│ ├── index.html
│ └── plan.html
└── utils/
├── gemini_advisor.py
└── weather_service.py
🤝 Contribution
Contributions are welcome! If you have suggestions for new features, data improvements, or
bug fixes, please open an issue or submit a pull request.
📄 License
This project is licensed under the MIT License.
