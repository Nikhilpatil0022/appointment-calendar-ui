import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const withNavigate = (Component) => (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  return <Component {...props} navigate={navigate} location={location} />;
};

export default withNavigate;
