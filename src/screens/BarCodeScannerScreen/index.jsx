import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Ionicons as Icon } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

const BarCodeScannerScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const initializeCamera = async () => {
    setScanned(false);
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      initializeCamera();
      return () => {
        isActive = false;
      };
    }, [])
  );
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    navigation.push("UploadBookBaseScreen", { isbn: data });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View
        style={{
          position: "absolute",
          left: "5%",
          top: "5%",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            marginTop: 20,
            borderRadius: "50%",
            height: 25,
            width: 25,
          }}
        >
          <Icon name="close-sharp" size={30} color="#fff"></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default BarCodeScannerScreen;
