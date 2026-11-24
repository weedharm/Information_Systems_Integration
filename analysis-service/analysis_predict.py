"""Weekly sales forecast for the next 4 weeks, served from a pre-trained Random Forest."""
from functools import lru_cache

import joblib
import numpy as np
import pandas as pd
from flask import Blueprint, request

from config import FEATURES, HOLIDAY_WEEKS, MODEL_PATH, STORE_TYPE_CODE
from data import sales, stores

analysis_predict = Blueprint("analysis_predict", __name__)

# The dataset ends at ISO week 43 of 2012, so "today" is pinned to that week
# (with live data this would be datetime.date.today().isocalendar()).
CURRENT_YEAR, CURRENT_WEEK = 2012, 43
HORIZON_WEEKS = 4

_forecast = None  # DataFrame produced by run_forecast()


@lru_cache(maxsize=1)
def load_model():
    if not MODEL_PATH.exists():
        raise FileNotFoundError(f"{MODEL_PATH} not found - run `python train_model.py` first")
    return joblib.load(MODEL_PATH)


def build_features(year, weeks):
    """One row per (store, department, week) for the requested weeks."""
    depts = sales[["Store", "Dept"]].drop_duplicates()
    frame = depts.merge(stores, on="Store", how="left")
    frame["Type"] = frame["Type"].map(STORE_TYPE_CODE)
    frame["Year"] = year
    frame = frame.loc[frame.index.repeat(len(weeks))].reset_index(drop=True)
    frame["Week"] = np.tile(weeks, len(depts))
    frame["IsHoliday"] = frame["Week"].isin(HOLIDAY_WEEKS).astype(int)
    return frame


def run_forecast():
    """Predict the next HORIZON_WEEKS weeks, rolling over to the next year after week 52."""
    global _forecast
    model = load_model()
    frames = []
    for offset in range(1, HORIZON_WEEKS + 1):
        week = CURRENT_WEEK + offset
        year = CURRENT_YEAR + (week - 1) // 52
        week = (week - 1) % 52 + 1
        frames.append(build_features(year, [week]))
    frame = pd.concat(frames, ignore_index=True)
    frame["Weekly_Sales"] = model.predict(frame[FEATURES])
    _forecast = frame
    return frame


def get_forecast():
    return _forecast if _forecast is not None else run_forecast()


@analysis_predict.get("/run/predict")
def run_predict():
    run_forecast()
    return {"message": "Success", "resultCode": 1, "current_week": CURRENT_WEEK}


@analysis_predict.get("/analysis/predict/weeklySaleInYear")
def sales_this_year_vs_last():
    """Weekly totals for last year, this year so far, and the forecast weeks."""
    truth = sales.groupby(["Year", "Week"]).Weekly_Sales.sum().reset_index()
    truth = truth[truth.Year.between(CURRENT_YEAR - 1, CURRENT_YEAR)]
    predicted = get_forecast().groupby(["Year", "Week"]).Weekly_Sales.sum().reset_index()
    return {
        "truth": truth.to_dict("records"),
        "predict": predicted.to_dict("records"),
        "resultCode": 1,
    }


@analysis_predict.get("/analysis/predict/weeklySaleInStore")
def predicted_sales_per_store():
    """Predicted sales of each store for one forecast week."""
    week = request.args.get("week", type=int, default=CURRENT_WEEK + 1)
    forecast = get_forecast()
    totals = forecast[forecast.Week == week].groupby("Store").Weekly_Sales.sum().reset_index()
    return {"week": week, "year": CURRENT_YEAR, "data": totals.to_dict("records"), "resultCode": 1}


@analysis_predict.get("/analysis/predict/weeklySaleInDept")
def predicted_sales_per_department():
    """Predicted sales of each department of one store for one forecast week."""
    store = request.args.get("store", type=int, default=1)
    week = request.args.get("week", type=int, default=CURRENT_WEEK + 1)
    forecast = get_forecast()
    rows = forecast[(forecast.Store == store) & (forecast.Week == week)]
    return {
        "week": week,
        "store": store,
        "year": CURRENT_YEAR,
        "data": rows[["Dept", "Weekly_Sales"]].to_dict("records"),
        "resultCode": 1,
    }
