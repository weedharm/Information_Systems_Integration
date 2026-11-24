"""Descriptive statistics over the historical sales data."""
from flask import Blueprint, request

from data import sales, stores

analysis_truth = Blueprint("analysis_truth", __name__)


@analysis_truth.get("/analysis/truth/department")
def departments_per_store():
    """Number of departments in each store."""
    counts = sales.groupby("Store").Dept.nunique().reset_index()
    return {"departmentInEachStore": counts.to_dict("records"), "resultCode": 1}


@analysis_truth.get("/analysis/truth/size")
def size_per_store():
    """Floor size of each store."""
    return {"sizeInEachStore": stores[["Store", "Size"]].to_dict("records"), "resultCode": 1}


@analysis_truth.get("/analysis/truth/type")
def stores_per_type():
    """Number of stores of each type (A/B/C)."""
    counts = stores.groupby("Type").Store.nunique().reset_index()
    return {"numberType": counts.to_dict("records"), "resultCode": 1}


@analysis_truth.get("/analysis/truth/weeklySaleInStore")
def sales_per_store():
    """Total sales of each store in a given year."""
    year = request.args.get("year", type=int, default=2011)
    totals = sales[sales.Year == year].groupby("Store").Weekly_Sales.sum().reset_index()
    return {"year": year, "data": totals.to_dict("records"), "resultCode": 1}


@analysis_truth.get("/analysis/truth/weeklySaleInDept")
def sales_per_department():
    """Total sales of each department of one store in a given year."""
    year = request.args.get("year", type=int, default=2011)
    store = request.args.get("store", type=int, default=1)
    rows = sales[(sales.Year == year) & (sales.Store == store)]
    totals = rows.groupby("Dept").Weekly_Sales.sum().reset_index()
    return {"year": year, "store": store, "data": totals.to_dict("records"), "resultCode": 1}
