import argparse
import requests
import json

def resetq(ar):
    url = f'http://localhost:9103/intelliq_api/resetall/{ar.questionnaire_id}'
    res = requests.delete(url, verify=False)
    print(res.status_code)
    print(res.json())
    return True


parser = argparse.ArgumentParser()
parser.add_argument('--questionnaire_id', help='Give Questionnaire ID', required=True)
args = parser.parse_args()

resetq(args)
