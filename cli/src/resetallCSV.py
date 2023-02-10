import argparse
import requests
import json

def resetall(ar):
    url = 'http://localhost:9103/intelliq_api/admin/resetall'
    if (ar.format == 'csv'):
        url = url + '?format=csv'
    headers = {'x-observatory-auth' : ar.apikey}
    res = requests.post(url, headers=headers, verify=False)
    print(res.status_code)
    print(res.json())
    return True


parser = argparse.ArgumentParser()
parser.add_argument('--apikey', help='Give API key', required='TRUE')
parser.add_argument('--format', choices=['csv','json'], help='Choose format (json or csv)', required='TRUE')
args = parser.parse_args()

resetall(args)