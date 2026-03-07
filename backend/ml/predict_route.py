import joblib
import numpy as np

model = joblib.load("backend/models/route_model.pkl")

source_encoder = joblib.load("backend/models/source_encoder.pkl")
dest_encoder = joblib.load("backend/models/dest_encoder.pkl")
route_encoder = joblib.load("backend/models/route_type_encoder.pkl")
density_encoder = joblib.load("backend/models/density_encoder.pkl")


def encode_safe(encoder, value):
    if value not in encoder.classes_:
        raise ValueError(f"{value} not seen in training data")
    return encoder.transform([value])[0]


def predict_single_route(data, route_type):

    source_encoded = encode_safe(source_encoder, data["source_location"])
    dest_encoded = encode_safe(dest_encoder, data["destination_location"])
    route_encoded = encode_safe(route_encoder, route_type)
    density_encoded = encode_safe(density_encoder, data["path_crowd_density"])

    features = np.array([[
        data["distance_meters"],
        data["path_people_count"],
        data["path_capacity"],
        density_encoded,
        source_encoded,
        dest_encoded,
        route_encoded
    ]])

    prediction = model.predict(features)

    return float(prediction[0])


def predict_route_options(data):

    shortest_time = predict_single_route(data, "shortest")
    alternate_time = predict_single_route(data, "alternate")

    return {
        "shortest_route_time": shortest_time,
        "alternate_route_time": alternate_time
    }