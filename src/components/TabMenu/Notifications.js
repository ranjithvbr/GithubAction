import React, { Fragment, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  Switch,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { ApplicationConstant } from "../../constant/message";
import { Colors } from "../../styles/colors";
import { commonStyles } from "../../styles/commonStyles";
import { moderateScale } from "../../styles/scaleUnits";
import { Metrics } from "../../styles/metrics";
import { Fonts } from "../../styles/fonts";

const Notifications = ({ navigation }) => {
  const [ isEnabled, setIsEnabled ] = useState({});
  const switchesArray = [
    ApplicationConstant.REPORT_USE_OF_MY_DATA,
    ApplicationConstant.NOTIFY_WHEN_ALERTS,
    ApplicationConstant.WEEKLY_SUMMARY,
    ApplicationConstant.MONTHLY_SUMMARY
  ];
  const toggleSwitch = index =>
    setIsEnabled(previousState => {
      let newState = { ...previousState };
      newState[index] = !previousState[index];
      return newState;
    });

  return (
    <SafeAreaView style={commonStyles.flex1}>
      <View style={styles.container}>
        <View style={styles.backContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styles.backImg}
              source={require("../../assets/Back.png")}
              resizeMode={"contain"}
            />
          </TouchableOpacity>

          <Text style={styles.headerTextStyle}>
            {ApplicationConstant.Notifications}
          </Text>
        </View>
        <Text style={styles.titleTextStyle}>
          {ApplicationConstant.MONITORED_ACTIVITY}
        </Text>
        <View style={styles.secondContainer}>
          {switchesArray.map((value, index) => {
            return (
              <Fragment>
                <View style={styles.switchContainer}>
                  <Text style={styles.switchTitle}>{value}</Text>
                  <Switch
                    trackColor={{ false: Colors.switchInActive, true: Colors.skyGreen }}
                    thumbColor={Colors.white}
                    style={styles.switchStyles}
                    onValueChange={() => toggleSwitch(index)}
                    value={isEnabled[index]}
                  />
                </View>
                <View style={styles.separator} />
              </Fragment>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    ...commonStyles.flex1,
    backgroundColor: Colors.white
  },
  backContainer: {
    height: moderateScale(50),
    ...commonStyles.alignCenter,
    ...commonStyles.flexRow
  },
  backImg: {
    height: moderateScale(25),
    width: moderateScale(25),
    paddingHorizontal: Metrics.padding.base
  },
  headerTextStyle: {
    ...commonStyles.flex1,
    fontSize: Fonts.size.medium,
    fontWeight: Fonts.weight.bold,
    textAlign: "center",
    marginTop: Metrics.margin.medium / 2,
    marginRight: Metrics.margin.medium,
    color: Colors.deepBlue
  },
  titleTextStyle: {
    fontSize: Fonts.size.header,
    marginLeft: Metrics.margin.medium,
    color: Colors.deepBlue
  },
  secondContainer: {
    backgroundColor: Colors.headerBG,
    marginTop: Metrics.margin.medium / 2,
    marginHorizontal: Metrics.margin.medium / 2,
    borderRadius: Metrics.radius.medium
  },
  switchContainer: {
    height: moderateScale(60),
    ...commonStyles.flexRow,
    ...commonStyles.alignCenter
  },
  switchTitle: {
    fontSize: Fonts.size.base,
    marginLeft: Metrics.margin.medium,
    ...commonStyles.flex1,
    color: Colors.deepBlue
  },
  separator: {
    backgroundColor: Colors.white,
    height: moderateScale(2)
  },
  switchStyles: { marginRight: Metrics.margin.medium / 2 }
});
