import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Text } from "react-native";
import fonts from "../../../../assets/fonts";
import { ApplicationConstant } from "../../../../constant/message";
import { Colors } from "../../../../styles/colors";
import { commonStyles } from "../../../../styles/commonStyles";
import { Fonts } from "../../../../styles/fonts";
import { Metrics } from "../../../../styles/metrics";
import { moderateScale } from "../../../../styles/scaleUnits";
import CustomStatusBar from "../../../common/CustomStatusBar";
import { ICONS, SVGIcon } from "../../../svg/SVGIcon";
import IconSimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Button from "../../../Button";
import { heightPercentageToDP } from "../../../../styles/widthHeightToDP";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Navigation, NavigatorParamList } from "../../../../constant/navigation";
import { StackNavigationProp } from "@react-navigation/stack";

export interface NewWelcomeProps {
  navigation: StackNavigationProp<NavigatorParamList, Navigation.TermsAndCondition>
}

function TermsAndCondition({ navigation }: NewWelcomeProps): JSX.Element {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <CustomStatusBar backgroundColor={Colors.darkBase} />
      <TouchableWithoutFeedback onPress={navigation.goBack}>
        <SVGIcon
          name={ICONS.IC_BACK_CIRCLE}
          width={moderateScale(40)}
          height={moderateScale(40)}
        />
      </TouchableWithoutFeedback>
      <View style={styles.secondaryContainer}>
        <Text style={styles.titleText}>
          {ApplicationConstant.TERMS_OF_SERVICE}
        </Text>
        <Text style={styles.contentText}>
          {ApplicationConstant.MELD_IS_FULLY_TRANSPARENT_ABOUT_DATA}
        </Text>
        <Text style={styles.contentText}>
          {ApplicationConstant.ALL_YOUR_INFO_STORED_ENCRYPTED}
        </Text>
        <Text style={styles.contentText}>
          {ApplicationConstant.YOUR_DATA_NOT_SOLD_TO_3RD_PARTY}
        </Text>
        <Text style={styles.contentText}>
          {ApplicationConstant.WE_WILL_KEEP_YOU_INFORMED}
        </Text>
        <Text style={styles.contentText}>
          {ApplicationConstant.SIGNING_UP_WITH_MELD}
        </Text>
        <View style={styles.checkContainer}>
          <View style={[ commonStyles.flexRow, commonStyles.alignCenter ]}>
            <IconSimpleLineIcons
              name="check"
              size={moderateScale(20)}
              color={Colors.white}
              style={styles.checkIcon}
            />
            <Text style={styles.contentText}>
              {ApplicationConstant.YOUR_MELD_EMAIL_ADDRESS}
            </Text>
          </View>
          <View style={[ commonStyles.flexRow, commonStyles.alignCenter ]}>
            <IconSimpleLineIcons
              name="check"
              size={moderateScale(20)}
              color={Colors.white}
              style={styles.checkIcon}
            />
            <Text style={styles.contentText}>
              {ApplicationConstant.YOUR_MELD_PASSWORD}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ marginBottom: insets ? insets.bottom : Metrics.margin.medium/2 }}>
        <Button
          title="agree & continue"
          onPress={() => navigation.navigate(Navigation.NewWelcome)}
          style={styles.buttonStyles}
          contentStyle={styles.buttonContentStyles}
          labelStyle={styles.buttonLabelStyles}
        />
        <View>
          <Text style={styles.bottomText}>
            {ApplicationConstant.BY_CONTINUING_I_AGREE_TO_MELD}
          </Text>
          <Text style={styles.bottomText}>
            <Text style={styles.underlinedText}>{ApplicationConstant.TERMS_OF_SERVICE}</Text>
            {ApplicationConstant.AND_WITH_SPACE}
            <Text style={styles.underlinedText}>{ApplicationConstant.PRIVACY_POLICY}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

export default TermsAndCondition;

export const styles = StyleSheet.create({
  container: {
    ...commonStyles.flex1,
    backgroundColor: Colors.darkBase,
    paddingHorizontal: Metrics.padding.base
  },
  secondaryContainer: {
    ...commonStyles.flex1,
    paddingTop: Metrics.padding.base
  },
  titleText: {
    fontFamily: fonts.Poppins_Regular,
    fontSize: Fonts.size.header,
    color: Colors.white,
    lineHeight: Fonts.size.header + 5,
    fontWeight: Fonts.weight.w5
  },
  contentText: {
    fontFamily: fonts.Poppins_Regular,
    fontSize: Fonts.size.caption,
    color: Colors.white,
    lineHeight: Fonts.size.caption + 5,
    paddingVertical: Metrics.padding.base / 2
  },
  checkContainer: {
    paddingHorizontal: Metrics.padding.base
  },
  checkIcon: {
    marginRight: Metrics.padding.base / 2
  },
  buttonStyles: {
    borderRadius: moderateScale(40),
    paddingHorizontal: Metrics.padding.large,
    lineHeight: Fonts.size.caption + 5,
    fontWeight: Fonts.weight.w5,
    letterSpacing: 1,
    fontFamily: fonts.Poppins_Regular,
    backgroundColor: Colors.white,
    marginBottom: Metrics.margin.medium
  },
  buttonContentStyles: {
    height: heightPercentageToDP(7.2)
  },
  buttonLabelStyles: {
    color: Colors.black,
    fontSize: Fonts.size.caption
  },
  bottomText: {
    fontFamily: fonts.Poppins_Regular,
    fontSize: Fonts.size.caption,
    color: Colors.white,
    lineHeight: Fonts.size.caption + 5,
    textAlign: "center"
  },
  underlinedText: {
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: Colors.white
  }
});
