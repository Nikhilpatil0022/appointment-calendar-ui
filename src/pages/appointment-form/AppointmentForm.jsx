import React, { Component } from "react";
import styled from "styled-components";

import { checkForErrors, showToaster } from "../../utilitites/utilities";
import { ApiService } from "../services/api.service";

import AppointmentFormView from "./AppointmentForm.view";
import { withAppConsumer } from "../../context/app.context";
import withNavigate from "../../hooks/withNavigate";
import Layout from "../../components/Layout";

const FormContainer = styled.div`
  .submit-buttom {
    display: grid;
    grid-template-columns: 1fr max-content;
  }
`;

const INITIAL_FORM_DATA = {
  patient_name: null,
  patient_age: null,
  agenda: null,
  start_time: null,
  end_time: null,
  summary: null,
  errorObject: {},
};

export class AppointmentForm extends Component {
  constructor(props) {
    super(props);

    const {
      navigate,
      appContext: {
        state: {
          userState: { userData },
        },
      },
    } = this.props;

    this.apiService = ApiService;
    this.user = userData;
    this.navigate = navigate;

    this.state = {
      formData: {
        ...INITIAL_FORM_DATA,
      },
      isLoading: false,
      isEditView: false,
    };
  }

  componentDidMount() {
    // handle isEditView here.
  }

  handleOnEachFieldChange = (fieldName, value) => {
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
  };

  handleOnFormSubmit = () => {
    const { formData } = this.state;

    const requiredFields = [
      "patient_name",
      "patient_age",
      "agenda",
      "start_time",
      "end_time",
    ];

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
    this.apiService.postAppointmentDetails(this.user.id, formData).then(
      (res) => {
        showToaster({
          title: "Appointment Created",
          description: "The Appointment has been created",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        this.setState({ isLoading: false });
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
    const { formData, isLoading } = this.state;
    return (
      <Layout>
        <FormContainer>
          <AppointmentFormView
            formData={formData}
            isLoading={isLoading}
            handleOnEachFieldChange={this.handleOnEachFieldChange}
            handleOnFormSubmit={this.handleOnFormSubmit}
          />
        </FormContainer>
      </Layout>
    );
  }
}

export default withNavigate(withAppConsumer(AppointmentForm));
