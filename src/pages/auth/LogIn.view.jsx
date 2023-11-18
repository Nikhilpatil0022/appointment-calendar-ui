import React from "react";
// import PropTypes from "prop-types";
import {
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  Button,
} from "@chakra-ui/react";

const LogInView = (props) => {
  const {
    formData: { email, password, errorObject },
    isLoading,
    handleOnEachFieldChange,
    handleOnSubmit,
    switchView,
  } = props;
  return (
    <div className="form-wrapper">
      <Text fontSize="24px" textAlign={["center"]}>
        Log In
      </Text>
      <FormControl isInvalid={errorObject.email} isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => handleOnEachFieldChange("email", e.target.value)}
        />
        {errorObject.email && (
          <FormErrorMessage>{errorObject.email}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={errorObject.password} isRequired>
        <FormLabel>password</FormLabel>
        <InputGroup>
          <Input
            type="password"
            value={password}
            onChange={(e) =>
              handleOnEachFieldChange("password", e.target.value)
            }
          />
        </InputGroup>
        {errorObject.password && (
          <FormErrorMessage>{errorObject.email}</FormErrorMessage>
        )}
      </FormControl>
      <Button
        isLoading={isLoading}
        loadingText="Taking you in!"
        colorScheme="teal"
        onClick={handleOnSubmit}
        style={{ marginTop: "1rem", width: "100%" }}
      >
        Log In
      </Button>
      <div className="switch-view">
        <div />
        <Button
          colorScheme="teal"
          variant="link"
          disabled={isLoading}
          style={{ marginTop: "8px" }}
          onClick={() => switchView()}
        >
          New Here? Register!!
        </Button>
      </div>
    </div>
  );
};

// LogInView.propTypes = {
//   formData: PropTypes.object({
//     email: PropTypes.string,
//     password: PropTypes.string,
//     errorObject: PropTypes.object,
//   }),
//   isLoading: PropTypes.bool,
//   handleOnEachFieldChange: PropTypes.func,
//   handleOnSubmit: PropTypes.func,
//   switchView: PropTypes.func,
// };

// LogInView.defaultProps = {
//   formData: {
//     email: "",
//     password: "",
//     errorObject: {},
//   },
//   isLoading: false,
//   handleOnEachFieldChange: () => {},
//   handleOnSubmit: () => {},
//   switchView: () => {},
// };

export default LogInView;
