#!/usr/bin/env python3
import argparse
import requests
import sys
import json
from pathlib import Path

def healthcheck(ar):
    res = requests.get('http://localhost:9103/intelliq_api/admin/healthcheck', verify=False)
    print(res.status_code)
    print(res.json())
    return True


def resetall(ar):
    url = 'http://localhost:9103/intelliq_api/admin/resetall'
    res = requests.post(url, verify=False)
    print(res.status_code)
    print(res.json())
    return True



def questionnaire_upd(ar):
    url = 'http://localhost:9103/intelliq_api/admin/questionnaire_upd'
    res = requests.post(url, data = ar.source, verify=False)
    print(res.status_code)
    print(json.dumps(res.json(), indent=4, sort_keys=False))  # maybe just print res.json, we will see in testing
    return True






if __name__ == '__main__':
    parser = argparse.ArgumentParser(prefix_chars='+')
    subs = parser.add_subparsers(help='sub-command help')

    #--questionnaire_upd
    sessionsupd_parser = subs.add_parser('--sessionsupd', help='Upload CSV file')
    sessionsupd_parser.add_argument('--source',help="CSV file to be uploaded",required=True)
    sessionsupd_parser.set_defaults(func=questionnaire_upd)

    #--healthcheck
    healthcheck_parser = subs.add_parser('--healthcheck', help='Perform a system healthcheck')
    healthcheck_parser.set_defaults(func=healthcheck)

    #--resetall
    resetsessions_parser = subs.add_parser('--resetsessions', help='Reset ')
    resetsessions_parser.set_defaults(func=resetall)




    args = parser.parse_args() 

    if hasattr(args, 'func'):

        if args.func.__name__ == 'healthcheck':
            healthcheck(args)
        elif args.func.__name__ == 'resetsessions':
            resetall(args)
        elif args.func.__name__ == 'sessionsupd':
            questionnaire_upd(args)
    else:
     parser.print_help()
     sys.exit(2)
