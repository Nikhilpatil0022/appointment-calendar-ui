import { httpInterceptor } from "../../services/http.interceptor.service";
class _ApiService {
  constructor() {
    this.httpInterceptor = httpInterceptor;
  }

  postUserDetails = (params) => {
    return this.httpInterceptor.post("auth/register/", params);
  };

  logInUser = (params) => {
    return this.httpInterceptor.post("auth/login/", params);
  };

  getUsers = (params) => {
    return this.httpInterceptor.get("users/", params);
  };

  handleSuccessfullLogOut = () => {
    this.httpInterceptor.handleLogOutUser();
  };

  postAppointmentDetails = (userId, params) => {
    const url = `appointments/`;
    return this.httpInterceptor.post(url, params);
  };

  getAppointments = () => {
    return this.httpInterceptor.get("appointments/");
  };

  putAppointment = (appointmentId, params) => {
    const url = `appointments/${appointmentId}/`;
    return this.httpInterceptor.put(url, params);
  };
}

const ApiService = new _ApiService();
export { ApiService };
