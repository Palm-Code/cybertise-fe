import { getDownloadFileAPIURL } from "@/core/routes/common";
import { BASE_URL } from "@/utils/config";
import axios from "axios";
import Cookies from "js-cookie";

export const fetchGetDownloadFiles = async (id: string, filename: string) => {
  const cookie = Cookies;
  const accessToken = cookie.get("token");
  return await axios
    .get(`${BASE_URL}${getDownloadFileAPIURL(id)}`, {
      responseType: "arraybuffer",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename); //or any other extension
      document.body.appendChild(link);
      link.click();
    })
    .catch((error) => {
      throw error?.response?.data || error?.response || error.message;
    });
};
