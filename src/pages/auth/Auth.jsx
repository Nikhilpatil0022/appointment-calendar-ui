import React, { Component } from "react";
import Styled from "styled-components";

import { withAppConsumer } from "../../context/app.context";
import { setUserData } from "../../context/app.actions";
import withNavigate from "../../hooks/withNavigate";

import { REGEX } from "../../constants/regex.constant";
import {
  checkForErrors,
  setAuthToken,
  showToaster,
} from "../../utilitites/utilities";

import LogInView from "./LogIn.view";
import RegisterView from "./Register.view";
import { ApiService } from "../services/api.service";

const INITIAL_FORM_DATA = {
  email: null,
  first_name: null,
  last_name: null,
  password: null,
  errorObject: {},
};

const Wrapper = Styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .form-wrapper{
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    width: 500px;
    padding: 24px;
  }
  .header-wrapper{
    text-align: center;
  }
  .switch-view{
    display: grid;
    grid-template-columns: 1fr max-content;
  }
`;

class Auth extends Component {
  constructor(props) {
    super(props);
    const {
      navigate,
      appContext: { dispatchAppAction },
    } = this.props;

    this.apiService = ApiService;
    this.navigate = navigate;
    this.dispatchAppAction = dispatchAppAction;

    this.state = {
      formData: {
        ...INITIAL_FORM_DATA,
      },
      isLoading: false,
      isLogInView: false,
    };
  }

  switchView = (view = "register") => {
    this.setState({
      isLogInView: view === "logIn",
      formData: { ...INITIAL_FORM_DATA },
    });
  };

  handleSuccessfullLogIn = (token, user) => {
    this.dispatchAppAction(setUserData(user));
    setAuthToken(token);
    this.navigate("/dashboard");
  };

  handleOnEachFieldChange = (fieldName, value) => {
    switch (fieldName) {
      case "email":
        const pattern = REGEX.EMAIL;
        let errorMessage = "";
        if (!pattern.test(value)) {
          errorMessage = "Please enter a valid Email";
        }
        this.setState((prevState) => ({
          ...prevState,
          formData: {
            ...prevState.formData,
            [fieldName]: value,
            errorObject: {
              ...prevState.formData.errorObject,
              [fieldName]: errorMessage,
            },
          },
        }));
        break;

      default:
        this.setState((prevState) => ({
          ...prevState,
          formData: {
            ...prevState.formData,
            [fieldName]: value,
            errorObject: {
              ...prevState.formData.errorObject,
              [fieldName]: "",
            },
          },
        }));
    }
  };

  handleOnFormSubmit = () => {
    const { formData, isLogInView } = this.state;
    const requiredFields = ["email", "password"];
    let method = "logInUser";
    let toasterConfig = {
      title: "Logged In",
      description: "Welcome",
    };
    if (!isLogInView) {
      toasterConfig = {
        title: "Account created.",
        description: "We've created your account for you.",
      };
      requiredFields.concat(["first_name", "last_name"]);
      method = "postUserDetails";
    }
    const { hasErrors, errorObject } = checkForErrors(formData, requiredFields);

    if (hasErrors) {
      this.setState((prevState) => ({
        ...prevState,
        formData: {
          ...prevState.formData,
          errorObject: {
            ...prevState.formData.errorObject,
            ...errorObject,
          },
        },
      }));
      return null;
    }

    this.setState({ isLoading: true });

    this.apiService[method](formData).then(
      (res) => {
        const { token, user } = res;
        showToaster({
          ...toasterConfig,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        this.setState({ isLoading: false });
        this.handleSuccessfullLogIn(token, user);
      },
      (err) => {
        this.setState({ isLoading: false });
        if (err.code === "invalid") {
          this.setState((prevState) => ({
            ...prevState,
            formData: {
              ...prevState.formData,
              errorObject: {
                ...prevState.formData.errorObject,
                ...err.errorObject,
              },
            },
          }));
        } else {
          showToaster({
            title: "Error",
            description: err.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      }
    );
  };

  render() {
    const { formData, isLoading, isLogInView } = this.state;
    return (
      <Wrapper>
        {isLogInView ? (
          <LogInView
            formData={formData}
            isLoading={isLoading}
            handleOnEachFieldChange={this.handleOnEachFieldChange}
            handleOnSubmit={this.handleOnFormSubmit}
            switchView={this.switchView}
          ></LogInView>
        ) : (
          <RegisterView
            formData={formData}
            isLoading={isLoading}
            handleOnEachFieldChange={this.handleOnEachFieldChange}
            handleOnSubmit={this.handleOnFormSubmit}
            switchView={this.switchView}
          />
        )}
      </Wrapper>
    );
  }
}

export default withNavigate(withAppConsumer(Auth));
