import React from "react";
import {
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  View
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Navigation } from "../../constant/navigation";
import { ApplicationConstant } from "../../constant/message";
import { Colors } from "../../styles/colors";
import { commonStyles } from "../../styles/commonStyles";
import { moderateScale } from "../../styles/scaleUnits";
import { Metrics } from "../../styles/metrics";
import { Fonts } from "../../styles/fonts";

const Settings = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={commonStyles.flex1}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate(Navigation.Notifications)}
          style={styles.notificationBtnContainer}
        >
          <Text style={styles.titleText}>
            {ApplicationConstant.NOTIFIACTIONS}
          </Text>
          <Image
            source={require("../../assets/RightIndicator.png")}
            style={styles.iconStyle}
          />
        </TouchableOpacity>
        <Text style={styles.connectTextStyle}>
          {ApplicationConstant.CONNECTED_SERVICES}
        </Text>
        <TouchableOpacity style={styles.notificationBtnContainer}>
          <Image
            style={styles.gImageStyle}
            source={require("../../assets/connectIcons/Google.png")}
            resizeMode={"contain"}
          />
          <Text style={styles.titleText}>{"Google"}</Text>
          <Text style={styles.rightTextStyle}>
            {ApplicationConstant.REMOVE_FROM_MELD}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(Navigation.Connect)}
          style={styles.connectMoreServices}
        >
          <Image
            source={require("../../assets/PlusCircle.png")}
            style={styles.plusImgStyle}
            resizeMode={"contain"}
          />
          <Text style={styles.connectMoreServiceTextStyle}>
            {ApplicationConstant.CONNECT_MORE_SERVICE}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    ...commonStyles.flex1,
    backgroundColor: Colors.white
  },
  notificationBtnContainer: {
    height: moderateScale(70),
    marginTop: Metrics.margin.medium / 2,
    backgroundColor: Colors.headerBG,
    ...commonStyles.flexRow,
    ...commonStyles.alignCenter,
    marginHorizontal: Metrics.margin.medium / 2,
    borderRadius: Metrics.radius.base
  },
  titleText: {
    ...commonStyles.flex1,
    fontSize: Fonts.size.base,
    marginLeft: Metrics.margin.medium,
    color: Colors.deepBlue
  },
  iconStyle: {
    marginRight: Metrics.margin.medium,
    tintColor: Colors.grey
  },
  connectTextStyle: {
    fontSize: Fonts.size.base,
    marginLeft: Metrics.margin.medium,
    marginTop: Metrics.margin.medium,
    color: Colors.deepBlue
  },
  gImageStyle: {
    height: moderateScale(32),
    width: moderateScale(32),
    backgroundColor: Colors.white,
    borderRadius: Metrics.radius.base,
    marginLeft: Metrics.margin.medium / 2
  },
  rightTextStyle: {
    ...commonStyles.flex1,
    fontSize: Fonts.size.small,
    marginRight: Metrics.margin.xSmall,
    textAlign: "right",
    color: Colors.deepBlue
  },
  connectMoreServices: {
    marginTop: Metrics.margin.xLarge,
    ...commonStyles.alignCenter,
    ...commonStyles.justifyCenter,
    ...commonStyles.flexRow
  },
  plusImgStyle: {
    width: moderateScale(30),
    height: moderateScale(30),
    tintColor: Colors.black
  },
  connectMoreServiceTextStyle: {
    fontSize: Fonts.size.base,
    marginLeft: Metrics.margin.medium,
    fontWeight: Fonts.weight.bold,
    color: Colors.deepBlue
  }
});
