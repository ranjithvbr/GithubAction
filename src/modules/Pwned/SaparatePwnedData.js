import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { commonStyles } from "../../styles/commonStyles";
import { Colors } from "../../styles/colors";
import { Metrics } from "../../styles/metrics";
import { moderateScale, scale } from "../../styles/scaleUnits";
import { Fonts } from "../../styles/fonts";

function SaparatePwnedData({ selectedItem, setInitialState }) {
  return (
    <SafeAreaView style={commonStyles.flex1}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            setInitialState();
          }}
          style={styles.zIndex}
        >
          <Image
            style={styles.backNavigation}
            source={require("../../assets/Back.png")}
          />
        </TouchableOpacity>
        <View style={commonStyles.flex1}>
          <Text style={styles.pageHeader}>{selectedItem.title}</Text>
        </View>
      </View>
      <View style={styles.pageContainer}>
        <View style={styles.dataContainer}>
          <View style={styles.dataSection}>
            <View style={styles.dataImgContainer}>
              <Image
                style={styles.dataImg}
                source={require("../../assets/tickIcon.png")}
              />
            </View>
            <Text style={styles.dataHeader}>Breached Date</Text>
          </View>
          <Text style={styles.data}>{selectedItem.breachedDate}</Text>

          <View style={styles.dataSection}>
            <View style={styles.dataImgContainer}>
              <Image
                style={styles.dataImg}
                source={require("../../assets/tickIcon.png")}
              />
            </View>
            <Text style={styles.dataHeader}>Description</Text>
          </View>
          <Text style={styles.data}>{selectedItem.description}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default SaparatePwnedData;

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: Colors.white,
    ...commonStyles.flex1
  },
  zIndex: { zIndex: 999 },
  pageHeader: {
    fontSize: Fonts.size.medium,
    fontWeight: Fonts.weight.bold,
    textAlign: "center",
    color: Colors.deepBlue,
    marginLeft: -moderateScale(36)
  },
  headerContainer: {
    ...commonStyles.flexRow,
    ...commonStyles.alignCenter,
    zIndex: 999,
    paddingHorizontal: Metrics.padding.medium
  },
  backNavigation: {
    height: moderateScale(18),
    width: moderateScale(18)
  },
  dataContainer: {
    paddingHorizontal: Metrics.padding.xSmall
  },
  dataSection: {
    ...commonStyles.flexRow,
    marginTop: Metrics.margin.medium
  },
  dataHeader: {
    fontSize: Fonts.size.base,
    color: Colors.blackBlue,
    fontWeight: Fonts.weight.bold,
    paddingBottom: Metrics.padding.tiny,
    paddingLeft: Metrics.padding.tiny
  },
  dataImgContainer: {
    ...commonStyles.flexRow,
    ...commonStyles.justifyCenter,
    ...commonStyles.alignCenter,
    backgroundColor: Colors.deepBlue,
    borderRadius: scale(20),
    width: scale(25),
    height: scale(25)
  },
  dataImg: {
    width: moderateScale(15),
    height: moderateScale(15)
  },
  data: {
    fontSize: Fonts.size.base,
    color: Colors.blackBlue,
    paddingLeft: Metrics.padding.medium * 2
  }
});
