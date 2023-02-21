from xml.etree.ElementTree import tostring
from flask import Flask
from flask_cors import CORS
from flask import jsonify
from flask import request

from data import garland

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/client/", methods=["GET"])
def get_device():
    return jsonify("smart RGB-garland")

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
    return "200"
    #return jsonify([a.serialize() for a in garland])


if __name__ == "__main__":
    app.run()
