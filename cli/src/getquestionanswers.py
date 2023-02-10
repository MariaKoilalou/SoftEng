import argparse
import requests
import json
from pathlib import Path
from datetime import date
from prettytable import from_csv
from prettytable import DEFAULT

def getquestionanswers(ar): 
    url = 'http://localhost:9103/intelliq_api/getquestionanswers/' + ar.questionnaire_id + '/' + ar.question_id
    if (ar.format == 'csv'):
        url = url + '?format=csv'
    headers = {'x-observatory-auth' : ar.apikey}
    res = requests.post(url, headers=headers, verify=False)
    print(res.status_code)
    if (ar.format == 'json' and res.status_code == 200):
        print(json.dumps(res.json(), indent=4, sort_keys=False))
    elif (ar.format == 'csv' and res.status_code == 200):
        f = open("./getquestionanswers.cv",'w+')
        f.truncate(0)
        f.write(res.text)
        f.seek(0)
        x = from_csv(f, delimiter =',')
        x.set_style(DEFAULT)
        print(x)
        f.close()
    #json = res.json() #in reality a python dict
    #print(json)
    #print(json['accessToken'])
    return True


parser = argparse.ArgumentParser()
parser.add_argument('--apikey', help='Give API key', required='TRUE')
parser.add_argument('--format', choices=['csv','json'], help='Choose format (json or csv)', required='TRUE')
parser.add_argument('--questionnaire_id', help='Give Questionnaire ID', required='TRUE')
parser.add_argument('--question_id', help='Give Question ID', required='TRUE')


args = parser.parse_args()

getquestionanswers(args)
