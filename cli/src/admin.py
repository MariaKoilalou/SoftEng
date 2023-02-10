#!/usr/bin/env python3
import argparse
import requests
import sys
import json
from pathlib import Path

def healthcheck(ar):
    #print(ar)
    headers = {'x-observatory-auth' : ar.apikey}
    res = requests.get('http://localhost:9103/intelliq_api/admin/healthcheck', headers=headers, verify=False)
    print(res.status_code)
    print(res.json())
    return True


def resetall(ar):
    url = 'http://localhost:9103/intelliq_api/admin/resetall'
    headers = {'x-observatory-auth' : ar.apikey}
    res = requests.post(url, headers=headers, verify=False)
    print(res.status_code)
    print(res.json())
    return True


def usermod(ar):
    #print(ar)
    headers = {'x-observatory-auth' : ar.apikey}
    res = requests.post('http://localhost:9103/intelliq_api/admin/usermod' + ar.username + '/' + ar.passw, headers=headers, verify=False)
    print(res.status_code)
    print(res.json())
    return True

def users(ar):
    #print(ar)
    headers = {'x-observatory-auth' : ar.apikey}
    res = requests.get('http://localhost:9103/intelliq_api/admin/users' + ar.username, headers=headers, verify=False)
    print(res.status_code)
    print(res.json())
    return True

def questionnaire_upd(ar):
    url = 'http://localhost:9103/intelliq_api/admin/questionnaire_upd'
    headers = {'x-observatory-auth' : ar.apikey}
    res = requests.post(url, data = ar.source, headers=headers, verify=False)
    print(res.status_code)
    print(json.dumps(res.json(), indent=4, sort_keys=False))  # maybe just print res.json, we will see in testing
    return True






if __name__ == '__main__':
    parser = argparse.ArgumentParser(prefix_chars='+')
    subs = parser.add_subparsers(help='sub-command help')
    #--usermod
    usermod_parser = subs.add_parser('--usermod', help='Create new user or update password of existing user')
    usermod_parser.add_argument('--username', help="The user's username", required=True)
    usermod_parser.add_argument('--passw', help="The user's password", required=True)
    usermod_parser.add_argument('--apikey',help="Admin's api key",required=True)
    usermod_parser.set_defaults(func=usermod)

    #--users
    users_parser = subs.add_parser('--users', help='Request data of user with provided username')
    users_parser.add_argument('--username',help="username",required=True)
    users_parser.add_argument('--apikey',help="Admin's api key",required=True)
    users_parser.set_defaults(func=users)

    #--questionnaire_upd
    sessionsupd_parser = subs.add_parser('--sessionsupd', help='Upload CSV file')
    sessionsupd_parser.add_argument('--apikey',help="Admin's api key",required=True)
    sessionsupd_parser.add_argument('--source',help="CSV file to be uploaded",required=True)
    sessionsupd_parser.set_defaults(func=questionnaire_upd)

    #--healthcheck
    healthcheck_parser = subs.add_parser('--healthcheck', help='Perform a system healthcheck')
    healthcheck_parser.add_argument('--apikey',help="Admin's api key",required=True)
    healthcheck_parser.set_defaults(func=healthcheck)

    #--resetall
    resetsessions_parser = subs.add_parser('--resetsessions', help='Reset ')
    resetsessions_parser.set_defaults(func=resetall)
    resetsessions_parser.add_argument('--apikey',help="Admin's api key",required=True)




    args = parser.parse_args() 

    if hasattr(args, 'func'):

        if args.func.__name__ == 'healthcheck':
            healthcheck(args)
        elif args.func.__name__ == 'resetsessions':
            resetall(args)
        elif args.func.__name__ == 'usermod':
            usermod(args)
        elif args.func.__name__ == 'users':
            users(args)
        elif args.func.__name__ == 'sessionsupd':
            questionnaire_upd(args)
    else:
     parser.print_help()
     sys.exit(2)
