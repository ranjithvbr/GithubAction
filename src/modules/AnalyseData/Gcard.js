import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Colors } from "../../styles/colors";
import { commonStyles } from "../../styles/commonStyles";
import { Fonts } from "../../styles/fonts";
import { Metrics } from "../../styles/metrics";
import { moderateScale } from "../../styles/scaleUnits";

function Gcard({ cardLabel, header, title, content, cardTitle }) {
  return (
    <View>
      {cardTitle && <Text style={styles.cardTitle}>{cardTitle}</Text>}
      <View style={styles.GcardContainer}>
        <View style={styles.labelHeader}>
          <Text style={styles.labelHeaderText}>{cardLabel}</Text>
        </View>
        <View style={styles.ellipseContainer}>
          {header.map(label => {
            if (label) {
              return (
                <View key={label} style={styles.gHeader}>
                  <Image
                    style={styles.gImage}
                    source={require("../../assets/ellipseBlue.png")}
                  />
                  <Text style={styles.labelClr}>{label}</Text>
                </View>
              );
            }
          })}
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
    </View>
  );
}

export default Gcard;

const styles = StyleSheet.create({
  cardTitle: {
    color: Colors.deepBlue,
    fontSize: Fonts.size.base,
    marginHorizontal: Metrics.padding.xSmall,
    marginTop: Metrics.padding.tiny,
    fontWeight: Fonts.weight.bold,
    textAlign: "center"
  },
  GcardContainer: {
    backgroundColor: Colors.headerBG,
    borderRadius: Metrics.radius.base * 2,
    flexDirection: "column",
    ...commonStyles.alignCenter,
    margin: Metrics.margin.base
  },
  labelHeader: {
    position: "relative",
    bottom: moderateScale(13),
    backgroundColor: Colors.deepBlue,
    borderRadius: Metrics.radius.medium,
    fontSize: Fonts.size.small,
    ...commonStyles.flexRow,
    ...commonStyles.alignCenter,
    ...commonStyles.justifyCenter,
    paddingHorizontal: Metrics.padding.tiny,
    paddingVertical: Metrics.padding.tiny / 2
  },
  labelHeaderText: {
    color: Colors.white,
    fontSize: Fonts.size.caption,
    fontWeight: Fonts.weight.bold
  },
  ellipseContainer: {
    ...commonStyles.flexRow,
    ...commonStyles.alignCenter,
    ...commonStyles.justifyCenter,
    flexWrap: "wrap"
  },
  gHeader: {
    flexDirection: "column",
    ...commonStyles.alignCenter,
    marginHorizontal: Metrics.margin.xSmall,
    marginVertical: Metrics.margin.medium / 2
  },
  gImage: {
    width: moderateScale(16),
    height: moderateScale(16)
  },
  labelClr: {
    color: Colors.deepBlue,
    fontSize: Fonts.size.small,
    marginTop: Metrics.margin.small / 2
  },
  title: {
    color: Colors.deepblack,
    fontWeight: "bold",
    fontSize: Fonts.size.small,
    marginTop: Metrics.margin.xSmall,
    marginHorizontal: Metrics.margin.small / 2,
    paddingBottom: Metrics.padding.xSmall / 5,
    textAlign: "center"
  },
  content: {
    color: Colors.deepblack,
    fontSize: Fonts.size.small,
    textAlign: "center",
    marginHorizontal: Metrics.margin.small / 2,
    paddingBottom: Metrics.padding.xSmall
  }
});
