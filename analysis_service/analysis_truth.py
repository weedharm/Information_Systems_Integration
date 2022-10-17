from flask import Blueprint
from utils import *

analysis_truth = Blueprint('aa', __name__) # 'aa' thay bằng gì cũng được và không được trùng nhau ở các blueprint khác nhau


@analysis_truth.route('/analysis/truth/department', methods=['GET'])
def getDeptInEachStore():
	result = {}
	deptInEachStore = data1.groupby('Store').Dept.nunique().reset_index()
	result['departmentInEachStore'] = deptInEachStore.to_dict('record')
	result['resultCode'] = 1
	return result


@analysis_truth.route('/analysis/truth/size', methods=['GET'])
def getSizeInEachStore():
	result = {}
	sizeInEachStore = data2[['Store', 'Size']]
	result['sizeInEachStore'] = sizeInEachStore.to_dict('record')
	result['resultCode'] = 1

	return result


@analysis_truth.route('/analysis/truth/type', methods=['GET'])
def getNumberType():
	result = {}
	numberType = data2.groupby('Type').Store.nunique().reset_index()
	result['numberType'] = numberType.to_dict('record')
	result['resultCode'] = 1

	return result


@analysis_truth.route('/analysis/truth/weeklySaleInStore', methods=['GET'])
# weekly sale trong mỗi cửa hàng của năm nào đó
def weeklySaleInStore():
	year = request.args.get('year', type=int, default=2011)
	results = {}

	df_temp = data1[data1.Year==year].groupby('Store').Weekly_Sales.sum().reset_index()
	results['year'] = year
	results['data'] = df_temp.to_dict('record')
	results['resultCode'] = 1

	return results


@analysis_truth.route('/analysis/truth/weeklySaleInDept', methods=['GET'])
# weekly sale trong mỗi department của cửa hàng nào đó
def weeklySaleInDept():
	year = request.args.get('year', type=int, default=2011)
	store = request.args.get('store', type=int, default=1)

	df_temp = data1[(data1.Year==year) & (data1.Store==store)].groupby('Dept').Weekly_Sales.sum().reset_index()
	results = {}
	results['year'] = year
	results['store'] = store
	results['data'] = df_temp.to_dict('record')
	results['resultCode'] = 1

	return results