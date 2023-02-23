from flask import Flask
from flask_cors import CORS
from flask import jsonify
from flask import request

from data import garland, device_name
from deviceAPI import *

app = Flask(__name__)
CORS(app)


@app.route("/client/", methods=["GET"])
def get_device():
    device_name = connectionToDevice()
    return jsonify(device_name)


@app.route("/client/garland/", methods=["GET"])
def get_garland_data():
    return jsonify([a.serialize() for a in garland])


@app.route("/client/change_color/", methods=["GET"])
def change_lamp_color():
    # obtain parameters from get request
    id = int(request.args.get("id"))
    r = int(request.args.get("r"))
    g = int(request.args.get("g"))
    b = int(request.args.get("b"))

    garland[id].r = r
    garland[id].g = g
    garland[id].b = b

    changeLampOnDevice(id, r, g, b)
    return "200"


@app.route("/client/set_brigthness/", methods=["GET"])
def change_garland_brightness():
    param = request.args.get("brigthness")
    if (0 < param & param < 255):
        setBrigthnessOnDevice(param)
        return "200"
    else:
        return "404"


@app.route("/client/choose_mode/", method=["GET"])
def choose_garland_mode():
    mode = request.args.get("mode")
    if (mode < 4):
        chooseModeOnDevice(mode)
        return "200"
    else:
        return "404"


if __name__ == "__main__":
    app.run()
