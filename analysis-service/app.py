"""Analysis service: historical sales statistics and a 4-week sales forecast."""
from flask import Flask
from flask_cors import CORS

from analysis_predict import analysis_predict
from analysis_truth import analysis_truth
from config import PORT

app = Flask(__name__)
CORS(app)
app.register_blueprint(analysis_truth)
app.register_blueprint(analysis_predict)


@app.get("/")
def health():
    return {"message": "Analysis service is running"}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT)
