import React from "react";
import { Image, StyleSheet } from "react-native";

const ImagesExample = ({ source }) => (
  <Image style={styles.image} source={source} />
);

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
    marginLeft: 80,
    marginTop: 85,
    alignItems: "center"
  }
});
export default ImagesExample;
