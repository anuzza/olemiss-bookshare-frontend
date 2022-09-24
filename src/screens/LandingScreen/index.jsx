import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Headline, Caption, Subheading } from "react-native-paper";

const LandinScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../assets/images/books.png")}
        resizeMode="contain"
      />

      <Headline style={{ fontWeight: "bold" }}>OleMiss BookShare!</Headline>
      <Subheading style={styles.smallText}>
        Don't waste time. Sell your textbook to other students on campus
      </Subheading>

      <View style={styles.flexContainer}>
        <TouchableOpacity
          onPress={() => navigation.push("SignInScreen")}
          style={styles.loginButton}
        >
          <Caption style={styles.alignedText}>Login</Caption>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.push("CreateAccountScreen")}
          style={styles.signupButton}
        >
          <Caption style={[styles.alignedText, { color: "#000" }]}>
            Sign Up
          </Caption>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LandinScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
  },
  mainText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  smallText: {
    color: "gray",
    textAlign: "center",
    marginTop: 30,
    marginHorizontal: 20,
  },
  flexContainer: {
    flexDirection: "row",
    margin: 20,
    paddingVertical: 20,
  },
  loginButton: {
    backgroundColor: "#000",
    padding: 10,
    width: 150,
    borderRadius: 30,
    marginHorizontal: 2,
  },
  signupButton: {
    backgroundColor: "#FFF",
    padding: 10,
    width: 150,
    borderRadius: 30,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: "#000",
  },

  alignedText: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 15,
  },
});
