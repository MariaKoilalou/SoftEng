import argparse
import requests
import json

def healthcheck(ar):
	res = requests.get('http://localhost:9103/intelliq_api/healthcheck', verify=False)
	print(res.status_code)
	print(res.json())  #CSV?????
	while(1):
		{}
	return True

parser = argparse.ArgumentParser()
args = parser.parse_args()

healthcheck(args)
