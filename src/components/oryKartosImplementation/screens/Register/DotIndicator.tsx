import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../../../../styles/colors";
import { commonStyles } from "../../../../styles/commonStyles";
import { moderateScale } from "../../../../styles/scaleUnits";

export interface DotIndicatorProps {
  selectedIndex: number;
}

function DotIndicator({ selectedIndex }: DotIndicatorProps): JSX.Element {
  return (
    <View style={styles.container}>
      {[ ...Array(3) ].map((_, index) => {
        if (index === selectedIndex) {
          return (
            <View style={styles.selectedDotContainer} key={index.toString()}>
              <View style={styles.unSelectedDot} />
            </View>
          );
        }
        return <View style={styles.unSelectedDot} key={index.toString()} />;
      })}
    </View>
  );
}

export default DotIndicator;

const styles = StyleSheet.create({
  container: {
    ...commonStyles.flexRow,
    ...commonStyles.alignCenter
  },
  unSelectedDot: {
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: moderateScale(4),
    backgroundColor: Colors.white,
    marginHorizontal: moderateScale(3)
  },
  selectedDotContainer: {
    width: moderateScale(14),
    height: moderateScale(14),
    borderRadius: moderateScale(7),
    backgroundColor: Colors.dotBgColor,
    marginHorizontal: moderateScale(3),
    justifyContent: "center",
    alignItems: "center"
  }
});
