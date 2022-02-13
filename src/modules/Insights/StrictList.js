import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  ImageBackground
} from "react-native";
import { Colors } from "../../styles/colors";
import { commonStyles } from "../../styles/commonStyles";
import { Fonts } from "../../styles/fonts";
import { Metrics } from "../../styles/metrics";
import { moderateScale } from "../../styles/scaleUnits";
const suggestionsData = [
  {
    header: "Choose your approach to content suggestions",
    name: "Web & App Activity",
    description:
      "Saves your activity on Google sites and apps, including associated info like location, " +
      "to give you faster searches, better recommendations, and more personalized experiences in Maps, Search, and other Google services.",
    time: "2 mins",
    count: 4,
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba"
  },
  {
    header: "Control what you are seeing",
    name: "Location History",
    description:
      "Saves where you go with your devices, even when you aren't using a specific Google service, " +
      " to give you personalized maps, recommendations based on places you've visited, and more.",
    time: "5 mins",
    count: 1,
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63"
  },
  {
    header: "Control who gets data about you",
    name: "Personalized Adds on Google",
    description: "You can make ads more useful to you.",
    time: "3 mins",
    count: 1,
    id: "58694a0f-3da1-471f-bd96-145571e29d72"
  }
];

const StrictList = () => {
  const renderItem = data => (
    <View>
      <Text style={styles.cardTitle}>{data.item.header}</Text>
      <View style={styles.cardContainer}>
        <View style={styles.textSection}>
          <ImageBackground
            source={require("../../assets/smShield.png")}
            style={styles.shieldContainer}
          >
            <Text style={styles.shieldText}>{data.item.count}</Text>
          </ImageBackground>
          <View>
            <Text style={styles.sectionHeader}>{data.item.name}</Text>
            <Text style={styles.sectionDescription}>
              {data.item.description}
            </Text>
          </View>
        </View>
        <View style={styles.footerSection}>
          <View style={styles.footerBlueBoxSection}>
            <View style={styles.blueBox}>
              <Text style={styles.timeText}>3 min</Text>
            </View>
            <View style={styles.blueBox}>
              <Text style={styles.instructions}>Show instructions</Text>
              <View style={styles.whiteArrowContainer}>
                <Image
                  style={styles.whiteArrow}
                  source={require("../../assets/whiteRightArrow.png")}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[ commonStyles.flex1 ]}>
      <FlatList
        data={suggestionsData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardTitle: {
    color: Colors.deepBlue,
    marginBottom: Metrics.margin.medium / 2
  },
  cardContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: Metrics.padding.xSmall,
    paddingVertical: Metrics.padding.base,
    borderRadius: Metrics.radius.base * 2,
    marginBottom: Metrics.margin.base
  },
  textSection: {
    ...commonStyles.flexRow
  },
  shieldContainer: {
    width: moderateScale(20),
    height: moderateScale(20),
    ...commonStyles.justifyCenter,
    ...commonStyles.alignCenter
  },
  shieldText: {
    fontSize: Fonts.size.xSmall,
    color: Colors.deepBlue,
    fontWeight: Fonts.weight.bold
  },
  sectionHeader: {
    color: Colors.deepBlue,
    fontWeight: Fonts.weight.bold,
    marginLeft: Fonts.size.base,
    width: "90%",
    fontSize: Fonts.size.base
  },
  sectionDescription: {
    color: Colors.deepBlue,
    marginLeft: Fonts.size.base,
    maxWidth: "90%",
    marginTop: Metrics.margin.tiny / 2,
    fontSize: Fonts.size.caption
  },
  blueBox: {
    backgroundColor: Colors.lightBlue,
    borderRadius: Metrics.radius.large,
    marginRight: Metrics.margin.base / 2,
    ...commonStyles.flexRow,
    justifyContent: "space-between",
    ...commonStyles.alignCenter,
    paddingHorizontal: Metrics.padding.tiny,
    paddingVertical: Metrics.padding.tiny / 2
  },
  timeText: {
    color: Colors.deepBlue,
    fontWeight: Fonts.weight.bold,
    fontSize: Fonts.size.caption
  },
  instructions: {
    color: Colors.deepBlue,
    fontSize: Fonts.size.caption
  },
  whiteArrowContainer: {
    backgroundColor: Colors.deepBlue,
    width: moderateScale(18),
    height: moderateScale(18),
    borderRadius: Metrics.radius.large * 2,
    ...commonStyles.flexRow,
    ...commonStyles.justifyCenter,
    ...commonStyles.alignCenter,
    marginLeft: 10
  },
  whiteArrow: {
    width: moderateScale(10),
    height: moderateScale(8),
    backgroundColor: Colors.deepBlue,
    borderRadius: Metrics.radius.large * 2
  },
  footerSection: {
    ...commonStyles.flexRow,
    ...commonStyles.justifyCenter,
    ...commonStyles.alignCenter,
    marginTop: Metrics.margin.base
  },
  footerBlueBoxSection: {
    ...commonStyles.flexRow,
    ...commonStyles.justifyCenter,
    ...commonStyles.alignCenter
  }
});

export default StrictList;
