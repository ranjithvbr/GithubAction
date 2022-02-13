import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Header = ({ navigation, isDisplayCloseIcon }) => {
  let icon = isDisplayCloseIcon
    ? require("../../assets/Close.png")
    : require("../../assets/Back.png");
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image style={styles.leftImage} resizeMode={"contain"} source={icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    height: 100
  },
  leftImage: {
    height: 20,
    width: 20,
    marginTop: 60,
    marginLeft: 20
  }
});

export default Header;
