import { httpInterceptor } from "./http.interceptor.service";

class _ApiService {
  constructor() {
    this.httpInterceptor = httpInterceptor;
  }
  prefetchUser = (params = {}) => {
    return this.httpInterceptor.get("auth/user/", params);
  };

  handleSuccessfullLogOut = () => {
    this.httpInterceptor.handleLogOutUser();
  };
}

const ApiService = new _ApiService();
export { ApiService };
