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
}

const ApiService = new _ApiService();
export { ApiService };