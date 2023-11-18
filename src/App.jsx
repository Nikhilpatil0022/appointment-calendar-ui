import React from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createStandaloneToast } from "@chakra-ui/react";

import withNavigate from "./hooks/withNavigate";
import { getLocalStorageItem, setAuthToken } from "./utilitites/utilities";

import { ApiService } from "./services/app.api.service";
import { AppContext } from "./context/app.context";
import { setUserData } from "./context/app.actions";
import { httpInterceptor } from "./services/http.interceptor.service";
import { RoutesConfig } from "./routes/Routes";

const { ToastContainer } = createStandaloneToast();

class App extends React.Component {
  constructor(props) {
    super(props);

    const { navigate } = this.props;
    this.navigate = navigate;
    this.apiService = ApiService;
    this.state = {
      isInitialLoading: true,
    };
  }

  componentDidMount() {
    this.initialize();
    this.setHttpServices();
  }

  setHttpServices() {
    const { dispatchAppAction } = this.context;
    httpInterceptor.setDispatchAppAction(dispatchAppAction);
    httpInterceptor.setHandleLogOutUser(this.handleSuccessfullLogOut);
  }

  handleSuccessfullLogIn = (user) => {
    const { dispatchAppAction } = this.context;
    dispatchAppAction(setUserData(user));
    this.navigate("/dashboard");
  };

  handleSuccessfullLogOut = () => {
    const { dispatchAppAction } = this.context;
    dispatchAppAction(setUserData(null));
    setAuthToken();
    this.navigate("/");
  };

  initialize = () => {
    const authToken = getLocalStorageItem("clinicToken");
    if (authToken) {
      // fetch  logged in user using token
      this.apiService.prefetchUser().then(
        (res) => {
          // set user in context
          this.setState({ isInitialLoading: false });
          this.handleSuccessfullLogIn(res.user);
        },
        (err) => {
          this.setState({ isInitialLoading: false });
          this.handleSuccessfullLogOut();
        }
      );
    } else {
      this.setState({ isInitialLoading: false });
      this.handleSuccessfullLogOut();
    }
  };

  render() {
    const { isInitialLoading } = this.state;

    if (isInitialLoading) {
      return null;
    }

    return (
      <ChakraProvider>
        <RoutesConfig />
        <ToastContainer />
      </ChakraProvider>
    );
  }
}

App.contextType = AppContext;

export default withNavigate(App);
