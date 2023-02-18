#!/usr/bin/env python3
import argparse
import requests
import json
from pathlib import Path
from datetime import date
from prettytable import from_csv
from prettytable import DEFAULT


def questionnaire(ar):
    url = 'http://localhost:9103/intelliq_api/questionnaire/' + ar.questionnaire_id
    if (ar.format == 'csv'):
        url = url + '?format=csv'
    res = requests.get(url, verify=False)
    print(res.status_code)
    if (ar.format == 'json' and res.status_code == 200):
        print(json.dumps(res.json(), indent=4, sort_keys=False))
    elif (ar.format == 'csv' and res.status_code == 200):
        f = open("./questionnaire.csv",'w+')
        f.truncate(0)
        print(res.text)
        ## just printing the csv instead of downloading it
        ## if we want it to be downloaded we should use the following code
        # f.write(res.text)
        # f.seek(0)
        # x = from_csv(f, delimiter =',')
        # x.set_style(DEFAULT)
        # print(x)
        # f.close()
    return True


parser = argparse.ArgumentParser()
parser.add_argument('--format', choices=['csv','json'], help='Choose format (json or csv)', required='TRUE')
parser.add_argument('--questionnaire_id', help='Give Questionnaire ID', required='TRUE')
args = parser.parse_args()

questionnaire(args)