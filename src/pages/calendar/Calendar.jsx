import React, { Component } from "react";
import moment from "moment";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Layout from "../../components/Layout";
import { ApiService } from "../services/api.service";

import { getOngoingWeekDates, showToaster } from "../../utilitites/utilities";
import WeekTable from "./WeekTable";

export class Calendar extends Component {
  constructor(props) {
    super(props);

    this.apiService = ApiService;

    this.state = {
      appointments: [],
      selectedWeek: getOngoingWeekDates(),
      isLoading: false,
    };
  }

  componentDidMount() {
    this.initialize(false);
  }

  handleDrop = (appointmentId, newStartTime) => {
    const { appointments } = this.state;

    const existingAppointment = appointments.find(
      (app) => app.id === appointmentId
    );
    // const updatedAppointments = appointments.map((appointment) => {
    //   if (appointment.id === appointmentId) {
    //     const duration = moment(appointment.end_time).diff(
    //       appointment.start_time,
    //       "hours",
    //       true
    //     );
    //     const newEndTime = moment(newStartTime).add(duration, "hours").toDate();
    //     return {
    //       ...appointment,
    //       start_time: newStartTime,
    //       end_time: newEndTime,
    //     };
    //   }
    //   return appointment;
    // });

    const duration = moment(existingAppointment.end_time).diff(
      existingAppointment.start_time,
      "hours",
      true
    );
    const newEndTime = moment(newStartTime).add(duration, "hours").toDate();

    this.apiService
      .putAppointment(appointmentId, {
        start_time: newStartTime,
        end_time: newEndTime,
      })
      .then(
        () => {
          this.initialize(true);
        },
        (err) => {
          showToaster({
            title: "Error",
            description: err.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      );

    // this.setState({
    //   appointments: updatedAppointments,
    // });
  };

  initialize = (isRescheduled) => {
    // fetch appointments
    this.setState({ isLoading: true });
    this.apiService.getAppointments().then(
      (res) => {
        this.setState({ appointments: res, isLoading: false });
        if (isRescheduled) {
          showToaster({
            title: "Success",
            description: "Appointment rescheduled successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
      },
      (err) => {
        this.setState({ isLoading: false });
        showToaster({
          title: "Error",
          description: err.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    );
  };

  render() {
    const { appointments, selectedWeek } = this.state;
    return (
      <Layout>
        <DndProvider backend={HTML5Backend}>
          <WeekTable
            appointments={appointments}
            onDrop={this.handleDrop}
            selectedWeek={selectedWeek}
          />
        </DndProvider>
      </Layout>
    );
  }
}

export default Calendar;
