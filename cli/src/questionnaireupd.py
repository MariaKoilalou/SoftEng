import argparse
import requests
import json
from pathlib import Path
from datetime import date
from prettytable import from_csv
from prettytable import DEFAULT

# def questionnaire_upd(ar):
#     url = 'http://localhost:9103/intelliq_api/questionnaireupd/'
#     if (ar.format == 'csv'):
#         url = url + '?format=csv'
#     with open(ar.source, 'rb') as f:
#         res = requests.post(url, files = {'file':f}, verify=False)
#     print(res.status_code)
#     if (ar.format == 'json' and res.status_code == 200):
#         print(json.dumps(res.json(), indent=4, sort_keys=False))
#     elif (ar.format == 'csv' and res.status_code == 200):
#         f = open("./QuestionnaireUpd.cv",'w+')
#         f.truncate(0)
#         f.write(res.text)
#         f.seek(0)
#         x = from_csv(f, delimiter =',')
#         x.set_style(DEFAULT)
#         print(x)
#         f.close()
#     while(1) : {}
#     return True

# def questionnaireupd(ar):
#     url = 'http://localhost:9103/intelliq_api/questionnaireupd/'
#     if (ar.format == 'csv'):
#         url = url + '?format=csv'

#     # Check if the source argument is a file path
#     if Path(ar.source).is_file():
#         with open(ar.source, 'rb') as f:
#             # Send the file in the post request using the files parameter
#             res = requests.post(url, files={'file': f}, verify=False)
#     else:
#         # Send the input data as a string in the post request
#         res = requests.post(url, data=ar.source, verify=False)

#     print(res.status_code)
#     if (ar.format == 'json' and res.status_code == 200):
#         print(json.dumps(res.json(), indent=4, sort_keys=False))
#     elif (ar.format == 'csv' and res.status_code == 200):
#         f = open("./QuestionnaireUpd.csv",'w+')
#         f.truncate(0)
#         f.write(res.text)
#         f.seek(0)
#         x = from_csv(f, delimiter =',')
#         x.set_style(DEFAULT)
#         print(x)
#         f.close()
#     while(1) : {}
#     return True


def questionnaireupd(ar):
    url = 'http://localhost:9103/intelliq_api/questionnaireupd/'
    if (ar.format == 'csv'):
        url = url + '?format=csv'

    headers = {'Content-Type': 'multipart/form-data'} # Add this line

    # Check if the source argument is a file path
    if Path(ar.source).is_file():
        with open(ar.source, 'rb') as f:
            # Send the file in the post request using the files parameter
            res = requests.post(url, files={'file': f}, headers=headers, verify=False)
    else:
        # Send the input data as a string in the post request
        res = requests.post(url, data=ar.source, headers=headers, verify=False)

    print(res.status_code)
    if (ar.format == 'json' and res.status_code == 200):
        print(json.dumps(res.json(), indent=4, sort_keys=False))
    elif (ar.format == 'csv' and res.status_code == 200):
        f = open("./QuestionnaireUpd.csv",'w+')
        f.truncate(0)
        f.write(res.text)
        f.seek(0)
        x = from_csv(f, delimiter =',')
        x.set_style(DEFAULT)
        print(x)
        f.close()
    return True


parser = argparse.ArgumentParser()
parser.add_argument('--format', choices=['csv','json'], help='Choose format (json or csv)', required='TRUE')
parser.add_argument('--source', help='Give Source', required='TRUE')
args = parser.parse_args()

questionnaireupd(args)