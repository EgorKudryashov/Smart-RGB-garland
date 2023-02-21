class Lamp(object):
    id = ""
    r = ""
    g = ""
    b = ""

    def __init__(self, _id, _r,_g,_b):
        self.id = _id
        self.r = _r
        self.g = _g
        self.b = _b

    def serialize(self):
        return {
            "id": self.id,
            "r": self.r,
            "g": self.g,
            "b": self.b
        }
