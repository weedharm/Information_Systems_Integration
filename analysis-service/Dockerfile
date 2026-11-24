# Build context: repository root (the training data lives in model-training/).
FROM python:3.11-slim
WORKDIR /app

COPY analysis-service/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY model-training/train.csv model-training/stores.csv /data/
COPY analysis-service/ .
ENV DATA_DIR=/data

# Train the model at build time so the container starts ready to serve.
RUN python train_model.py

EXPOSE 8005
CMD ["gunicorn", "--bind", "0.0.0.0:8005", "--workers", "1", "--threads", "4", "app:app"]
