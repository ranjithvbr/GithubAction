import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import RadioBtn from "../../components/RadioBtn";
import InsightsChart from "./InsightsChart";
import { Colors } from "../../styles/colors";
import { Fonts } from "../../styles/fonts";
import { moderateScale } from "../../styles/scaleUnits";
import { Metrics } from "../../styles/metrics";
import { commonStyles } from "../../styles/commonStyles";

function Insights() {
  const [ radio, setRadio ] = useState({
    strict: true,
    comfortable: false,
    relaxed: false
  });
  const [ strictOpen, setStrictOpen ] = useState(false);
  const [ radioName, setRadioName ] = useState("strict");
  

  const handleOnChange = useCallback((value, name) => {
    switch (name) {
      case "strict":
        setRadio({
          strict: true,
          comfortable: false,
          relaxed: false
        });
        break;
      case "comfortable":
        setRadio({
          strict: false,
          comfortable: true,
          relaxed: false
        });
        break;
      case "relaxed":
        setRadio({
          strict: false,
          comfortable: false,
          relaxed: true
        });
        break;
      default:
        break;
    }
    setRadioName(name);
  }, []);

  if (strictOpen) {
    return (
      <InsightsChart
        radioName={radioName}
        changePage={() => {
          setStrictOpen(false);
        }}
      />
    );
  }

  return (
    <SafeAreaView style={commonStyles.flex1}>
      <View style={commonStyles.flex1}>
        <Text style={styles.pageHeader}>What is your approach to privacy?</Text>
        <View style={styles.cardContainer}>
          <View style={[ styles.card, radio.strict && styles.cardActiive ]}>
            <RadioBtn
              checked={radio.strict}
              label={"Strict"}
              name={"strict"}
              onChange={handleOnChange}
            />
            <Text style={styles.cardDetail}>
              I want advice on how to to be as private as I can be
            </Text>
          </View>
          <View style={[ styles.card, radio.comfortable && styles.cardActiive ]}>
            <RadioBtn
              checked={radio.comfortable}
              label={"Comfortable"}
              name={"comfortable"}
              onChange={handleOnChange}
            />
            <Text style={styles.cardDetail}>
              I want sites to know me and serve me as well as possible while
              keeping me safe and private
            </Text>
          </View>
          <View style={[ styles.card, radio.relaxed && styles.cardActiive ]}>
            <RadioBtn
              checked={radio.relaxed}
              label={"Relaxed"}
              name={"relaxed"}
              onChange={handleOnChange}
            />
            <Text style={styles.cardDetail}>
              I want to use as little time but have essential privacy
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setStrictOpen(true)}>
          <View style={styles.insightsBtn}>
            <Text style={styles.insightsBtnText}>{`Show insights  ${
              radioName ? "for" : ""
            } ${radioName}`}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Insights;

const styles = StyleSheet.create({
  pageHeader: {
    paddingHorizontal: Metrics.padding.base,
    textAlign: "center",
    color: Colors.deepBlue,
    fontSize: Fonts.size.medium
  },
  cardContainer: {
    marginTop: Metrics.margin.large
  },
  card: {
    paddingVertical: Metrics.padding.base,
    paddingLeft: Metrics.padding.base / 2,
    paddingRight: Metrics.padding.base * 2,
    marginVertical: Metrics.margin.tiny / 2,
    marginHorizontal: Metrics.margin.tiny
  },
  cardActiive: {
    backgroundColor: Colors.white,
    borderRadius: Metrics.radius.base
  },
  cardDetail: {
    color: Colors.deepBlue,
    fontSize: Fonts.size.small,
    paddingLeft: moderateScale(42)
  },
  insightsBtn: {
    borderRadius: Metrics.radius.base,
    marginHorizontal: moderateScale(32),
    borderWidth: 1,
    backgroundColor: Colors.white,
    marginTop: Metrics.margin.medium
  },
  insightsBtnText: {
    textAlign: "center",
    color: Colors.deepBlue,
    fontSize: Fonts.size.base,
    textTransform: "uppercase",
    fontWeight: Fonts.weight.bold,
    padding: Metrics.padding.base / 2
  }
});
