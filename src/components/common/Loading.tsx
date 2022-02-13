import React from "react";
import { Text, Modal, View, StyleSheet } from "react-native";
import fonts from "../../assets/fonts";
import { ApplicationConstant } from "../../constant/message";
import { Colors } from "../../styles/colors";
import { commonStyles } from "../../styles/commonStyles";
import { Fonts } from "../../styles/fonts";
import { Metrics } from "../../styles/metrics";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "../../styles/widthHeightToDP";
import { ICONS, SVGIcon } from "../svg/SVGIcon";

export interface LoadingProps {
  loading: boolean,
  loadingText: string
}

function Loading({ loading, loadingText = ApplicationConstant.LOADING }: LoadingProps): JSX.Element {
  if (!loading) {
    return null;
  }
  return (
    <Modal
      transparent={true}
      animationType={"none"}
      visible={loading}
      style={styles.zIndex}
    >
      <View style={styles.modalBackground}>
        <View style={styles.bigCircle}>
          <View style={styles.bigCircle2}>
            <View style={styles.small}>
              <SVGIcon name={ICONS.IC_LOGO} />
              <Text style={styles.loadingText}>{loadingText}</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default Loading;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: Colors.lightTransparent,
    zIndex: 1000
  },
  bigCircle: {
    width: widthPercentageToDP(100) + 100,
    height: heightPercentageToDP(60),
    borderRadius:
      (widthPercentageToDP(100) + 100 + heightPercentageToDP(65)) / 2,
    backgroundColor: Colors.base,
    ...commonStyles.justifyCenter,
    ...commonStyles.alignCenter
  },
  bigCircle2: {
    width: widthPercentageToDP(90),
    height: heightPercentageToDP(40),
    borderRadius: (widthPercentageToDP(100) + heightPercentageToDP(50)) / 2,
    backgroundColor: Colors.baseLittleLight,
    ...commonStyles.justifyCenter,
    ...commonStyles.alignCenter,
    ...commonStyles.baseShadow
  },
  small: {
    width: widthPercentageToDP(53),
    height: heightPercentageToDP(25),
    borderRadius: (widthPercentageToDP(53) + heightPercentageToDP(25)) / 2,
    backgroundColor: Colors.baseLighter,
    ...commonStyles.justifyCenter,
    ...commonStyles.alignCenter,
    ...commonStyles.baseShadow
  },
  loadingText: {
    fontFamily: fonts.Poppins_Regular,
    fontSize: Fonts.size.caption,
    color: Colors.white,
    textAlign: "center",
    marginTop: Metrics.margin.base / 2
  },
  zIndex: { zIndex: 1100 }
});
