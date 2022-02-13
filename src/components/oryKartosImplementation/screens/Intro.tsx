import React, { useContext, useEffect, useState } from "react";
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
import IntroDesc from "./IntroDesc";
import { StackNavigationProp } from "@react-navigation/stack";
import { Navigation, NavigatorParamList } from "../../../constant/navigation";
import Button from "../../Button";
import { AuthContext } from "../provider/AuthProvider";

export interface IntroProps {
  navigation: StackNavigationProp<NavigatorParamList, Navigation.OryKartosIntro>
}

function Intro({ navigation }: IntroProps): JSX.Element {
  const [ showDesc, setShowDesc ] = useState(false);

  const { isAuthenticated } = useContext(AuthContext);
  
  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate(Navigation.HomeOryKartos);
    }
  }, []);

  if (isAuthenticated) {
    return null;
  }

  if (showDesc) {
    return (
      <IntroDesc
        onBackPressed={() => setShowDesc(!showDesc)}
        navigation={navigation}
      />
    );
  }
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
          <Text style={styles.desc}>{"Be in\ncontrol of\nyour data"}</Text>
        </View>
      </View>
      <View style={commonStyles.flex1Center}>
        <Button
          title="Get started"
          onPress={() => setShowDesc(!showDesc)}
          style={styles.buttonStyles}
          contentStyle={styles.buttonContentStyles}
          labelStyle={styles.buttonLabelStyles}
        />
        <View style={styles.bottomContainer}>
          <Text style={styles.accountText}>Already have an account?</Text>
          <Text
            style={[ styles.accountText, styles.underlinedText ]}
            onPress={() => navigation.navigate(Navigation.LoginOryKartos)}
          >
            Login now
          </Text>
        </View>
      </View>
    </View>
  );
}

export default Intro;

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
  logoStyle: {
    marginVertical: Metrics.margin.base * 2
  },
  bottomContainer: {
    marginTop: Metrics.margin.medium
  },
  accountText: {
    fontSize: Fonts.size.base,
    color: Colors.grey,
    lineHeight: Fonts.size.base + 5,
    textAlign: "center",
    fontFamily: fonts.Poppins_Regular
  },
  underlinedText: {
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: Colors.grey
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
