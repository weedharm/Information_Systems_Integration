"""Paths and constants shared by the training script and the Flask app."""
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = Path(os.environ.get("DATA_DIR", BASE_DIR.parent / "model-training"))
MODEL_PATH = Path(os.environ.get("MODEL_PATH", BASE_DIR / "model" / "random_forest.joblib"))
PORT = int(os.environ.get("PORT", 8005))

# Feature order used for both training and inference.
FEATURES = ["Store", "Dept", "IsHoliday", "Size", "Week", "Type", "Year"]
# Store type encoding (must be identical for training and inference).
STORE_TYPE_CODE = {"A": 1, "B": 2, "C": 3}
# ISO weeks that contain a holiday in the Walmart dataset
# (Super Bowl, Labor Day, Thanksgiving, Christmas).
HOLIDAY_WEEKS = {6, 36, 47, 52}
