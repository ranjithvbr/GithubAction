import React from "react";
import { Platform, StyleSheet, TextInput, View, Text } from "react-native";
import { Colors } from "../../../styles/colors";
import { Metrics } from "../../../styles/metrics";
import fonts from "../../../assets/fonts";
import { SVGIcon } from "../../svg/SVGIcon";
import { commonStyles } from "../../../styles/commonStyles";
import { moderateScale } from "../../../styles/scaleUnits";
import { widthPercentageToDP } from "../../../styles/widthHeightToDP";
import { Fonts } from "../../../styles/fonts";
import { InputTypes } from "./Input.types";

function Input({
  value,
  onChangeText,
  placeholder,
  placeholderTextColor = Colors.white,
  inputStyles,
  rightIcon,
  secureTextEntry = false,
  errorText
}: InputTypes): JSX.Element {
  const inputStyle = inputStyles ? inputStyles : styles.textInputStyle;
  const textInputWidth = rightIcon
    ? widthPercentageToDP(100) - moderateScale(50) * 2
    : widthPercentageToDP(100);
    
  return (
    <View>
      <View style={styles.container}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={[ inputStyle, { width: textInputWidth } ]}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={secureTextEntry}
          autoCapitalize={"none"}
        />
        {rightIcon ? (
          <View style={styles.rightIconContainer}>
            <SVGIcon name={rightIcon} />
          </View>
        ) : undefined}
      </View>
      {errorText ? (
        <Text style={styles.errorTextStyle}>{errorText}</Text>
      ) : null}
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: Colors.white,
    paddingVertical: Platform.OS === "ios" ? Metrics.padding.tiny : 0,
    marginVertical: Metrics.margin.tiny,
    ...commonStyles.alignCenter
  },
  textInputStyle: {
    color: Colors.white,
    width: widthPercentageToDP(100) - moderateScale(50) * 2,
    fontFamily: fonts.Poppins_Regular
  },
  rightIconContainer: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0
  },
  errorTextStyle: {
    fontFamily: fonts.Poppins_Regular,
    fontSize: Fonts.size.caption,
    color: Colors.red
  }
});
