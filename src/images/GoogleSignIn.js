import React from "react";
import { Image, StyleSheet } from "react-native";

const GoogleSignIn = () => (
  <Image style={styles.image} source={require("../assets/a.png")} />
);
const styles = StyleSheet.create({
  image: {
    maxWidth: "100%"
  }
});
export default GoogleSignIn;
