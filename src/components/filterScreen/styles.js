import { StyleSheet } from "react-native";
import fonts from "src/assets/fonts";
import { Metrics } from "../../styles/metrics";
import { Fonts } from "../../styles/fonts";
import { moderateScale } from "../../styles/scaleUnits";
import { Colors } from "../../styles/colors";
export default StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: Colors.headerBG
  },
  mainView: {
    marginTop: Metrics.margin.base,
    paddingHorizontal: Metrics.padding.xSmall
  },
  headingText: {
    fontSize: Fonts.size.medium,
    lineHeight: Fonts.size.medium + 10,
    color: Colors.black,
    fontFamily: fonts.JostBold,
    height: moderateScale(36)
  },
  titleView: {
    marginTop: Metrics.margin.base
  },
  titleText: {
    fontSize: Fonts.size.header,
    lineHeight: Fonts.size.header + 5,
    color: Colors.black,
    fontFamily: fonts.JostRegular,
    marginBottom: Metrics.margin.tiny
  },
  flatListView: {
    marginLeft: Metrics.margin.tiny
  },
  flatMainView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Metrics.margin.medium
  },
  borderView: {
    height: moderateScale(16),
    width: moderateScale(16),
    color: Colors.darkTextColor,
    fontFamily: fonts.JostBlack,
    borderWidth: 1,
    borderRadius: Metrics.radius.base / 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Metrics.margin.base / 2
  },
  borderColorView: {
    height: moderateScale(8),
    width: moderateScale(8),
    backgroundColor: Colors.black,
    borderColor: Colors.black,
    borderWidth: 1,
    borderRadius: Metrics.radius.base / 4,
    alignItems: "center",
    justifyContent: "center"
  },
  borderUnselectView: {
    height: moderateScale(8),
    width: moderateScale(8),
    backgroundColor: Colors.white,
    borderColor: Colors.white,
    borderWidth: 1,
    borderRadius: Metrics.radius.base / 4,
    alignItems: "center",
    justifyContent: "center"
  },
  dataTitle: {
    fontSize: Fonts.size.caption,
    lineHeight: Fonts.size.caption + 5,
    color: Colors.black,
    fontFamily: fonts.JostRegular
  },
  dataSubTitle: {
    fontSize: Fonts.size.small,
    lineHeight: Fonts.size.small + 5,
    color: Colors.black,
    fontFamily: fonts.JostRegular,
    marginTop: Metrics.margin.tiny
  },
  closeView: {
    height: moderateScale(48),
    width: moderateScale(48),
    borderRadius: 50,
    backgroundColor: Colors.white,
    position: "absolute",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    right: moderateScale(10),
    top: -moderateScale(10)
  },
  closeIcon: {
    height: moderateScale(45),
    width: moderateScale(45)
  }
});
