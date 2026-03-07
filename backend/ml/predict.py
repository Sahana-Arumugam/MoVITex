import joblib
import numpy as np

model = joblib.load("backend/models/crowd_model.pkl")

days = {
    "Monday":0,
    "Tuesday":1,
    "Wednesday":2,
    "Thursday":3,
    "Friday":4,
    "Saturday":5,
    "Sunday":6
}

location_types = {
    "academic_room":0,
    "library":1,
    "mess":2,
    "food_spot":3,
    "shuttle_stop":4,
    "outing_gate":5
}

def predict_crowd(data):

    day_encoded = days.get(data["day_of_week"],0)

    # default location type if not provided
    location_type = location_types.get("library",0)

    features = np.array([[
        data["hour_of_day"],
        day_encoded,
        data["is_weekend"],
        data["event_flag"],
        data["capacity"],
        data["wifi_devices_detected"],
        location_type
    ]])

    prediction = model.predict(features)

    return float(prediction[0])