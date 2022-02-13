import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../../../styles/colors";
import { commonStyles } from "../../../styles/commonStyles";
import { Fonts } from "../../../styles/fonts";
import { Metrics } from "../../../styles/metrics";
import { heightPercentageToDP } from "../../../styles/widthHeightToDP";
import CustomStatusBar from "../../common/CustomStatusBar";
import fonts from "../../../assets/fonts";
import { ICONS, SVGIcon } from "../../svg/SVGIcon";
import { moderateScale } from "../../../styles/scaleUnits";
import { StackNavigationProp } from "@react-navigation/stack";
import { Navigation, NavigatorParamList } from "../../../constant/navigation";
import Button from "../../Button";
import { ApplicationConstant } from "../../../constant/message";

export interface NewWelcomeProps {
  navigation: StackNavigationProp<NavigatorParamList, Navigation.OryKartosIntro>
}

function NewWelcome({ navigation }: NewWelcomeProps): JSX.Element {

  return (
    <View style={styles.container}>
      <CustomStatusBar backgroundColor={Colors.darkBase} />
      <View style={styles.container2}>
        <View style={styles.firstContainer}>
          <SVGIcon
            name={ICONS.IC_LOGO}
            width={moderateScale(58)}
            height={moderateScale(40)}
            style={styles.logoStyle}
          />
          <Text style={styles.desc}>{ApplicationConstant.WELCOME_TO_MELD}</Text>
          <Text style={styles.desc1}>{ApplicationConstant.YOUR_DATA_IS_YOURS_TO_CONTROL}</Text>
        </View>
      </View>
      <View style={commonStyles.flex1Center}>
        <Button
          title="continue"
          onPress={() => navigation.navigate(Navigation.HomeOryKartos)}
          style={styles.buttonStyles}
          contentStyle={styles.buttonContentStyles}
          labelStyle={styles.buttonLabelStyles}
        />
      </View>
    </View>
  );
}

export default NewWelcome;

const styles = StyleSheet.create({
  container: {
    ...commonStyles.flex1,
    backgroundColor: Colors.white
  },
  container2: {
    ...commonStyles.containerRounded,
    backgroundColor: Colors.darkBase
  },
  firstContainer: {
    ...commonStyles.containerRoundedChild,
    paddingHorizontal: Metrics.padding.base
  },
  desc: {
    fontSize: Fonts.size.large,
    lineHeight: Fonts.size.large + 10,
    fontWeight: Fonts.weight.w5,
    color: Colors.white,
    fontFamily: fonts.Poppins_Regular
  },
  get desc1() {
    return {
      ...this.desc,
      paddingTop: Metrics.padding.base
    };
  },
  logoStyle: {
    marginVertical: Metrics.margin.base * 2
  },
  buttonStyles: {
    backgroundColor: Colors.black,
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
    fontSize: Fonts.size.caption,
    color: Colors.white
  }
});
