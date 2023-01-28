import axios from "axios";
import { garland } from "../garland";
const backendPath = "//127.0.0.1:5000";

export const GetConnection = async (setResult, setDevice) => {
  try {
    await axios.get(`http:${backendPath}/client/`).then((response) => {
      setDevice(response.data);
      setResult(true);
      console.log("тута");
    });
  } catch (e) {
    alert("Возникла ошибка");
    setResult(false);
  }
};

export const GetGarland = async () => {
  try {
    await axios.get(`http:${backendPath}/client/garland/`).then((responce) => {
      let i = 0;
      responce.data.forEach((element) => {
        garland[i] = element;
        ++i;
      });
      console.log(garland);
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
