from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware




from backend.ml.predict import predict_crowd
from backend.ml.predict_route import predict_route_options
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow React localhost
    allow_credentials=True,
    allow_methods=["*"],  # allow POST, OPTIONS etc
    allow_headers=["*"],
)
class CrowdInput(BaseModel):

    location: str
    hour_of_day: int
    day_of_week: str
    is_weekend: int
    event_flag: int
    capacity: int
    wifi_devices_detected: int


@app.post("/predict-crowd")

def get_prediction(data: CrowdInput):

    prediction = predict_crowd(data.dict())

    return {
        "predicted_crowd": prediction
    }

class RouteInput(BaseModel):
    source_location: str
    destination_location: str
    distance_meters: float
    path_capacity: int
    path_people_count: int
    path_crowd_density: str


@app.post("/predict-route")

def route_prediction(data: RouteInput):

    result = predict_route_options(data.dict())

    return result