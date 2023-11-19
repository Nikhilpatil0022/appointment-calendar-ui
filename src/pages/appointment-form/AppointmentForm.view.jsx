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

const AppointmentFormView = (props) => {
  const {
    formData: {
      patient_name,
      patient_age,
      agenda,
      start_time,
      end_time,
      summary,
      errorObject,
    },
    isLoading,
    handleOnEachFieldChange,
    handleOnFormSubmit,
  } = props;

  return (
    <div className="form-wrapper">
      <Text fontSize="24px" textAlign={["center"]}>
        Create Appointment
      </Text>
      <FormControl isInvalid={errorObject.patient_name} isRequired>
        <FormLabel>Patient Name</FormLabel>
        <Input
          type="text"
          value={patient_name}
          onChange={(e) =>
            handleOnEachFieldChange("patient_name", e.target.value)
          }
        />
        {errorObject.patient_name && (
          <FormErrorMessage>{errorObject.patient_name}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={errorObject.patient_age} isRequired>
        <FormLabel>Patient age</FormLabel>
        <Input
          type="number"
          value={patient_age}
          onChange={(e) =>
            handleOnEachFieldChange("patient_age", e.target.value)
          }
        />
        {errorObject.patient_age && (
          <FormErrorMessage>{errorObject.patient_age}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={errorObject.agenda} isRequired>
        <FormLabel>Agenda</FormLabel>
        <Input
          type="text"
          value={agenda}
          onChange={(e) => handleOnEachFieldChange("agenda", e.target.value)}
        />
        {errorObject.agenda && (
          <FormErrorMessage>{errorObject.agenda}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={errorObject.start_time} isRequired>
        <FormLabel>Start Time</FormLabel>
        <Input
          type="datetime-local"
          value={start_time}
          onChange={(e) =>
            handleOnEachFieldChange("start_time", e.target.value)
          }
          step={60 * 60}
        />
        {errorObject.start_time && (
          <FormErrorMessage>{errorObject.start_time}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={errorObject.end_time} isRequired>
        <FormLabel>End Time</FormLabel>
        <Input
          type="datetime-local"
          value={end_time}
          onChange={(e) => handleOnEachFieldChange("end_time", e.target.value)}
          step={60 * 60}
        />
        {errorObject.end_time && (
          <FormErrorMessage>{errorObject.end_time}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={errorObject.summary}>
        <FormLabel>Summary</FormLabel>
        <Input
          type="text"
          value={summary}
          onChange={(e) => handleOnEachFieldChange("summary", e.target.value)}
        />
        {errorObject.summary && (
          <FormErrorMessage>{errorObject.summary}</FormErrorMessage>
        )}
      </FormControl>
      <div className="submit-buttom">
        <div />
        <Button
          isLoading={isLoading}
          loadingText="Loading"
          colorScheme="teal"
          onClick={handleOnFormSubmit}
          style={{ marginTop: "1rem", width: "100%" }}
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default AppointmentFormView;
