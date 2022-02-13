import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  LogBox
} from "react-native";

import playIcon from "../assets/Play.png";
import { Colors } from "../styles/colors";
import { commonStyles } from "../styles/commonStyles";
import { Metrics } from "../styles/metrics";
import { Fonts } from "../styles/fonts";
import { Navigation } from "../constant/navigation";
import { ApplicationConstant } from "../constant/message";
import { scale, moderateScale } from "../styles/scaleUnits";
import { ICONS, SVGIcon } from "./svg/SVGIcon";
import fonts from "../assets/fonts";

const HomeScreen = ({ navigation }) => {
  const [ modalVisible, setModalVisible ] = useState(false);

  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  const handleGoogleLogin = () => {
    setModalVisible(!modalVisible);
    navigation.navigate(Navigation.Login);
  };

  return (
    <SafeAreaView style={commonStyles.flex1}>
      <View style={commonStyles.flex1}>
        <View>
          <Text style={styles.textStyle}>{ApplicationConstant.MELD}</Text>
          <Text style={styles.control}>
            {ApplicationConstant.BE_IN_CONTROL}
          </Text>
        </View>
        <View style={[ commonStyles.justifyCenter, commonStyles.alignCenter ]}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Navigation.PageScroll);
            }}
          >
            <View style={styles.oval}>
              <Image source={playIcon} style={styles.imageStyle} />
            </View>
            <Text style={styles.bottomText}>
              {ApplicationConstant.HOW_DOES_MELD_WORK}
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert(ApplicationConstant.MODAL_HAS_BEEN_CLOSED);
            setModalVisible(!modalVisible);
          }}
        >
          <Pressable
            onPress={() => setModalVisible(false)}
            style={commonStyles.flex1}
          >
            <View style={styles.modalView}>
              <View style={styles.modalBottomContainer}>
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                  <View>
                    <Text style={styles.textStyleFirstDatabase}>
                      {ApplicationConstant.LOGIN_CONNECT_YOUR_FIRST_DATA_SOURCE}
                    </Text>
                    <Text style={styles.agreement}>
                      {ApplicationConstant.ACCEPT_EPSILON_TERMS_CONDITIONS}
                    </Text>
                    <View
                      style={[
                        commonStyles.justifyCenter,
                        commonStyles.alignCenter
                      ]}
                    >
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={handleGoogleLogin}
                      >
                        <View style={styles.signInWithGoogleContainer}>
                          <SVGIcon name={ICONS.IC_GOOGLE} width={moderateScale(32)} height={moderateScale(32)} />
                          <View style={styles.signInWithGoogleTextContainer}>
                            <Text style={styles.signInWithGoogleTextStyle}>{ApplicationConstant.SIGN_IN_WITH_GOOGLE}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Pressable>
              </View>
            </View>
          </Pressable>
        </Modal>
      </View>
      <View>
        <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.connectNow}>Connect Data Source</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: scale(50),
    height: scale(50)
  },
  modalView: {
    ...commonStyles.flex1,
    justifyContent: "flex-end"
  },
  button: {
    borderRadius: Metrics.radius.base,
    marginHorizontal: Metrics.margin.tiny,
    marginBottom: Metrics.margin.small,
    paddingVertical: Metrics.padding.tiny,
    elevation: 2,
    backgroundColor: Colors.deepBlue
  },
  oval: {
    marginTop: Metrics.margin.large,
    width: scale(170),
    height: scale(230),
    borderRadius: scale(170),
    backgroundColor: Colors.skyGreen,
    ...commonStyles.justifyCenter,
    ...commonStyles.alignCenter,
    alignSelf: "center"
  },
  textStyleFirstDatabase: {
    color: Colors.white,
    padding: Metrics.padding.small,
    fontSize: Fonts.size.base,
    fontWeight: Fonts.weight.bold,
    ...commonStyles.textAlignCenter
  },
  agreement: {
    color: Colors.white,
    fontSize: Fonts.size.small,
    paddingBottom: Metrics.padding.tiny,
    ...commonStyles.textAlignCenter
  },
  connectNow: {
    color: Colors.white,
    fontSize: Fonts.size.base,
    fontWeight: Fonts.weight.bold,
    ...commonStyles.textAlignCenter,
    paddingVertical: Metrics.padding.tiny
  },
  textStyle: {
    color: Colors.deepBlue,
    padding: Metrics.padding.tiny,
    marginTop: Metrics.margin.small,
    fontSize: Fonts.size.base * 2,
    fontWeight: Fonts.weight.normal,
    ...commonStyles.textAlignCenter
  },
  control: {
    fontSize: Fonts.size.small * 2,
    ...commonStyles.textAlignCenter,
    color: Colors.deepBlue,
    fontWeight: Fonts.weight.bold
  },

  bottomText: {
    marginTop: Metrics.xSmall,
    fontSize: Fonts.size.base,
    ...commonStyles.textAlignCenter,
    color: Colors.deepBlue,
    fontWeight: Fonts.weight.normal
  },
  modalBottomContainer: {
    margin: Metrics.margin.tiny,
    backgroundColor: Colors.deepBlue,
    borderRadius: Metrics.radius.medium
  },
  signInWithGoogleContainer: {
    ...commonStyles.flexRow,
    ...commonStyles.alignCenter,
    borderRadius: Metrics.radius.base,
    backgroundColor: Colors.white,
    width: "90%",
    marginBottom: Metrics.margin.base
  },
  signInWithGoogleTextContainer: { ...commonStyles.flex1,...commonStyles.justifyCenter,...commonStyles.alignCenter },
  signInWithGoogleTextStyle: {
    fontFamily: fonts.Poppins_Regular,
    fontSize: Fonts.size.base,
    fontWeight: Fonts.weight.bold,
    lineHeight: Fonts.size.base + 5,
    color: Colors.deepBlue,
    paddingVertical: Metrics.padding.tiny
  }
});

export default HomeScreen;
