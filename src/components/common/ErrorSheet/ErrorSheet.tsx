import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";
import fonts from "../../../assets/fonts";
import { Colors } from "../../../styles/colors";
import { commonStyles } from "../../../styles/commonStyles";
import { Fonts } from "../../../styles/fonts";
import { Metrics } from "../../../styles/metrics";
import { moderateScale } from "../../../styles/scaleUnits";
import { ICONS, SVGIcon } from "../../svg/SVGIcon";
import { ErrorSheetType } from "./ErrorSheet.types";

function ErrorSheet({
  showErrorSheet,
  errorTitle,
  errorText,
  hideErrorSheet,
  hasPrimaryBtn = true,
  hasSecondaryBtn = false,
  primaryBtnTitle = "retry",
  secondaryBtnTitle,
  onPrimaryBtnPressed,
  onSecondaryBtnPressed,
  sheetBgColor = Colors.red,
  primaryBtnTextColor = Colors.red
}: ErrorSheetType): JSX.Element {
  return (
    <Modal
      transparent={true}
      animationType={"none"}
      visible={showErrorSheet}
      style={styles.zIndex}
      onRequestClose={hideErrorSheet}>
      <TouchableWithoutFeedback
        style={commonStyles.flex1}
        onPress={hideErrorSheet}>
        <View style={styles.modalBackground}>
          <View style={[ styles.sheetContainerRounded, { backgroundColor: sheetBgColor } ]}>
            <View style={styles.sheetContainer}>
              <View style={[ commonStyles.flex1, commonStyles.justifyCenter ]}>
                <SVGIcon name={ICONS.IC_AVATAR_WHITE} />
                <Text style={styles.errorTitleText}>{errorTitle}</Text>
                <Text style={styles.errorText}>{errorText}</Text>
              </View>
              {hasPrimaryBtn ? (
                <TouchableOpacity
                  onPress={
                    onPrimaryBtnPressed ? onPrimaryBtnPressed : hideErrorSheet
                  }>
                  <View style={styles.buttonContainer}>
                    <Text style={[ styles.buttonTextStyle, { color: primaryBtnTextColor } ]}>
                      {primaryBtnTitle}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : undefined}
              {hasSecondaryBtn ? (
                <Text
                  style={styles.secondaryBtnStyle}
                  onPress={
                    onSecondaryBtnPressed
                      ? onSecondaryBtnPressed
                      : hideErrorSheet
                  }>
                  {secondaryBtnTitle}
                </Text>
              ) : undefined}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default ErrorSheet;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "column",
    justifyContent: "flex-end",
    backgroundColor: Colors.lightTransparent,
    zIndex: 1000
  },
  sheetContainerRounded: {
    height: "37%",
    width: "100%",
    transform: [ { scaleX: 2 } ],
    borderTopStartRadius: 200,
    borderTopEndRadius: 200,
    overflow: "hidden",
    backgroundColor: Colors.red
  },
  sheetContainer: {
    ...commonStyles.containerRoundedChild,
    padding: Metrics.padding.base
  },
  errorText: {
    fontFamily: fonts.Poppins_Regular,
    fontSize: Fonts.size.caption,
    color: Colors.white
  },
  errorTitleText: {
    fontFamily: fonts.Poppins_Regular,
    fontSize: Fonts.size.header,
    fontWeight: Fonts.weight.bold,
    color: Colors.white,
    marginVertical: Metrics.margin.base / 2
  },
  buttonContainer: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(40)
  },
  buttonTextStyle: {
    paddingVertical: Metrics.padding.small,
    paddingHorizontal: Metrics.padding.base * 2,
    color: Colors.red,
    textTransform: "uppercase",
    fontSize: Fonts.size.caption,
    lineHeight: Fonts.size.caption + 5,
    fontWeight: Fonts.weight.w5,
    letterSpacing: 1,
    fontFamily: fonts.Poppins_Regular,
    textAlign: "center"
  },
  get secondaryBtnStyle() {
    return {
      ...this.buttonTextStyle,
      textDecorationLine: "underline",
      textDecorationStyle: "solid",
      textDecorationColor: Colors.white,
      color: Colors.white,
      textTransform: "none"
    };
  },
  zIndex: { zIndex: 1100 }
});
