import React from "react";
import { StyleSheet, Text, SafeAreaView, Image, View } from "react-native";
import { Colors } from "../styles/colors";
import { commonStyles } from "../styles/commonStyles";
import { Fonts } from "../styles/fonts";
import { Metrics } from "../styles/metrics";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "../styles/widthHeightToDP";

const HowMeldWorks = ({ sourceImage, contentStr }) => {
  return (
    <SafeAreaView style={commonStyles.flex1}>
      <View style={styles.centeredView}>
        <Image
          source={sourceImage}
          style={styles.centerImage}
          resizeMode={"contain"}
        />
        <Text style={styles.bottomText}>{contentStr}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
    backgroundColor: Colors.white,
    ...commonStyles.alignCenter
  },
  bottomText: {
    marginTop: Metrics.margin.small,
    fontSize: Fonts.size.base,
    textAlign: "center",
    color: Colors.deepBlue,
    marginHorizontal: Metrics.margin.tiny
  },
  centerImage: {
    marginTop: Metrics.margin.small,
    height: heightPercentageToDP(50),
    width: widthPercentageToDP(100)
  }
});

export default HowMeldWorks;
