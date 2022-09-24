import React, { useRef, useState, useEffect } from "react";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Caption, Title } from "react-native-paper";
import { uploadFormStyles as styles } from "../../constants/sharedStyles";
import { searchBookByISBN } from "../../utils/searchByIsbn";

let idPresent = false;
export const BaseScreen = ({ route, navigation }) => {
  const [state, setState] = useState({
    isbn: "",
    error: {},
  });
  const { isbn, error } = state;

  useEffect(() => {
    if (route?.params?.bookState) {
      idPresent =
        route &&
        route.params &&
        route.params.bookState &&
        route.params.bookState.id;

      setState({
        ...state,
        isbn: route.params.bookState.isbn,
      });
    }
  }, [route]);

  const validateInput = () => {
    const validationErrors = {};
    if (isbn === "") {
      validationErrors.isbnError = "Isbn is required!";
    } else {
      if (!isbn.match(/^[0-9]+$/)) {
        validationErrors.isbnError = "Isbn must be all numbers!";
      }
      if (isbn.length !== 10 && isbn.length !== 13) {
        validationErrors.isbnError = "Isbn can only be 10 or 13 digits long!";
      }
    }

    setState({ ...state, error: validationErrors });
    return Object.keys(validationErrors).length < 1;
  };

  const onFormSubmit = async () => {
    const isValid = validateInput();
    if (!isValid) {
      validateInputRef.current.shake(800);
    } else {
      setState({ ...state, error: {} });
      let bookState;
      if (!idPresent) {
        bookState = { isbn };
        const data = await searchBookByISBN(isbn);

        if (data) {
          bookState = {
            ...bookState,
            ...data,
          };
        }
        navigation.push("RequestBookSecondaryScreen", {
          bookState,
        });
      } else {
        navigation.push("RequestBookSecondaryScreen", {
          bookState: {
            ...route?.params?.bookState,
            authors: route?.params?.bookState?.authors
              ? route.params.bookState.authors.join(",")
              : "",
          },
        });
      }
    }
  };

  const validateInputRef = useRef();

  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      <View style={styles.UploadCard}>
        <Caption style={styles.StepText}>Step 1 of 3</Caption>
        <Title>Find your ISBN</Title>
        <Caption style={styles.ModalFooter}>
          You can find the ISBN for your course books by going to My Schedule
          and Course Materials under Course Registration tab in my.olemiss.edu
        </Caption>
      </View>
      <Animatable.View ref={validateInputRef} style={styles.FormContainer}>
        <View>
          <Title
            style={{
              marginHorizontal: 20,
              fontSize: 20,
            }}
          >
            What is the ISBN?(ISBN9/ISBN13)
          </Title>
          <TextInput
            keyboardType="numeric"
            returnKeyType="done"
            onFocus={() => {
              if (error?.isbnError) {
                delete error["isbnError"];
                setState({ ...state, error });
              }
            }}
            style={[styles.Input, error?.isbnError && styles.borderError]}
            value={isbn}
            onChangeText={(text) => {
              setState({ ...state, isbn: text });
            }}
          />
          {error?.isbnError && (
            <Caption
              style={{
                ...styles.error,
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              {error?.isbnError}
            </Caption>
          )}
        </View>
      </Animatable.View>
      <TouchableOpacity onPress={onFormSubmit} style={styles.SaveButton}>
        <Caption style={styles.alignedText}>Continue</Caption>
      </TouchableOpacity>
    </ScrollView>
  );
};
