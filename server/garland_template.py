class Lamp(object):
    id = ""
    color = ""

    def __init__(self, _id, _color):
        self.id = _id
        self.color = _color

    def serialize(self):
        return {
            "id": self.id,
            "color": self.color,
        }
