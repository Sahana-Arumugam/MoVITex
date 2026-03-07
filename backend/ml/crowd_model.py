import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
df = pd.read_csv("backend/datasets/campus_flow_dataset.csv")
features = [
    "hour",
    "minute",
    "day_of_w",
    "is_weekend",
    "is_holiday",
    "is_lunch",
    "classes",
    "event_sch",
    "capacity"
]

X = df[features]
y = df["occupancy"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = RandomForestRegressor(
    n_estimators=200,
    max_depth=10,
    random_state=42
)

model.fit(X_train, y_train)

pred = model.predict(X_test)

print("MAE:", mean_absolute_error(y_test, pred))

joblib.dump(model, "models/crowd_model.pkl")