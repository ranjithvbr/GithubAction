import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback
} from "react-native";
import { Colors } from "../../../styles/colors";
import { commonStyles } from "../../../styles/commonStyles";
import { Fonts } from "../../../styles/fonts";
import { Metrics } from "../../../styles/metrics";
import { heightPercentageToDP } from "../../../styles/widthHeightToDP";
import CustomStatusBar from "../../common/CustomStatusBar";
import fonts from "../../../assets/fonts";
import { ICONS, SVGIcon } from "../../svg/SVGIcon";
import { moderateScale } from "../../../styles/scaleUnits";
import { Navigation, NavigatorParamList } from "../../../constant/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { ApplicationConstant } from "../../../constant/message";
import Button from "../../Button";

export interface IntroDescProps {
  navigation: StackNavigationProp<NavigatorParamList, Navigation.OryKartosIntro>,
  onBackPressed: () => void
}

function IntroDesc({ onBackPressed, navigation }: IntroDescProps): JSX.Element {
  return (
    <View style={styles.container}>
      <CustomStatusBar backgroundColor={Colors.darkBase} />
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onBackPressed}>
          <SVGIcon
            name={ICONS.IC_BACK_CIRCLE}
            width={moderateScale(40)}
            height={moderateScale(40)}
          />
        </TouchableWithoutFeedback>
        <Text style={styles.desc}>{ApplicationConstant.YOU_ARE_IN_GOOD_HANDS}</Text>
        <Text style={styles.desc2}>
          {ApplicationConstant.MELD_COLLECTS_MINIMUM_INFO}
        </Text>
        <Text style={styles.desc2}>
          {ApplicationConstant.MELD_BELIEVES_PRIVACY_FUNDAMENTAL_HUMAN_RIGHT}
        </Text>
        <Text style={styles.desc2}>
          {
            ApplicationConstant.MELD_DESIGNED_TO_PROVIDE_TRANSPARENCY
          }
        </Text>
      </View>
      <View style={commonStyles.flex1Center}>
        <Button
          title={ApplicationConstant.CONTINUE}
          onPress={() => navigation.navigate(Navigation.RegisterOryKartos)}
          style={styles.buttonStyles}
          contentStyle={styles.buttonContentStyles}
          labelStyle={styles.buttonLabelStyles}
        />
        <View style={styles.bottomContainer}>
          <Text style={styles.accountText}>{ApplicationConstant.HOW_MELD_WORKS}</Text>
          <Text
            style={[ styles.accountText, styles.underlinedText ]}
            onPress={() => navigation.navigate(Navigation.PageScroll)}
          >
            Take a tour
          </Text>
        </View>
      </View>
    </View>
  );
}

export default IntroDesc;

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: Colors.darkBase,
    paddingHorizontal: Metrics.padding.base
  },
  desc: {
    fontSize: Fonts.size.header,
    lineHeight: Fonts.size.header + 10,
    fontWeight: Fonts.weight.w5,
    color: Colors.white,
    fontFamily: fonts.Poppins_Regular,
    marginTop: Metrics.margin.base
  },
  desc2: {
    fontSize: Fonts.size.base,
    lineHeight: Fonts.size.base + 10,
    color: Colors.white,
    fontFamily: fonts.Poppins_Regular,
    marginTop: Metrics.margin.base
  },
  bottomContainer: {
    marginTop: Metrics.margin.medium
  },
  accountText: {
    fontSize: Fonts.size.base,
    color: Colors.white,
    lineHeight: Fonts.size.base + 5,
    textAlign: "center",
    fontFamily: fonts.Poppins_Regular
  },
  underlinedText: {
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: Colors.white
  },
  buttonStyles: {
    backgroundColor: Colors.white,
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
    color: Colors.black,
    fontSize: Fonts.size.caption
  }
});
