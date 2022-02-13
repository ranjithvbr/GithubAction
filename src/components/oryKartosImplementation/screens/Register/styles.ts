import { StyleSheet } from "react-native";
import fonts from "../../../../assets/fonts";
import { Colors } from "../../../../styles/colors";
import { commonStyles } from "../../../../styles/commonStyles";
import { Fonts } from "../../../../styles/fonts";
import { Metrics } from "../../../../styles/metrics";
import { moderateScale } from "../../../../styles/scaleUnits";
import { heightPercentageToDP } from "../../../../styles/widthHeightToDP";

export const styles = StyleSheet.create({
  container: {
    ...commonStyles.flex1,
    backgroundColor: Colors.white
  },
  containerRounded: {
    ...commonStyles.containerRounded
  },
  child: {
    ...commonStyles.containerRoundedChild,
    paddingHorizontal: Metrics.padding.base
  },
  navBar: {
    ...commonStyles.flexRow,
    justifyContent: "space-between",
    ...commonStyles.alignCenter,
    width: "100%"
  },
  inputPadding: {
    paddingHorizontal: 0,
    fontSize: Fonts.size.caption
  },
  errorTextStyle: {
    color: Colors.lightGrey,
    fontSize: Fonts.size.small,
    paddingHorizontal: 0
  },
  inputTextIconStyle: {
    position: "absolute",
    left: 0
  },
  buttonStyles: {
    borderRadius: moderateScale(40),
    paddingHorizontal: Metrics.padding.large,
    lineHeight: Fonts.size.caption + 5,
    fontWeight: Fonts.weight.w5,
    letterSpacing: 1,
    fontFamily: fonts.Poppins_Regular
  },
  buttonContentStyles: {
    height: heightPercentageToDP(7.2)
  },
  buttonLabelStyles: {
    color: Colors.white,
    fontSize: Fonts.size.caption
  },
  screenTitle: {
    fontFamily: fonts.Poppins_Regular,
    fontSize: Fonts.size.header,
    color: Colors.white,
    lineHeight: Fonts.size.header + 5,
    fontWeight: Fonts.weight.w5,
    marginTop: Metrics.margin.base
  },
  passwordConstraintsItemContainer: {
    ...commonStyles.flexRow,
    ...commonStyles.alignCenter
  },
  passwordConstraintsText: {
    fontFamily: fonts.Poppins_Regular,
    fontSize: Fonts.size.caption,
    lineHeight: Fonts.size.caption + 5,
    color: Colors.white
  },
  passwordConstraintsTextSatisfied: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid"
  },
  showPasswordTextContainer: {
    ...commonStyles.flexRow,
    ...commonStyles.alignCenter,
    marginTop: Metrics.margin.medium
  },
  rectContainer: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(2),
    borderWidth: 1,
    borderColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Metrics.margin.medium / 2
  },
  circularDot: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(5),
    backgroundColor: Colors.white
  },
  showPwdText: {
    fontFamily: fonts.Poppins_Regular,
    fontSize: Fonts.size.base,
    lineHeight: Fonts.size.base + 5,
    color: Colors.white
  },
  showEmailVerificationContainer: {
    ...commonStyles.flex1,
    paddingTop: Metrics.padding.base / 2
  },
  emailVerificationTextStyle: {
    fontFamily: fonts.Poppins_Regular,
    fontSize: Fonts.size.base,
    lineHeight: Fonts.size.base + 8
  },
  get emailVerificationText() {
    return {
      ...this.emailVerificationTextStyle,
      color: Colors.littleGrey
    };
  },
  get emailVerificationText1() {
    return {
      ...this.emailVerificationTextStyle,
      color: Colors.white,
      fontWeight: Fonts.weight.bold
    };
  },
  underlinedText: {
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: Colors.white
  },
  verifyTextContainer: {
    paddingTop: Metrics.padding.base
  },
  didNotReceiveLinkContainer: {
    paddingTop: Metrics.padding.base
  },
  didNotReceiveLinkText: {
    fontFamily: fonts.Poppins_Regular,
    fontSize: Fonts.size.base,
    lineHeight: Fonts.size.base + 8,
    color: Colors.greyDim,
    textAlign: "center"
  }
});
