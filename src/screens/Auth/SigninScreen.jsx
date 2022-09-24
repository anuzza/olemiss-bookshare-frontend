import React, { useState, useRef, useEffect } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import { Caption, Headline, Subheading } from "react-native-paper";
import ScreenContainer from "../../components/ScreenContainer";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../redux/actions/auth";

const SigninScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const authLoading = useSelector((state) => state.auth.authLoading);
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
  }, []);

  const { email, password } = state;
  const validateInput = useRef();

  const onLogin = () => {
    dispatch(login(email, password));
    if (error) {
      validateInput.current.shake(800);
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <ScreenContainer>
        <Headline style={styles.header}>Welcome Back! </Headline>
        <Subheading style={styles.smallText}>Sign in to continue</Subheading>

        <Animatable.View ref={validateInput}>
          <TextInput
            value={email}
            style={[styles.input, error?.emailError && styles.borderError]}
            placeholder="Email"
            onFocus={() => {
              if (error?.error || error?.emailError) {
                dispatch(clearErrors());
              }
            }}
            keyboardType="email-address"
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
            value={password}
            style={[styles.input, error?.passwordError && styles.borderError]}
            placeholder="Password"
            onFocus={() => {
              if (error?.error || error?.passwordError) {
                dispatch(clearErrors());
              }
            }}
            returnKeyType="done"
            secureTextEntry={true}
            onChangeText={(text) => {
              setState({ ...state, password: text });
            }}
          />
          {error?.passwordError && (
            <Text style={[styles.error, { justifyContent: "flex-start" }]}>
              {error?.passwordError}
            </Text>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => onLogin()}
              style={styles.loginButton}
            >
              {!authLoading ? (
                <Caption style={styles.alignedText}>Login Now</Caption>
              ) : (
                <ActivityIndicator color="#fff" />
              )}
            </TouchableOpacity>
            {error?.error && <Text style={styles.error}>{error?.error}</Text>}

            <Subheading style={{ marginTop: 50 }}>Forgot Password ?</Subheading>

            <View style={styles.flexContainer}>
              <Subheading style={{ color: "gray" }}>
                Don't have an account?
              </Subheading>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Auth", {
                    screen: "CreateAccountScreen",
                  })
                }
              >
                <Subheading style={{ fontWeight: "bold", marginLeft: 2 }}>
                  Sign Up
                </Subheading>
              </TouchableOpacity>
            </View>
          </View>
        </Animatable.View>
      </ScreenContainer>
    </SafeAreaView>
  );
};

export default SigninScreen;

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
    marginTop: 20,
  },
  flexContainer: {
    flexDirection: "row",
    marginTop: 20,
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
