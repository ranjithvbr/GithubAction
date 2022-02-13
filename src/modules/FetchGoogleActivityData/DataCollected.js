import React from "react";
import { StyleSheet, Text, SafeAreaView, Button } from "react-native";
import { Navigation } from "../../constant/navigation";
import { Colors } from "../../styles/colors";

const DataCollected = ({ route, navigation }) => {
  const collectedData = route.params;

  const {
    webAndAppActivity,
    locationHistory,
    youtubeHistory,
    email,
    name,
    phone,
    adsPersonalisationSelection,
    personalResultSelection,
    isAudioRecordingsChecked,
    isChromeHistoryChecked
  } = collectedData;

  return (
    <SafeAreaView style={styles.centeredView}>
      <Text>{`Web and App Activity: ${webAndAppActivity}`}</Text>
      <Text>{`Location History: ${locationHistory}`}</Text>
      <Text>{`Youtube History: ${youtubeHistory}`}</Text>
      <Text>{`Ad personalisation: ${adsPersonalisationSelection}`}</Text>
      <Text>{`Personal results in Search: ${personalResultSelection}`}</Text>
      <Text>{`Audio recordings enabled: ${isAudioRecordingsChecked}`}</Text>
      <Text>{`Chrome History enabled: ${isChromeHistoryChecked}`}</Text>
      <Text>{`Name : ${name}`}</Text>
      <Text>{`Phone: ${phone}`}</Text>
      <Text>{`Email Id: ${email}`}</Text>
      <Button
        onPress={() => {
          navigation.navigate(Navigation.AnalyseData, collectedData);
        }}
        title={"Insights"}
      ></Button>

      <Button
        onPress={() => {
          navigation.navigate(Navigation.WelcomeBack);
        }}
        title={"Data Monitor"}
      ></Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    display: "flex",
    minHeight: 800,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white
  }
});

export default DataCollected;
