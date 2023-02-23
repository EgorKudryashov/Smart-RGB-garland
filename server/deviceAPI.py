import requests
import json
from data import garland

device_address = "192.168.31.155"

def connectionToDevice():
    res = requests.get(f"http://{device_address}/connection")
    device =json.loads(res.text)

    if (res.status_code == requests.codes.ok) :
        loadGarlandOnDevice()

    return device["name"]


def loadGarlandOnDevice():
    data = {
        "lamps": [a.serialize() for a in garland]
    }
    data =json.dumps(data)
    res = requests.post(f"http://{device_address}/refreshGarland", data=data)


def changeLampOnDevice(id, r, g, b):
    res = requests.get(f"http://{device_address}/changeColor/?id={id}&r={r}&g={g}&b={b}")


def setBrigthnessOnDevice(param):
    res = requests.get(f"http://{device_address}/setBrightness/?bright={param}")


def chooseModeOnDevice(mode):
    res = requests.get(f"http://{device_address}/chooseMode/?mode={mode}")