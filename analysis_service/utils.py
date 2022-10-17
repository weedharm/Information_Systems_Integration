import numpy as np
import pandas as pd
from flask import Flask, jsonify, make_response, request, Response
import pickle
from itertools import chain
import datetime

data1 = pd.read_csv('./data/train.csv')
data1['Date'] = pd.to_datetime(data1['Date'])
data1['Year'] = data1['Date'].dt.year
data1['Week'] = data1['Date'].dt.week

data2 = pd.read_csv('./data/stores.csv')