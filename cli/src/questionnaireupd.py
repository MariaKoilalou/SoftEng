import argparse
import sys
import requests
import json
from pathlib import Path
from datetime import date
from prettytable import from_csv
from prettytable import DEFAULT

def questionnaireupd(ar):
    files = {'file': open(ar.source, 'rb')}
    res = requests.post('http://localhost:9103/intelliq_api/questionnaireupd/', files=files, verify=False)
    print(res)
    print(res.status_code)
    print(res.json())
    return True

parser = argparse.ArgumentParser()
parser.add_argument('--format', choices=['csv','json'], help='Choose format (json or csv)', required='TRUE')
parser.add_argument('--source',help="json file to be uploaded",required=True)
args = parser.parse_args()
if args.format == 'json':
    file_ext = Path(args.source).suffix
    if file_ext.lower() == '.json':
        questionnaireupd(args)
    else:
        print('Invalid file format. Only JSON files are supported.')
else:
    print('Invalid input format. Only JSON files are supported.')