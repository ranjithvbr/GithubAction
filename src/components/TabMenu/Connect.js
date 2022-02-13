import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TextInput,
  StyleSheet
} from "react-native";
import { Colors } from "../../styles/colors";
import { ApplicationConstant } from "../../constant/message";
import { commonStyles } from "../../styles/commonStyles";
import { Fonts } from "../../styles/fonts";
import { Metrics } from "../../styles/metrics";
import { moderateScale } from "../../styles/scaleUnits";

const Connect = () => {
  const socialMediaArray = [
    {
      name: "Instagram",
      icon: require("../../assets/connectIcons/Instagram.png"),
      color: Colors.headerBG
    },
    {
      name: "Facebook",
      icon: require("../../assets/connectIcons/Facebook.png"),
      color: Colors.headerBG
    },
    {
      name: "Twitter",
      icon: require("../../assets/connectIcons/Twitter.png"),
      color: Colors.headerBG
    }
  ];
  const ecommerceArray = [
    {
      name: "Target",
      icon: require("../../assets/connectIcons/Target.png"),
      color: Colors.headerBG
    },
    {
      name: "Amazon",
      icon: require("../../assets/connectIcons/Amazon.png"),
      color: Colors.headerBG
    },
    {
      name: "Walmart",
      icon: require("../../assets/connectIcons/Walmart.png"),
      color: Colors.blue
    }
  ];
  const renderConnectItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={[ styles.itemImgContainer, { backgroundColor: item.color } ]}>
          <Image
            style={styles.itemImg}
            source={item.icon}
            resizeMode={"contain"}
          />
        </View>
        <Text style={styles.itemTextStyle}>{item.name}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Text style={styles.screenHeader}>
            {ApplicationConstant.CONNECT_MORE_SERVICE}
          </Text>
          <Text style={styles.screenHeaderDesc}>
            {ApplicationConstant.CONNECT_TO_LEARN_AND_MONITOR}
          </Text>
          <View style={commonStyles.flex1} />
          <View style={styles.searchContainer2}>
            <TextInput
              style={styles.searchTextInput}
              placeholder={"Search"}
              placeholderTextColor={"black"}
            />
            <Image
              style={styles.searchImg}
              source={require("../../assets/connectIcons/Search.png")}
              resizeMode={"contain"}
            />
          </View>
        </View>

        <View style={styles.secondContainer}>
          <Text style={styles.secondHeader}>{"Social Media"}</Text>
          <FlatList
            style={styles.flatListContainer}
            data={socialMediaArray}
            renderItem={renderConnectItem}
            horizontal={true}
          />
          <Text style={styles.secondHeader}>
            {ApplicationConstant.E_COM_CONSUMER_SERVICE}
          </Text>
          <FlatList
            style={styles.flatListContainer}
            data={ecommerceArray}
            renderItem={renderConnectItem}
            horizontal={true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Connect;

const styles = StyleSheet.create({
  safeAreaContainer: {
    ...commonStyles.flex1,
    backgroundColor: Colors.headerBG
  },
  container: {
    ...commonStyles.flex1,
    backgroundColor: Colors.white
  },
  searchContainer: {
    flex: 0.6,
    backgroundColor: Colors.headerBG,
    borderBottomLeftRadius: Metrics.radius.large,
    borderBottomRightRadius: Metrics.radius.large
  },
  searchContainer2: {
    height: moderateScale(50),
    backgroundColor: Colors.white,
    margin: Metrics.margin.medium,
    borderRadius: moderateScale(50),
    ...commonStyles.flexRow,
    ...commonStyles.alignCenter
  },
  screenHeader: {
    fontWeight: Fonts.weight.bold,
    fontSize: Fonts.size.medium,
    textAlign: "center",
    marginTop: Metrics.margin.medium,
    color: Colors.deepBlue
  },
  screenHeaderDesc: {
    fontSize: Fonts.size.base,
    textAlign: "center",
    marginTop: Metrics.margin.medium,
    paddingHorizontal: Metrics.padding.base,
    color: Colors.deepBlue
  },
  searchTextInput: {
    ...commonStyles.flex1,
    marginHorizontal: Metrics.margin.medium
  },
  searchImg: {
    height: moderateScale(20),
    width: moderateScale(20),
    marginRight: Metrics.margin.medium
  },
  itemContainer: { height: moderateScale(120) },
  itemImgContainer: {
    height: moderateScale(100),
    width: moderateScale(100),
    borderRadius: Metrics.radius.large,
    marginHorizontal: Metrics.margin.base / 2,
    ...commonStyles.alignCenter,
    ...commonStyles.justifyCenter
  },
  itemImg: { height: moderateScale(64), width: moderateScale(64) },
  itemTextStyle: {
    textAlign: "center",
    fontSize: Fonts.size.small,
    marginTop: Metrics.margin.medium / 2,
    color: Colors.deepBlue
  },
  secondContainer: { ...commonStyles.flex1, backgroundColor: Colors.white },
  secondHeader: {
    fontSize: Fonts.size.header,
    marginLeft: Metrics.margin.xSmall,
    marginTop: Metrics.margin.medium,
    color: Colors.deepBlue
  },
  flatListContainer: { marginTop: Metrics.margin.medium / 2 }
});
