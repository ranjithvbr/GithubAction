import { StyleSheet } from "react-native";
import fonts from "src/assets/fonts";
import { Colors } from "../../styles/colors";
import { commonStyles } from "../../styles/commonStyles";
import { Fonts } from "../../styles/fonts";
import { Metrics } from "../../styles/metrics";
import { moderateScale } from "../../styles/scaleUnits";

export default StyleSheet.create({
  centeredView: {
    ...commonStyles.flex1,
    backgroundColor: Colors.white
  },

  modalView: {
    ...commonStyles.flex1,
    width: "100%",
    justifyContent: "flex-start",
    backgroundColor: Colors.transparentBG
  },

  modalViewText: {
    ...commonStyles.flex1,
    marginTop: Metrics.margin.medium / 2,
    backgroundColor: Colors.white,
    borderTopRightRadius: moderateScale(40),
    borderTopLeftRadius: moderateScale(40),
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },

  title: {
    color: Colors.deepblack,
    padding: Metrics.padding.medium,
    marginTop: Metrics.margin.medium * 2,
    fontSize: Fonts.size.medium,
    lineHeight: Fonts.size.medium,
    textAlign: "center",
    textAlignVertical: "bottom",
    fontFamily: fonts.JostBold
  },

  agreement: {
    color: Colors.deepblack,
    fontSize: Fonts.size.base,
    textAlign: "left",
    padding: Metrics.padding.medium,
    fontFamily: fonts.JostRegular
  },

  closeIcon: {
    width: moderateScale(50),
    height: moderateScale(50)
  },

  modalCloseButton: {
    alignItems: "center",
    alignContent: "center"
  },

  submitView: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    bottom: moderateScale(40)
  },

  submit: {
    borderRadius: Metrics.radius.base,
    borderWidth: 1,
    borderColor: Colors.deepblack,
    height: moderateScale(48),
    width: moderateScale(200),
    alignItems: "center",
    justifyContent: "center"
  },

  submitText: {
    color: Colors.deepblack,
    fontSize: Fonts.size.base,
    textAlign: "center",
    fontFamily: fonts.JostBold
  },

  headerView: {
    height: moderateScale(188),
    backgroundColor: Colors.headerBG,
    borderBottomRightRadius: Metrics.radius.large,
    borderBottomLeftRadius: Metrics.radius.large
  },

  headerSubView: {
    paddingHorizontal: Metrics.padding.base
  },

  welcomeTitle: {
    fontSize: Fonts.size.medium,
    color: Colors.black,
    lineHeight: Fonts.size.medium + 2,
    fontFamily: fonts.JostBold
  },

  headerSubTitle: {
    marginTop: Metrics.margin.medium,
    fontSize: Fonts.size.base,
    color: Colors.black,
    lineHeight: Fonts.size.base + 2,
    fontFamily: fonts.JostRegular
  },

  socialIconView: {
    flexDirection: "row",
    marginTop: Metrics.margin.xSmall,
    alignItems: "center"
  },

  headerGIcon: {
    width: moderateScale(56),
    height: moderateScale(56)
  },

  headerPDIcon: {
    width: moderateScale(56),
    height: moderateScale(56),
    marginLeft: Metrics.margin.tiny
  },

  todayView: {
    paddingHorizontal: Metrics.padding.xSmall,
    marginTop: Metrics.margin.medium * 2
  },

  flexView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  todayTitle: {
    fontSize: Fonts.size.header,
    lineHeight: Fonts.size.header + 2,
    color: Colors.deepblack,
    fontFamily: fonts.JostRegular
  },

  filterIcon: {
    width: moderateScale(24),
    height: moderateScale(12)
  },

  mapView: { marginTop: Metrics.margin.medium * 2 },

  mapMainView: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center"
  },

  upIcon: {
    width: moderateScale(16),
    height: moderateScale(16),
    marginRight: Metrics.margin.tiny + Metrics.margin.tiny / 2,
    marginLeft: Metrics.margin.tiny
  },

  addTitle: {
    fontSize: Fonts.size.caption,
    lineHeight: Fonts.size.caption + 5,
    color: Colors.deepblack,
    fontFamily: fonts.JostRegular
  },

  addDate: {
    fontSize: Fonts.size.xSmall,
    lineHeight: Fonts.size.xSmall + 5,
    color: Colors.deepblack,
    position: "absolute",
    right: 0,
    fontFamily: fonts.JostRegular
  },

  lineView: {
    width: moderateScale(4),
    height: moderateScale(40),
    borderColor: Colors.headerBG,
    backgroundColor: Colors.headerBG,
    marginLeft: Metrics.margin.tiny
  },

  flatListView: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1
  },

  flatListFirstView: {
    flexDirection: "row",
    width: "80%"
  },

  stepView: {
    width: moderateScale(24),
    borderRadius: Metrics.radius.large
  },

  stepIconFirst: {
    width: moderateScale(24),
    height: moderateScale(24)
  },

  stepSubView: {
    width: moderateScale(24),
    alignItems: "center",
    justifyContent: "flex-start"
  },

  DotView: {
    width: moderateScale(8),
    height: moderateScale(8),
    backgroundColor: Colors.dorBG,
    borderRadius: Metrics.radius.large,
    marginTop: Metrics.margin.tiny / 2
  },

  stepIconSecond: {
    width: moderateScale(24),
    height: moderateScale(24),
    marginTop: -Metrics.margin.medium / 2
  },

  lineViewSecond: {
    width: moderateScale(4),
    flex: 1,
    borderColor: Colors.headerBG,
    backgroundColor: Colors.headerBG,
    marginLeft: Metrics.margin.medium / 2
  },

  contentView: {
    marginLeft: Metrics.margin.medium / 2
  },

  contentName: {
    fontSize: Fonts.size.base,
    lineHeight: Fonts.size.base + 3,
    height: moderateScale(21),
    color: Colors.black,
    fontFamily: fonts.JostBold
  },

  contentRequest: {
    fontSize: Fonts.size.caption,
    lineHeight: Fonts.size.caption + 5,
    marginTop: Metrics.margin.tiny / 2,
    height: moderateScale(21),
    color: Colors.black,
    fontFamily: fonts.JostRegular
  },

  identityView: {
    height: moderateScale(24),
    backgroundColor: Colors.identityColor,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Metrics.radius.medium,
    marginTop: Metrics.margin.tiny / 2
  },

  infoIcon: {
    width: moderateScale(16),
    height: moderateScale(16),
    marginLeft: Metrics.margin.tiny / 2
  },

  identityTitle: {
    fontSize: Fonts.size.caption,
    lineHeight: Fonts.size.caption + 5,
    color: Colors.deepblack,
    fontFamily: fonts.JostRegular,
    marginLeft: Metrics.margin.medium / 2,
    marginRight: Metrics.margin.xSmall
  },

  contentExp: {
    fontSize: Fonts.size.caption,
    lineHeight: Fonts.size.caption + 5,
    color: Colors.deepblack,
    fontFamily: fonts.JostRegular,
    marginTop: Metrics.margin.tiny
  },

  finalView: {
    alignItems: "center",
    justifyContent: "center"
  },

  finalTitle: {
    fontSize: Fonts.size.xSmall,
    lineHeight: Fonts.size.xSmall + 5,
    color: Colors.finalTitle,
    fontFamily: fonts.JostBold,
    height: moderateScale(15)
  },

  moreIcon: {
    width: moderateScale(25),
    height: moderateScale(25),
    marginTop: Metrics.margin.tiny
  },

  seeMoreView: {
    width: moderateScale(176),
    height: moderateScale(48),
    borderWidth: 1,
    borderColor: Colors.headerBG,
    borderRadius: moderateScale(50),
    marginTop: moderateScale(42),
    marginBottom: Metrics.margin.medium,
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },

  plusIcon: {
    width: moderateScale(16),
    height: moderateScale(16)
  },

  seeSubView: {
    marginLeft: Metrics.margin.medium / 2
  },

  seeMoreText: {
    fontSize: Fonts.size.small,
    lineHeight: Fonts.size.small + 5,
    color: Colors.finalTitle,
    fontFamily: fonts.JostRegular
  },

  modalFlexView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Metrics.margin.xSmall,
    marginLeft: Metrics.margin.base
  },

  modalIcon: {
    width: moderateScale(14),
    height: moderateScale(14)
  },

  modalText: {
    fontSize: Fonts.size.small,
    lineHeight: Fonts.size.small + 5,
    color: Colors.black,
    fontFamily: fonts.JostRegular,
    marginLeft: Metrics.margin.small
  },

  content: {
    padding: Metrics.padding.xSmall,
    backgroundColor: Colors.pink,
    borderRadius: Metrics.radius.base
  },

  header: {
    alignItems: "center",
    justifyContent: "center"
  },
  backNavigation: {
    height: moderateScale(20),
    width: moderateScale(20),
    margin: Metrics.margin.medium / 2
  },
  image: {
    width: moderateScale(18),
    height: moderateScale(18)
  }
});
