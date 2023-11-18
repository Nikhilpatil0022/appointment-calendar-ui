import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import PrivateRoute from "../components/PrivateRoute";

import Auth from "../pages/auth/Auth";
import Dashboard from "../pages/dashboard/Dashboard";
import AppointmentForm from "../pages/appointment-form/AppointmentForm";
import Calendar from "../pages/calendar/Calendar";

const RoutesConfig = () => {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Auth />} />
        <Route path="/dashboard" exact element={<PrivateRoute />}>
          <Route path="/dashboard" exact element={<Dashboard />} />
        </Route>
        <Route path="/appointment-form" exact element={<PrivateRoute />}>
          <Route path="/appointment-form" exact element={<AppointmentForm />} />
        </Route>
        <Route path="/calendar" exact element={<PrivateRoute />}>
          <Route path="/calendar" exact element={<Calendar />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </div>
  );
};

export { RoutesConfig };
