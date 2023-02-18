import argparse
import requests
import json

def resetq(ar):
    url = 'http://localhost:9103/intelliq_api/resetq/' + ar.questionnaire_id
    res = requests.get(url, verify=False)
    print(res.status_code)
    print(res.json())
    return True


parser = argparse.ArgumentParser()
parser.add_argument('--questionnaire_id', help='Give Questionnaire ID', required=True)
args = parser.parse_args()

resetq(args)
