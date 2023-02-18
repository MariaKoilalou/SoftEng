import argparse
import requests
import json

def resetall():
    url = 'http://localhost:9103/intelliq_api/resetall'
    res = requests.post(url, verify=False)
    print(res.status_code)
    print(res.json())
    # while(1) : {}
    return True


# parser = argparse.ArgumentParser()
# args = parser.parse_args()

resetall()