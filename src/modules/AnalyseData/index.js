import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity
} from "react-native";
import { VictoryPie } from "victory-native";
import ChartList from "./ChartList.js";
import SpecificChart from "./SpecificChart.js";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../styles/colors";
import { commonStyles } from "../../styles/commonStyles";
import { moderateScale } from "../../styles/scaleUnits";
import { Metrics } from "../../styles/metrics";
import { Fonts } from "../../styles/fonts";
const data = [
  { x: 4, y: 15, radius: 100 },
  { x: 1, y: 15, radius: 80 },
  { x: 1, y: 15, radius: 80 },
  { x: 0, y: 15, radius: 50 }
];

const chart_colorCode = [ "#3F74E0", "#BFDEFF", "#E4F2FF", "#3842AD" ];

export default function GoogleChart({ route }) {
  const { collectedData } = route.params;
  const navigation = useNavigation();
  const [ selectedItem, setSelectedItem ] = useState(null);
  if (selectedItem || selectedItem === 0) {
    return (
      <SpecificChart
        collectedData={collectedData}
        chart_data={data}
        selectedItem={selectedItem}
        chart_colorCode={chart_colorCode}
        setSelectedItem={() => setSelectedItem(null)}
      />
    );
  }
  return (
    <SafeAreaView style={styles.pageContainer}>
      <View style={styles.chartContainer}>
        <View style={styles.backContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <View style={styles.backNavigationContainer}>
              <Image
                style={styles.backNavigation}
                source={require("../../assets/Back.png")}
              />
            </View>
          </TouchableOpacity>
          <View
            style={[
              commonStyles.flex1,
              commonStyles.alignCenter,
              commonStyles.justifyCenter
            ]}
          >
            <Text style={styles.pageHeader}>Google</Text>
          </View>
        </View>
        <View style={styles.googleChartContainer}>
          <VictoryPie
            data={data}
            labelRadius={({ index }) => moderateScale(data[index].radius - 5)}
            labelPosition={"centered"}
            radius={({ datum }) => moderateScale(datum.radius)}
            style={{ labels: { fill: "black", fontSize: Fonts.size.base } }}
            colorScale={chart_colorCode}
          />
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeader}>What Google knows about me</Text>
        <ChartList
          setSelectedItem={id => setSelectedItem(id)}
          chart_colorCode={chart_colorCode}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: Colors.white,
    ...commonStyles.flex1
  },
  backContainer: {
    ...commonStyles.flexRow,
    ...commonStyles.alignCenter,
    zIndex: 999
  },
  backNavigationContainer: {
    paddingHorizontal: Metrics.padding.xSmall,
    paddingVertical: Metrics.padding.xSmall
  },
  backNavigation: {
    height: moderateScale(18),
    width: moderateScale(18)
  },
  chartContainer: {
    ...commonStyles.flex1
  },
  googleChartContainer: {
    ...commonStyles.flex1,
    ...commonStyles.justifyCenter,
    ...commonStyles.alignCenter
  },
  pageHeader: {
    fontSize: Fonts.size.medium,
    fontWeight: Fonts.weight.bold,
    color: Colors.deepBlue,
    marginLeft: -moderateScale(36)
  },
  sectionContainer: {
    paddingLeft: Metrics.padding.xSmall,
    paddingRight: Metrics.padding.xSmall
  },
  sectionHeader: {
    fontSize: Fonts.size.medium,
    color: Colors.deepBlue
  }
});
