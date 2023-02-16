import argparse
import requests
import json

def resetall(ar):
    url = 'http://localhost:9103/intelliq_api/admin/resetall'
    res = requests.post(url,verify=False)
    print(res.status_code)
    print(res.json())
    return True


parser = argparse.ArgumentParser()
args = parser.parse_args()

resetall(args)