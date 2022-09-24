import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";

const SearchBarHeader = ({ navigation, handleSearch }) => {
  return (
    <View style={[styles.container, styles.bottomLine]}>
      <View style={styles.flexContainer}>
        <Icon.Button
          name="menu-outline"
          size={25}
          color="#000"
          backgroundColor="#fff"
          onPress={() => navigation.openDrawer()}
        />
        <Text style={styles.searchText}>What are you looking for?</Text>
      </View>
      <Searchbar
        onChangeText={(text) => {
          handleSearch(text);
        }}
        placeholder="Book Title / Course / ISBN"
        placeholderTextColor="#BBBBBB"
        iconColor="#000"
        style={styles.searchBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  bottomLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#ECEFF1",
  },
  flexContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchText: {
    fontSize: 18,
    alignSelf: "center",
    color: "#74758C",
  },
  searchBar: {
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
    padding: 2,
    borderRadius: 10,
    backgroundColor: "#E5E5E5",
    borderWidth: 1,
    borderColor: "#d6d7db",
  },
});

export default SearchBarHeader;
