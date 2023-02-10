import argparse
import requests
import json

def healthcheck(ar):
	headers = {'x-observatory-auth' : ar.apikey}
	res = requests.get('http://localhost:9103/intelliq_api/admin/healthcheck', headers=headers, verify=False)
	print(res.status_code)
	print(res.json())  #CSV?????
	return True


parser = argparse.ArgumentParser()
parser.add_argument('--apikey', help='Give API key', required='TRUE')
args = parser.parse_args()

healthcheck(args)
