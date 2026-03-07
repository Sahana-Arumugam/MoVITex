import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder


# ==============================
# Load Dataset
# ==============================

df = pd.read_csv("backend/datasets/route_crowd_dataset.csv")

print("Dataset loaded:", df.shape)
print("Columns:", df.columns)


# ==============================
# Encode Text Columns
# ==============================

# source location
source_encoder = LabelEncoder()
df["source_encoded"] = source_encoder.fit_transform(df["source_location"])

# destination location
dest_encoder = LabelEncoder()
df["dest_encoded"] = dest_encoder.fit_transform(df["destination_location"])

# route type (walkway, corridor, etc.)
route_encoder = LabelEncoder()
df["route_type_encoded"] = route_encoder.fit_transform(df["route_type"])

# crowd density (low / medium / high)
density_encoder = LabelEncoder()
df["density_encoded"] = density_encoder.fit_transform(df["path_crowd_density"])


# ==============================
# Feature Selection
# ==============================

features = [
    "distance_meters",
    "path_people_count",
    "path_capacity",
    "density_encoded",
    "source_encoded",
    "dest_encoded",
    "route_type_encoded"
]

X = df[features]

# target variable
y = df["estimated_travel_time_minutes"]


# ==============================
# Train / Test Split
# ==============================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


# ==============================
# Train Model
# ==============================

model = RandomForestRegressor(
    n_estimators=200,
    max_depth=10,
    n_jobs=-1,
    random_state=42
)

model.fit(X_train, y_train)

print("Route model trained successfully!")


# ==============================
# Save Model + Encoders
# ==============================

joblib.dump(model, "backend/models/route_model.pkl")
joblib.dump(source_encoder, "backend/models/source_encoder.pkl")
joblib.dump(dest_encoder, "backend/models/dest_encoder.pkl")
joblib.dump(route_encoder, "backend/models/route_type_encoder.pkl")
joblib.dump(density_encoder, "backend/models/density_encoder.pkl")

print("Route model + encoders saved successfully!")