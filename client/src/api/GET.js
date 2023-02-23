import axios from "axios";

const backendPath = "//127.0.0.1:5000";

export const GetConnection = async (setResult, setDevice) => {
  try {
    await axios.get(`http:${backendPath}/client/`).then((response) => {
      setDevice(response.data);
      setResult(true);
    });
  } catch (e) {
    alert("Connection ERROR");
    setResult(false);
  }
};

export const GetGarland = async (setGarland, setCount) => {
  try {
    await axios.get(`http:${backendPath}/client/garland/`).then((responce) => {
      let i = 0;
      let newGarland = [];
      responce.data.forEach((element) => {
        newGarland[i] = element;
        ++i;
      });

      setCount(i);
      setGarland(newGarland);
    });
  } catch (e) {
    alert("Get garland info ERROR");
  }
};

export const GetChangeLampColor = async (id, color) => {
  try {
    await axios.get(
      `http:${backendPath}/client/change_color/?id=${id}&r=${color.r}&g=${color.g}&b=${color.b}`
    );
  } catch (e) {
    alert("Change lamp color ERROR");
  }
};

export const setGarlandBrightness = async (bright) => {
  try {
    await axios.get(
      `http://${backendPath}/client/set_brigthness/?bright=${bright}`
    );
  } catch (e) {
    alert("Set brightness ERROR");
  }
};

export const ChooseGarlandMode = async (mode) => {
  try {
    await axios.get(`http:${backendPath}/client/choose_mode/?mode=${mode}`);
  } catch (e) {
    alert("Mode change ERROR");
  }
};
