# data/kenya_agriculture.py
KENYA_CROPS = {
    "maize": {
        "planting_seasons": ["March-May (Long rains)", "October-December (Short rains)"],
        "companion_crops": ["beans", "cowpeas", "groundnuts"],
        "cover_crops": ["desmodium", "brachiaria grass", "lablab"],
        "soil_ph": "6.0-7.5",
        "rainfall_needs": "500-1200mm annually"
    },
    "beans": {
        "planting_seasons": ["March-May", "September-November"],
        "companion_crops": ["maize", "sorghum", "millet"],
        "cover_crops": ["mucuna", "lablab", "canavalia"],
        "soil_ph": "6.0-7.0", 
        "rainfall_needs": "300-600mm per season"
    },
    "sorghum": {
        "planting_seasons": ["March-May", "October-December"],
        "companion_crops": ["beans", "cowpeas", "pigeon peas"],
        "cover_crops": ["brachiaria", "rhodes grass"],
        "soil_ph": "6.0-8.5",
        "rainfall_needs": "300-700mm annually"
    },
    "sweet_potato": {
        "planting_seasons": ["March-May", "September-December"],
        "companion_crops": ["beans", "maize"],
        "cover_crops": ["sweet potato vines", "lablab"],
        "soil_ph": "5.8-6.2",
        "rainfall_needs": "600-1000mm annually"
    }
}

SOIL_TYPES = {
    "clay": "Heavy soil, retains water well, may need drainage",
    "loamy": "Ideal soil, good drainage and nutrient retention", 
    "sandy": "Light soil, drains quickly, needs organic matter",
    "volcanic": "Fertile soil, good for most crops, pH may be high",
    "black_cotton": "Swells when wet, cracks when dry, needs careful management"
}

KENYAN_REGIONS = {
    "central": ["Kiambu", "Murang'a", "Nyeri", "Kirinyaga", "Nyandarua"],
    "eastern": ["Machakos", "Kitui", "Makueni", "Embu", "Tharaka Nithi"],
    "western": ["Kakamega", "Vihiga", "Bungoma", "Busia"],
    "rift_valley": ["Nakuru", "Uasin Gishu", "Trans Nzoia", "Kericho", "Bomet"],
    "nyanza": ["Kisumu", "Siaya", "Kisii", "Nyamira", "Migori"],
    "coast": ["Mombasa", "Kilifi", "Kwale", "Taita Taveta"],
    "north_eastern": ["Garissa", "Wajir", "Mandera"],
    "northern": ["Turkana", "Marsabit", "Samburu", "Isiolo"]
}