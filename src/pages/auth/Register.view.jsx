import React from "react";
import {
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  Button,
} from "@chakra-ui/react";

const RegisterView = (props) => {
  const {
    formData: { first_name, last_name, email, password, errorObject },
    isLoading,
    handleOnEachFieldChange,
    handleOnSubmit,
    switchView,
  } = props;
  return (
    <div className="form-wrapper">
      <Text fontSize="24px" textAlign={["center"]}>
        New Here? Register!!
      </Text>
      <FormControl isInvalid={errorObject.first_name} isRequired>
        <FormLabel>First Name</FormLabel>
        <Input
          type="text"
          value={first_name}
          onChange={(e) =>
            handleOnEachFieldChange("first_name", e.target.value)
          }
        />
        {errorObject.first_name && (
          <FormErrorMessage>{errorObject.first_name}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={errorObject.last_name} isRequired>
        <FormLabel>Last Name</FormLabel>
        <Input
          type="text"
          value={last_name}
          onChange={(e) => handleOnEachFieldChange("last_name", e.target.value)}
        />
        {errorObject.last_name && (
          <FormErrorMessage>{errorObject.last_name}</FormErrorMessage>
        )}
      </FormControl>
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
        Register
      </Button>
      <div className="switch-view">
        <div />
        <Button
          colorScheme="teal"
          variant="link"
          disabled={isLoading}
          style={{ marginTop: "8px" }}
          onClick={() => switchView("logIn")}
        >
          Existing user? Log In!!
        </Button>
      </div>
    </div>
  );
};

export default RegisterView;
