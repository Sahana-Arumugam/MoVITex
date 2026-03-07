import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder

# Load dataset
df = pd.read_csv("backend/datasets/campus_flow_dataset.csv")

print("Dataset loaded:", df.shape)

# Encode location
location_encoder = LabelEncoder()
df["location_encoded"] = location_encoder.fit_transform(df["location"])

# Encode day_of_week
day_encoder = LabelEncoder()
df["day_encoded"] = day_encoder.fit_transform(df["day_of_week"])

# Feature columns
features = [
    "hour_of_day",
    "day_encoded",
    "is_weekend",
    "event_flag",
    "capacity",
    "wifi_devices_detected",
    "location_encoded"
]

X = df[features]

# Target
y = df["people_count"]

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Model
model = RandomForestRegressor(
    n_estimators=200,
    max_depth=12,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)

print("Model trained!")

# Save model
joblib.dump(model, "backend/models/crowd_model.pkl")
joblib.dump(location_encoder, "backend/models/location_encoder.pkl")
joblib.dump(day_encoder, "backend/models/day_encoder.pkl")

print("Models saved successfully!")