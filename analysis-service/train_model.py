"""Train the weekly-sales Random Forest used by the analysis service.

Reproduces model-training/random_forest.ipynb as a script, with the feature
names and store-type encoding the Flask app uses at inference time.

    python train_model.py
"""
import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

from config import FEATURES, MODEL_PATH, STORE_TYPE_CODE
from data import sales, stores


def wmae(is_holiday, y_true, y_pred):
    """Weighted MAE from the Walmart competition: holiday weeks weigh 5x."""
    weights = np.where(is_holiday, 5, 1)
    return float(np.sum(weights * np.abs(y_true - y_pred)) / weights.sum())


def build_dataset():
    df = sales.merge(stores, on="Store", how="left")
    df["Type"] = df["Type"].map(STORE_TYPE_CODE)
    df["IsHoliday"] = df["IsHoliday"].astype(int)
    return df[FEATURES], df["Weekly_Sales"]


def main():
    X, y = build_dataset()
    X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=123)

    # Capped depth/leaf size keeps the model file small (~tens of MB instead of GBs)
    # at a small cost in accuracy.
    model = RandomForestRegressor(
        n_estimators=30, max_depth=20, min_samples_leaf=4, n_jobs=-1, random_state=123
    )
    model.fit(X_train, y_train)

    print(f"Train WMAE:      {wmae(X_train.IsHoliday, y_train, model.predict(X_train)):,.2f}")
    print(f"Validation WMAE: {wmae(X_val.IsHoliday, y_val, model.predict(X_val)):,.2f}")

    MODEL_PATH.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(model, MODEL_PATH, compress=3)
    print(f"Model saved to {MODEL_PATH} ({MODEL_PATH.stat().st_size / 1e6:.1f} MB)")


if __name__ == "__main__":
    main()
