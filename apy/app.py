import math
import os

from dotenv import load_dotenv
from flask import request

load_dotenv()
import time

from flask import Flask

app = Flask(__name__)

@app.route('/', methods=['POST'])
def endpoint():
    post_body = request.get_json()

    print('Received feedback: ' + str(len(post_body['feedback'])))
   
    return {'feedback': post_body['feedback']}
