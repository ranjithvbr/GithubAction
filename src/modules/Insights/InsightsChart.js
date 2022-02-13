import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import StrictList from "./StrictList";
import InsightsModel from "./InsightsModel";
import { recommendedRiskMappings } from "./riskMappings";
import { Colors } from "../../styles/colors";
import { commonStyles } from "../../styles/commonStyles";
import { moderateScale } from "../../styles/scaleUnits";
import { Metrics } from "../../styles/metrics";
import { Fonts } from "../../styles/fonts";
import { LocalStorage } from "../../components/common/LocalStorage";

function InsightsChart({ changePage, radioName }) {
  const [ isModelOpen, setModelOpen ] = useState(false);
  const [ shieldStrength, setShieldStrength ] = useState();
  const [ shieldScore, setShieldScore ] = useState();
  const [ collectedData, setCollectedData ] = useState(null);

  const riskData = recommendedRiskMappings.find(
    li => li.level.toLowerCase() === radioName.toLowerCase()
  );

  const getCollectedData = async () => {
    const result = await LocalStorage.getScrappedData();
    setCollectedData(result);
  };

  const getLowerCase = (item) => item.toLowerCase();

  useEffect(() => {
    if (!collectedData) {
      getCollectedData();
    }
    else {
      let count = 0;
      let img;
      Object.keys(riskData.settings).forEach(key => {
        if (getLowerCase(collectedData[key]) === "off" ||
          getLowerCase(riskData.settings[key]) === getLowerCase(collectedData[key]))
          count++;
      });

      switch (count) {
        case 1:
          img = require("../../assets/insightsShields/strength1.png");
          setShieldScore(1);
          break;
        case 2:
          img = require("../../assets/insightsShields/strength2.png");
          setShieldScore(3);
          break;
        case 3:
          img = require("../../assets/insightsShields/strength3.png");
          setShieldScore(5);
          break;
        default:
          img = require("../../assets/insightsShields/strength0.png");
          setShieldScore(0);
          break;
      }
      setShieldStrength(img);
    }
  }, [ collectedData ]);

  return (
    <SafeAreaView style={commonStyles.flex1}>
      <View style={commonStyles.flex1}>
        {!isModelOpen ? (
          <View style={commonStyles.flex1}>
            <View style={[ commonStyles.flexRow, commonStyles.alignCenter ]}>
              <TouchableOpacity
                style={styles.backNavigationContainer}
                onPress={() => {
                  changePage();
                }}
              >
                <Image
                  style={styles.backNavigation}
                  source={require("../../assets/Back.png")}
                />
              </TouchableOpacity>
              <Text style={styles.pageHeader}>
                Insights on privacy settings
              </Text>
            </View>
            <View
              style={[
                styles.insightsChartContainer,
                isModelOpen && { backgroundColor: Colors.lightGray }
              ]}
            >
              <View>
                <Text
                  testID="sheild-strength"
                  style={styles.chartData}
                >{`Your shield strength: ${shieldScore}`}</Text>
                <View
                  style={[
                    styles.chartContainer,
                    isModelOpen && styles.chartContainerOpened
                  ]}
                >
                  <Image style={styles.chart} source={shieldStrength} />
                </View>
                <View style={styles.insightsBtn}>
                  <Text
                    testID="approach"
                    style={styles.insightsBtnText}
                    onPress={() => setModelOpen(true)}
                  >{`Approach: ${radioName}`}</Text>
                </View>
              </View>
              <View style={[ styles.sectionContainer, commonStyles.flex1 ]}>
                <Text style={styles.sectionHeader}>
                  Suggestions on privacy settings
                </Text>
                <View style={commonStyles.flex1}>
                  <StrictList />
                </View>
              </View>
            </View>
          </View>
        ) : null}

        {isModelOpen && (
          <InsightsModel
            collectedData={collectedData}
            selectedValue={radioName}
            modelClose={() => setModelOpen(false)}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

export default InsightsChart;

const styles = StyleSheet.create({
  insightsChartContainer: {
    ...commonStyles.flex1,
    ...commonStyles.alignCenter,
    ...commonStyles.justifyCenter
  },
  chartContainerOpened: {
    marginTop: moderateScale(35)
  },
  backNavigationContainer: {
    paddingHorizontal: Metrics.padding.medium / 2
  },
  backNavigation: {
    height: moderateScale(18),
    width: moderateScale(18)
  },
  pageHeader: {
    color: Colors.deepBlue,
    fontSize: Fonts.size.medium,
    fontWeight: Fonts.weight.bold,
    textAlign: "center"
  },
  chartData: {
    marginTop: Metrics.margin.tiny,
    color: Colors.deepBlue,
    textAlign: "center",
    fontSize: Fonts.size.header
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20
  },
  chart: {
    width: moderateScale(140),
    height: moderateScale(150)
  },
  insightsBtn: {
    borderRadius: Metrics.radius.base,
    marginHorizontal: Metrics.margin.xSmall * 2,
    borderWidth: 1,
    backgroundColor: Colors.white,
    marginTop: Metrics.margin.xSmall
  },
  insightsBtnText: {
    textAlign: "center",
    color: Colors.deepBlue,
    fontSize: Fonts.size.base,
    textTransform: "uppercase",
    fontWeight: "bold",
    paddingHorizontal: Metrics.padding.base / 2,
    paddingVertical: Metrics.padding.medium / 2
  },
  sectionContainer: {
    paddingHorizontal: Metrics.padding.xSmall,
    paddingTop: Metrics.padding.medium / 2
  },
  sectionHeader: {
    fontSize: Fonts.size.header,
    color: Colors.deepBlue,
    marginTop: Metrics.margin.medium / 2,
    marginBottom: Metrics.margin.medium / 2
  }
});
