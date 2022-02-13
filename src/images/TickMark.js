import React from "react";
import { Image, StyleSheet } from "react-native";

const TickMark = () => (
  <Image style={styles.image} source={require("../assets/tick.png")} />
);

const styles = StyleSheet.create({
  image: {
    marginLeft: 58,
    height: 15,
    width: 15
  }
});
export default TickMark;
