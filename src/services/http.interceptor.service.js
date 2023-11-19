import axios from "axios";
import { getLocalStorageItem } from "../utilitites/utilities";

const BASE_URL = "https://zendenta-appointments.netlify.app";
class _HttpInterceptor {
  constructor() {
    this.baseUrl = BASE_URL;
    this.authToken = getLocalStorageItem("clinicToken");
    this.handleLogOutUser = null;
  }

  setDispatchAppAction(dispatchAppAction) {
    this.dispatchAppAction = dispatchAppAction;
  }

  setHandleLogOutUser(handleLogOutUser) {
    this.handleLogOutUser = handleLogOutUser;
  }

  getHeaders = () => {
    let headers = null;
    if (this.authToken) {
      headers = {
        Authorization: `Authorization ${this.authToken}`,
      };
    }
    return headers;
  };

  performApiCall = (axiosConfig) => {
    return axios(axiosConfig)
      .then((response) => response.data)
      .catch((error) => Promise.reject(error.response.data));
  };

  get = (url, params) => {
    const axiosConfig = {
      method: "GET",
      url: `${this.baseUrl}/${url}`,
      headers: this.getHeaders(),
      data: params,
    };

    return this.performApiCall(axiosConfig);
  };

  post = (url, params) => {
    const axiosConfig = {
      method: "POST",
      url: `${this.baseUrl}/${url}`,
      headers: this.getHeaders(),
      data: params,
    };

    return this.performApiCall(axiosConfig);
  };

  put = (url, params) => {
    const axiosConfig = {
      method: "PUT",
      url: `${this.baseUrl}/${url}`,
      headers: this.getHeaders(),
      data: params,
    };

    return this.performApiCall(axiosConfig);
  };
}

const httpInterceptor = new _HttpInterceptor();
export { httpInterceptor };
