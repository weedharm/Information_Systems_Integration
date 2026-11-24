"""Historical sales data loaded once at start-up."""
import pandas as pd

from config import DATA_DIR

sales = pd.read_csv(DATA_DIR / "train.csv", parse_dates=["Date"])
sales["Year"] = sales["Date"].dt.year
sales["Week"] = sales["Date"].dt.isocalendar().week.astype(int)

stores = pd.read_csv(DATA_DIR / "stores.csv")
