FROM python:3.7-alpine
RUN pip install pipenv
WORKDIR /analysis-service
COPY . .
RUN pipenv install
CMD ["pipenv", "run", "python", "app.py"]