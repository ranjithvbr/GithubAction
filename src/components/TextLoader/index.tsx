import React, { useState, useEffect, ReactElement } from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import { Fonts } from "../../styles/fonts";
import { Metrics } from "../../styles/metrics";
import { Colors } from "../../styles/colors";
import { commonStyles } from "../../styles/commonStyles";
import BlackTickIcon from "../svg/blackTickIcon";
import { DataAnalysis } from "../../constant/interfaces";
import { widthPercentageToDP } from "../../styles/widthHeightToDP";
import { moderateScale } from "../../styles/scaleUnits";

const Textloader = ({
  dataAnalysis
}: {
  dataAnalysis: Array<DataAnalysis>;
}): ReactElement => {
  const [ textListCount, setTextListCount ] = useState(1);
  const LAST_INDEX = 4;

  useEffect(() => {
    if (textListCount - 1 !== dataAnalysis.length) {
      setTimeout(() => {
        setTextListCount(textListCount + 1);
      }, 1000);
    }
  }, [ textListCount ]);

  const tickIconSize = (index): number => {
    switch (index - (textListCount - LAST_INDEX)) {
      case 0:
        return moderateScale(5);
      case 1:
        return moderateScale(7);
      default:
        return moderateScale(14);
    }
  };

  const tickIconContainerSize = (index): number => {
    switch (index - (textListCount - LAST_INDEX)) {
      case 0:
        return moderateScale(12);
      case 1:
        return moderateScale(16);
      default:
        return moderateScale(32);
    }
  };

  const tickIconBackGroundColor = (index): string => {
    switch (index - (textListCount - LAST_INDEX)) {
      case 0:
        return Colors.disabled;
      case 1:
        return Colors.mediumGray;
      default:
        return Colors.white;
    }
  };

  const loaderTextStyle = (index): {fontSize: number; opacity?: number} => {
    const indexValue = index - (textListCount - LAST_INDEX);
    if (indexValue === 0 || indexValue === LAST_INDEX)
      return {
        fontSize: Fonts.size.xSmall,
        opacity: 0.1
      };
    if (indexValue === 1 || indexValue === 3)
      return {
        fontSize: Fonts.size.small,
        opacity: 0.4
      };
    if (indexValue === 2) return { fontSize: Fonts.size.base };
  };

  return (
    <View style={styles.loaderModalContainer}>
      {dataAnalysis.map((tx, index) => {
        if (index <= textListCount && index >= textListCount - LAST_INDEX) {
          return (
            <View key={index} style={styles.loaderModalRow}>
              <View
                style={[
                  { width: moderateScale(64) },
                  commonStyles.justifyCenter,
                  commonStyles.alignCenter
                ]}
              >
                <View
                  style={[
                    styles.loaderModalIconContainer,
                    index >= textListCount - 1 && styles.loaderIconOpacity,
                    {
                      backgroundColor: tickIconBackGroundColor(index),
                      borderRadius: tickIconContainerSize(index) / 2,
                      width: tickIconContainerSize(index),
                      height: tickIconContainerSize(index)
                    }
                  ]}
                >
                  <BlackTickIcon
                    width={tickIconSize(index)}
                    height={tickIconSize(index)}
                  />
                </View>
              </View>
              <View
                style={[
                  commonStyles.flex1,
                  commonStyles.justifyCenter,
                  commonStyles.alignCenter
                ]}
              >
                <Text style={[ styles.loaderModalText, loaderTextStyle(index) ]}>
                  {tx.label}
                </Text>
              </View>
            </View>
          );
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  loaderModalContainer: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 20 : 10,
    backgroundColor: Colors.lightGray,
    marginHorizontal: Metrics.margin.tiny,
    borderRadius: Metrics.radius.large,
    width: widthPercentageToDP(100) - Metrics.margin.tiny * 2
  },
  loaderIconOpacity: {
    opacity: 0
  },
  loaderModalRow: {
    ...commonStyles.flexRow,
    ...commonStyles.alignCenter,
    ...commonStyles.justifyCenter,
    marginVertical: Metrics.margin.tiny / 2
  },
  loaderModalText: {
    ...commonStyles.textAlignCenter,
    textTransform: "uppercase",
    color: Colors.deepBlue,
    fontWeight: Fonts.weight.bold,
    marginVertical: Metrics.margin.tiny
  },
  loaderModalIconContainer: {
    ...commonStyles.alignCenter,
    ...commonStyles.justifyCenter
  }
});
export default Textloader;
