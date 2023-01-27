from xml.etree.ElementTree import tostring
from flask import Flask
from flask import jsonify
from flask import request

from data import garland

app = Flask(__name__)

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
    color = request.args.get("color")

    garland[id].color=color
    return jsonify([a.serialize() for a in garland])


if __name__ == "__main__":
    app.run()
