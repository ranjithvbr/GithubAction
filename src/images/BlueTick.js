import React from "react";
import { Image, StyleSheet } from "react-native";
import { Colors } from "../styles/colors";

const BlueTick = () => (
  <Image
    style={styles.image}
    source={require("../assets/insights_bubble.png")}
  />
);

const styles = StyleSheet.create({
  image: {
    marginLeft: 58,
    height: 135,
    width: 135,
    backgroundColor: Colors.white
  }
});
export default BlueTick;
