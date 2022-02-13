import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";
import { commonStyles } from "../../styles/commonStyles";
import { Fonts } from "../../styles/fonts";
import { Metrics } from "../../styles/metrics";
import { moderateScale } from "../../styles/scaleUnits";

function RadioBtn({ checked, key, label, name, onChange }) {
  return (
    <View key={key}>
      {checked ? (
        <TouchableOpacity
          onPress={() => onChange(!checked, name)}
          style={styles.btn}
        >
          <View>
            <Image
              style={styles.img}
              source={require("../../assets/radioOff.png")}
            />
            <Image
              style={styles.imgOn}
              source={require("../../assets/radioOn.png")}
            />
          </View>
          <Text style={styles.radioLabel}>{label}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.btn}
          onPress={() => onChange(!checked, name)}
        >
          <Image
            style={styles.img}
            source={require("../../assets/radioOff.png")}
          />
          <Text style={styles.radioLabel}>{label}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default RadioBtn;

const styles = StyleSheet.create({
  img: {
    height: moderateScale(20),
    width: moderateScale(20)
  },
  imgOn: {
    position: "absolute",
    height: moderateScale(14.7),
    width: moderateScale(14.7),
    top: moderateScale(2.5),
    left: moderateScale(2.5)
  },
  btn: {
    ...commonStyles.flexRow,
    padding: Metrics.padding.tiny / 2
  },
  radioLabel: {
    color: Colors.deepBlue,
    fontWeight: Fonts.weight.bold,
    fontSize: Fonts.size.caption,
    marginLeft: Metrics.margin.xSmall
  }
});
