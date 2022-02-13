import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import CustomSwitch from "../../components/Switch";
import { recommendedRiskMappings } from "./riskMappings";
import { Colors } from "../../styles/colors";
import { ApplicationConstant } from "../../constant/message";

function InsightsModel({ selectedValue, modelClose, collectedData }) {
  const [ recommendedRisk, setRecommendedRisk ] = useState({
    webAndAppActivity: "off",
    locationHistory: "off",
    youtubeHistory: "off"
  });

  useEffect(() => {
    let riskData = recommendedRiskMappings.find(
      li => li.level.toLowerCase() === selectedValue.toLowerCase() && li
    );
    setRecommendedRisk(riskData.settings);
  }, []);

  return (
    <View style={styles.insightsContainer}>
      <View style={styles.modelCloseContainer}>
        <TouchableOpacity style={styles.modelClose} onPress={modelClose}>
          <Image source={require("../../assets/Close.png")} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.pageContainer}>
        <Text style={styles.pageHeader}>
          Check your settings on Google Activity
        </Text>
        <Text style={styles.pageDescription}>
          {ApplicationConstant.GOOGLE_ACTIVITY}
        </Text>
        <Text style={styles.cardTitle}>Your current settings:</Text>
        <View style={styles.cardBox}>
          <View style={styles.radioRow}>
            <Text style={styles.radioLabel}>Web & app activity</Text>
            <View style={styles.radioRow}>
              <Text style={styles.radioText}>
                {collectedData.webAndAppActivity}
              </Text>
              <CustomSwitch
                isEnabled={
                  collectedData.webAndAppActivity.toLowerCase() === "on"
                }
              />
            </View>
          </View>
          <View style={styles.radioRow}>
            <Text style={styles.radioLabel}>Location History</Text>
            <View style={[ styles.radioRow, styles.verticalPdding ]}>
              <Text style={styles.radioText}>
                {collectedData.locationHistory}
              </Text>
              <CustomSwitch
                isEnabled={collectedData.locationHistory.toLowerCase() === "on"}
              />
            </View>
          </View>
          <View style={styles.radioRow}>
            <Text style={styles.radioLabel}>YouTube History</Text>
            <View style={styles.radioRow}>
              <Text style={styles.radioText}>
                {collectedData.youtubeHistory}
              </Text>
              <CustomSwitch
                isEnabled={collectedData.youtubeHistory.toLowerCase() === "on"}
              />
            </View>
          </View>
        </View>
        <View style={styles.exclamationContainer}>
          <Image
            style={styles.greenExclamation}
            source={require("../../assets/greenExclamation.png")}
          />
          <Text style={styles.cardTitle}>
            Consider using these settings instead
          </Text>
        </View>
        <View style={[ styles.cardBox, styles.riskCardMargin ]}>
          <View style={styles.radioRow}>
            <Text style={styles.radioLabel}>Web & app activity</Text>
            <View style={styles.radioRow}>
              <Text style={styles.radioText}>
                {recommendedRisk.webAndAppActivity}
              </Text>
              <CustomSwitch
                isEnabled={
                  recommendedRisk.webAndAppActivity.toLowerCase() === "on"
                }
              />
            </View>
          </View>
          <View style={styles.radioRow}>
            <Text style={styles.radioLabel}>Location History</Text>
            <View style={[ styles.radioRow, styles.verticalPdding ]}>
              <Text style={styles.radioText}>
                {recommendedRisk.locationHistory}
              </Text>
              <CustomSwitch
                isEnabled={
                  recommendedRisk.locationHistory.toLowerCase() === "on"
                }
              />
            </View>
          </View>
          <View style={styles.radioRow}>
            <Text style={styles.radioLabel}>YouTube History</Text>
            <View style={styles.radioRow}>
              <Text style={styles.radioText}>
                {recommendedRisk.youtubeHistory}
              </Text>
              <CustomSwitch
                isEnabled={
                  recommendedRisk.youtubeHistory.toLowerCase() === "on"
                }
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default InsightsModel;

const styles = StyleSheet.create({
  insightsContainer: {
    height: 700,
    marginTop: 54
  },
  modelCloseContainer: {
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: Colors.transparent
  },
  modelClose: {
    width: 48,
    height: 48,
    backgroundColor: Colors.white,
    marginVertical: 5,
    borderRadius: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  pageContainer: {
    paddingHorizontal: 16,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: Colors.white
  },
  pageHeader: {
    fontSize: 20,
    color: Colors.deepBlue,
    fontWeight: "bold",
    paddingTop: 25,
    paddingBottom: 10
  },
  pageDescription: {
    color: Colors.deepBlue,
    fontSize: 14
  },
  cardTitle: {
    color: Colors.deepBlue,
    fontSize: 16,
    paddingTop: 14,
    paddingBottom: 18,
    fontWeight: "bold"
  },
  cardBox: {
    paddingHorizontal: 16,
    paddingVertical: 25,
    backgroundColor: Colors.identityColor,
    borderRadius: 8
  },
  riskCardMargin: {
    marginBottom: 20
  },
  radioRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  radioLabel: {
    color: Colors.deepBlue,
    fontSize: 14,
    fontWeight: "bold"
  },
  radioText: {
    color: Colors.finalTitle,
    fontSize: 10,
    textTransform: "uppercase"
  },
  exclamationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },
  greenExclamation: {
    width: 32,
    height: 32,
    marginRight: 8
  },
  verticalPdding: {
    paddingVertical: 19
  }
});
