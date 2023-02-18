# import argparse
# import requests
# import json

# def resetall():
#     url = 'http://localhost:9103/intelliq_api/resetall'
#     res = requests.post(url, verify=False)
#     print(res.status_code)
#     print(res.json())
#     # while(1) : {}
#     return True


# # parser = argparse.ArgumentParser()
# # args = parser.parse_args()

# resetall()

import argparse
import requests


def reset_all():
    url = 'http://localhost:9103/intelliq_api/resetall/'
    response = requests.get(url)

    if response.status_code == 200:
        print("All data removed successfully!")
    else:
        print("Error removing data:", response.text)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    args = parser.parse_args()

    reset_all()
