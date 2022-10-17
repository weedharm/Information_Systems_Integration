from flask import Blueprint
from utils import *
from flask_cors import CORS

analysis_predict = Blueprint('analysis_predict', __name__)
CORS(analysis_predict)
RF = None
df_predict_success = pd.DataFrame()
YEAR_PREDICT = None
WEEK_PREDICT = None

def create_df_predict(year, week):
    arr_dept = data1.groupby('Store').Dept.unique().reset_index()
    df_predict = pd.DataFrame({
        "Store": np.repeat(arr_dept.Store.values, arr_dept.Dept.str.len()),
        "Dept": list(chain.from_iterable(arr_dept.Dept))
        })

    df_predict['Year'] = year
    df_predict['IsHoliday'] = False

    stores = data2
    df_predict = df_predict.merge(stores, how='left')
    df_predict.Type = df_predict.Type.apply(lambda x: 3 if x=='A' else(2 if x=='B' else 1))

    l = len(df_predict)
    df_predict = pd.concat([df_predict]*len(week))
    df_predict['Week'] = np.repeat(week, [l]*len(week))

    df_predict['IsHoliday'] = df_predict['Week'].apply(lambda x: True if x in [6, 36, 47, 52] else False)
    return df_predict


def predict(year, week):
    # week is an array
    global RF

    data_predict = create_df_predict(year, week)
    data_predict = data_predict[['Store', 'Dept', 'IsHoliday', 'Size', 'Week', 'Type', 'Year']]

    if RF:
        rf = RF
    else:
        rf = pickle.load(open('./model/RandomForest.sav', 'rb'))
        RF = rf

    predict = rf.predict(data_predict)
    data_predict['Weekly_Sales'] = predict

    return data_predict


@analysis_predict.route('/run/predict', methods=['GET'])
def run_predict():
    global df_predict_success
    global YEAR_PREDICT
    global WEEK_PREDICT

    (year, current_week, _) = datetime.datetime.now().isocalendar()

    year = 2012
    current_week = 43
    # year = request.args.get('year', type=int, default=2012)
    # current_week = request.args.get('currentWeek', type=int, default=43)
    
    week = [current_week + i for i in range(1, 5)] # xử lý trường hợp week vượt quá 52
    df_predict_1 = predict(year, [w for w in week if w <= 52])

    try:
        df_predict_2 = predict(year+1, [w%52 for w in week if w >52])
        df_predict_success = pd.concat([df_predict_1, df_predict_2])
    except:
        df_predict_success = df_predict_1

    YEAR_PREDICT = year
    WEEK_PREDICT = current_week + 1

    results = {
        'message': 'Success',
        'resultCode': 1,
        'current_week': current_week
    }

    return results


@analysis_predict.route('/analysis/predict/weeklySaleInYear', methods=['GET'])
# so sánh doanh số của năm dự đoán và năm trước đó
def weeklySaleInYear():
    df_temp_train = data1.groupby(['Year', 'Week'])['Weekly_Sales'].sum().reset_index()
    df_temp_predict = df_predict_success.groupby(['Year', 'Week'])['Weekly_Sales'].sum().reset_index()
    results = {}

    results['truth'] = df_temp_train[(YEAR_PREDICT - 1<= df_temp_train.Year) & (df_temp_train.Year <= YEAR_PREDICT)][['Year', 'Week', 'Weekly_Sales']].to_dict('record')
    results['predict'] = df_temp_predict[df_temp_predict.Year >= YEAR_PREDICT][['Year', 'Week', 'Weekly_Sales']].to_dict('record')

    results['resultCode'] = 1

    return results



@analysis_predict.route('/analysis/predict/weeklySaleInStore', methods=['GET'])
# doanh số bán được dự đoán trong một cửa hàng
def weeklySaleInStore():
    week = request.args.get('week', type=int, default=WEEK_PREDICT)

    df_temp = df_predict_success[df_predict_success.Week==week]
    df_temp = df_temp.groupby('Store').Weekly_Sales.sum().reset_index()

    results = {}

    results['week'] = week
    results['year'] = YEAR_PREDICT
    results['data'] = df_temp.to_dict('record')
    results['resultCode'] = 1

    return results


@analysis_predict.route('/analysis/predict/weeklySaleInDept', methods=['GET'])
# doanh số bán được dự đoán của các dept trong một store nào đó
def weeklySaleInDept():
    store = request.args.get('store', type=int, default=1)
    week = request.args.get('week', type=int, default=WEEK_PREDICT)

    df_temp = df_predict_success[(df_predict_success.Store==store) & (df_predict_success.Week==week)][['Dept', 'Weekly_Sales']]
    results = {}

    results['week'] = week
    results['store'] = store
    results['year'] = YEAR_PREDICT
    results['data'] = df_temp.to_dict('record')
    results['resultCode'] = 1

    return results
