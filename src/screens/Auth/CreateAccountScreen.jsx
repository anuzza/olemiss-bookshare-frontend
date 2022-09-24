import React, { useState, useRef, useEffect } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import { Caption, Headline, Subheading } from "react-native-paper";
import ScreenContainer from "../../components/ScreenContainer";
import { useDispatch, useSelector } from "react-redux";
import { signup, clearErrors } from "../../redux/actions/auth";
import CustomPicker from "../../components/CustomPicker";

const options = ["Freshmen", "Sophmore", "Junior", "Senior"];

const CreateAccountScreen = ({ navigation }) => {
  const authLoading = useSelector((state) => state.auth.authLoading);
  const error = useSelector((state) => state.auth.error);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    contact_number: "",
    major: "",
  });
  const [classification, setClassification] = useState(options[0]);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
  }, []);

  const { name, email, password, contact_number, major } = state;
  const validateInput = useRef();

  const onSignup = () => {
    dispatch(
      signup(name, email, contact_number, classification, major, { password })
    );
    if (error) {
      validateInput.current.shake(800);
    }
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: modalVisible ? "rgba(255,255,255,0.1)" : "#fff",
        flex: 1,
      }}
    >
      <ScrollView>
        <ScreenContainer>
          <Headline style={styles.header}>New here? </Headline>
          <Subheading style={styles.smallText}>
            Sign up and explore variety of books!
          </Subheading>

          <Animatable.View ref={validateInput}>
            <TextInput
              placeholder="Name"
              style={[styles.input, error?.nameError && styles.borderError]}
              value={name}
              returnKeyType="next"
              onFocus={() => {
                if (error?.error || error?.nameError) {
                  dispatch(clearErrors());
                }
              }}
              onChangeText={(text) => {
                setState({ ...state, name: text });
              }}
            />
            {error?.nameError && (
              <Text style={[styles.error, { justifyContent: "flex-start" }]}>
                {error?.nameError}
              </Text>
            )}
            <TextInput
              placeholder="Email"
              value={email}
              style={[styles.input, error?.emailError && styles.borderError]}
              keyboardType="email-address"
              onFocus={() => {
                if (error?.error || error?.emailError) {
                  dispatch(clearErrors());
                }
              }}
              returnKeyType="next"
              onChangeText={(text) => {
                setState({ ...state, email: text });
              }}
            />
            {error?.emailError && (
              <Text style={[styles.error, { justifyContent: "flex-start" }]}>
                {error?.emailError}
              </Text>
            )}
            <TextInput
              placeholder="Password"
              value={password}
              style={[styles.input, error?.passwordError && styles.borderError]}
              secureTextEntry={true}
              onFocus={() => {
                if (error?.error || error?.passwordError) {
                  dispatch(clearErrors());
                }
              }}
              returnKeyType="next"
              onChangeText={(text) => {
                setState({ ...state, password: text });
              }}
            />
            {error?.passwordError && (
              <Text style={[styles.error, { justifyContent: "flex-start" }]}>
                {error?.passwordError}
              </Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={contact_number}
              returnKeyType="next"
              onChangeText={(text) => {
                setState({ ...state, contact_number: text });
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Classification"
              value={classification}
              editable={false}
              selectTextOnFocus={false}
              returnKeyType="next"
              onPressIn={() => {
                setModalVisible(true);
              }}
            />
            {modalVisible && (
              <CustomPicker
                options={options}
                value={classification}
                setValue={setClassification}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
              />
            )}
            <TextInput
              style={[styles.input, error?.majorError && styles.borderError]}
              placeholder="Major"
              value={major}
              returnKeyType="done"
              onFocus={() => {
                if (error?.error || error?.majorError) {
                  dispatch(clearErrors());
                }
              }}
              onChangeText={(text) => {
                setState({ ...state, major: text });
              }}
            />
            {error?.majorError && (
              <Text style={[styles.error, { justifyContent: "flex-start" }]}>
                {error?.majorError}
              </Text>
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => onSignup()}
                style={styles.loginButton}
              >
                {!authLoading ? (
                  <Caption style={styles.alignedText}>Sign Up</Caption>
                ) : (
                  <ActivityIndicator color="#fff" />
                )}
              </TouchableOpacity>
              {error?.error && <Text style={styles.error}>{error?.error}</Text>}
              <View style={styles.flexContainer}>
                <Subheading style={{ color: "gray" }}>
                  Already have an account?
                </Subheading>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Auth", {
                      screen: "SignInScreen",
                    })
                  }
                >
                  <Subheading style={{ fontWeight: "bold", marginLeft: 2 }}>
                    Sign In
                  </Subheading>
                </TouchableOpacity>
              </View>
            </View>
          </Animatable.View>
        </ScreenContainer>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateAccountScreen;

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    marginTop: 20,
  },
  input: {
    marginTop: 40,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  smallText: { color: "gray", fontSize: 15, marginTop: 20 },
  loginButton: {
    width: 200,
    backgroundColor: "#000",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    marginTop: 10,
  },
  flexContainer: {
    flexDirection: "row",
    marginTop: 30,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  alignedText: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 16,
  },
  error: {
    marginTop: 10,
    color: "red",
  },
  borderError: {
    borderBottomColor: "red",
    borderBottomWidth: 1,
  },
});
