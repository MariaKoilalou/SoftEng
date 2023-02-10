#!/usr/bin/env python3
import argparse
import requests
import json
from pathlib import Path
import os


def logout(ar):
    home = str(Path.home())
    url = 'http://localhost:9103/intelliq_api/logout'
    headers = {'x-observatory-auth' : ar.apikey}
    res = requests.post(url, headers=headers, verify=False)
    print(res.status_code)
    if (res.status_code == 200):
        #print(f'Status code returned: {res.status_code}')
        if os.path.exists(home + '/softeng20bAPI.token'):  # ta tokens na vroume :)
          os.remove(home + '/softeng20bAPI.token')
    return True


parser = argparse.ArgumentParser()
parser.add_argument('--apikey', help='Give API key', required='TRUE')
args = parser.parse_args()

logout(args)

#print (args)