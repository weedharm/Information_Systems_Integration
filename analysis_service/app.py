from flask import Flask 
from analysis_truth import analysis_truth
from analysis_predict import analysis_predict


app = Flask(__name__)
app.register_blueprint(analysis_truth)
app.register_blueprint(analysis_predict)

@app.route('/', methods=['GET'])
def hello():
	return 'analysis service is running'


if __name__ == "__main__":
	app.run(port=8005, debug=False)

