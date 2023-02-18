import argparse
import requests
import json
from pathlib import Path
from datetime import date
# from prettytable import from_csv
# from prettytable import DEFAULT


def doanswer(ar): 
    url = 'http://localhost:9103/intelliq_api/doanswer/' + ar.questionnaire_id + '/' + ar.question_id + '/' + ar.session_id + '/' + ar.option_id 
    res = requests.post(url, data=ar.option_id, verify=False)
    print(res.status_code)
    print(json.dumps(res.json(), indent=4, sort_keys=False)) # maybe just print res.json, we will see in testing
    return True


parser = argparse.ArgumentParser()
parser.add_argument('--questionnaire_id', help='Give Questionnaire ID', required='TRUE')
parser.add_argument('--question_id', help='Give Question ID', required='TRUE')
parser.add_argument('--session_id', help='Give Session ID', required='TRUE')
parser.add_argument('--option_id', help='Give Option ID', required='TRUE')


args = parser.parse_args()

doanswer(args)