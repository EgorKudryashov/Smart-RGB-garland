import axios from "axios";

const backendPath = "//127.0.0.1:5000";

export const GetConnection = async (setResult, setDevice) => {
  try {
    await axios.get(`http:${backendPath}/client/`).then((response) => {
      setDevice(response.data);
      setResult(true);
    });
  } catch (e) {
    alert("Возникла ошибка");
    setResult(false);
  }
};

export const GetGarland = async (setGarland) => {
  try {
    await axios.get(`http:${backendPath}/client/garland/`).then((responce) => {
      let i = 0;
      let newGarland = [];
      responce.data.forEach((element) => {
        newGarland[i] = element;
        ++i;
      });
      setGarland(newGarland);
    });
  } catch (e) {
    alert("Возникла ошибка");
  }
};

export const GetChangeLampColor = async (id, color) => {
  try {
    await axios.get(
      `http:${backendPath}/client/change_color/?id=${id}&color=${color}`
    );
  } catch (e) {
    alert("Вознила ошибка");
  }
};
