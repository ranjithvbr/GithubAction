import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { Colors } from "./colors";
import { widthPercentageToDP } from "./widthHeightToDP";

type Styles = {
  flex1: ViewStyle;
  flexRow: ViewStyle;
  justifyCenter: ViewStyle;
  alignCenter: ViewStyle;
  textAlignCenter: TextStyle;
  containerRounded: ViewStyle;
  containerRoundedChild: ViewStyle;
  flex1Center: ViewStyle;
  baseShadow: ViewStyle;
};

export const commonStyles = StyleSheet.create<Styles>({
  flex1: {
    flex: 1
  },
  flexRow: {
    flexDirection: "row"
  },
  justifyCenter: {
    justifyContent: "center"
  },
  alignCenter: {
    alignItems: "center"
  },
  textAlignCenter: {
    textAlign: "center"
  },
  flex1Center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  containerRounded: {
    height: "70%",
    width: "100%",
    transform: [ { scaleX: 2 } ],
    borderBottomStartRadius: widthPercentageToDP(50),
    borderBottomEndRadius: widthPercentageToDP(50),
    overflow: "hidden",
    backgroundColor: Colors.base
  },
  containerRoundedChild: {
    flex: 1,
    transform: [ { scaleX: 0.5 } ]
  },
  baseShadow: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  }
});
