import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Alert,
  ActivityIndicator,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Caption, Title } from "react-native-paper";

import { uploadFormStyles as styles } from "../../constants/sharedStyles";
import axios from "../../utils/axios";

export const FinalScreen = ({ route, navigation }) => {
  const [state, setState] = useState({
    course_name: "",
    course_code: "",
    error: {},
    errorMessage: "",
  });
  const [loading, setLoading] = useState(false);
  const { course_name, course_code, error, errorMessage } = state;

  useEffect(() => {
    if (route?.params?.bookState) {
      setState({
        ...state,
        course_name: route?.params?.bookState?.course_name
          ? route.params.bookState.course_name
          : "",
        course_code: route?.params?.bookState?.course_code
          ? route.params.bookState.course_code
          : "",
      });
    }
  }, [route]);

  const validateInput = () => {
    const validationErrors = {};

    if (course_name === "") {
      validationErrors.courseNameError = "Course Name is required!";
    }
    if (course_code === "") {
      validationErrors.courseCodeError = "Course Code is required!";
    } else {
      if (!course_code.match(/^[0-9]+$/)) {
        validationErrors.courseCodeError = "Course Code must be all numbers!";
      }
    }

    setState({ ...state, error: validationErrors });
    return Object.keys(validationErrors).length < 1;
  };

  const validateInputRef = useRef();

  const onFormSubmit = async () => {
    const isValid = validateInput();
    if (!isValid) {
      validateInputRef.current.shake(800);
    } else {
      setState({ ...state, error: {}, errorMessage: "" });
      setLoading(true);
      const formState = {
        isbn: route?.params?.bookState?.isbn,
        title: route?.params?.bookState?.title,
        edition: route?.params?.bookState?.edition,
        authors: route?.params.bookState?.authors,
        course_name: course_name,
        course_code: course_code,
      };
      if (route.params?.bookState?.id) {
        formState.id = route.params.bookState.id;
      }
      try {
        await axios.post("/requests/", formState);
        setLoading(false);
        Alert.alert(
          `Book ${
            route.params?.bookState?.id ? "updated" : "requested"
          } succesfully!`
        );
        navigation.replace("RequestedBooksScreen");
      } catch (err) {
        setState({
          ...state,
          errorMessage: err.response.data.errMessage,
        });
        setLoading(false);
      }
    }
  };
  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      <View style={styles.UploadCard}>
        <Caption style={styles.StepText}>Step 3 of 3</Caption>
        <Title stule={styles.ModalHeader}>Give us more info</Title>
        <Caption stule={styles.ModalFooter}>
          Examples of a Course Name and Code is CSCI 345, ECON 202 etc
        </Caption>
      </View>
      <Animatable.View ref={validateInputRef}>
        <View>
          <Caption style={styles.Label}>For Course (Name)</Caption>
          <TextInput
            value={course_name}
            returnKeyType="done"
            onFocus={() => {
              if (error?.courseNameError) {
                delete error["courseNameError"];
                setState({ ...state, error });
              }
            }}
            style={[styles.Input, error?.courseNameError && styles.borderError]}
            onChangeText={(text) => {
              setState({ ...state, course_name: text });
            }}
          />
          {error?.courseNameError && (
            <Caption style={styles.error}>{error?.courseNameError}</Caption>
          )}
        </View>
        <View>
          <Caption style={styles.Label}>For Course (Code)</Caption>
          <TextInput
            value={course_code}
            keyboardType="numeric"
            returnKeyType="done"
            onFocus={() => {
              if (error?.courseCodeError) {
                delete error["courseCodeError"];
                setState({ ...state, error });
              }
            }}
            style={[styles.Input, error?.courseCodeError && styles.borderError]}
            onChangeText={(text) => {
              setState({ ...state, course_code: text });
            }}
          />
          {error?.courseCodeError && (
            <Caption style={styles.error}>{error?.courseCodeError}</Caption>
          )}
        </View>

        <TouchableOpacity onPress={onFormSubmit} style={styles.SaveButton}>
          {!loading ? (
            <Caption style={styles.alignedText}>Request</Caption>
          ) : (
            <ActivityIndicator color="#fff" />
          )}
        </TouchableOpacity>
        {errorMessage !== "" && (
          <Caption
            style={{ ...styles.error, marginTop: 0, alignSelf: "center" }}
          >
            {errorMessage}
          </Caption>
        )}
      </Animatable.View>
    </ScrollView>
  );
};
