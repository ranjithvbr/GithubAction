import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView
} from "react-native";
import ChartList from "../AnalyseData/ChartList";
import { useNavigation } from "@react-navigation/native";
import SaparatePwnedData from "./SaparatePwnedData";
import { Colors } from "../../styles/colors";
import { commonStyles } from "../../styles/commonStyles";
import { moderateScale } from "../../styles/scaleUnits";
import { Fonts } from "../../styles/fonts";
import { Metrics } from "../../styles/metrics";

function Pwned({ route }) {
  const navigation = useNavigation();
  const { pwnedData } = route.params;
  const [ selectedItem, setSelectedItem ] = useState();

  if (selectedItem) {
    return (
      <SaparatePwnedData
        selectedItem={selectedItem}
        setInitialState={() => setSelectedItem()}
      />
    );
  }

  return (
    <SafeAreaView style={commonStyles.flex1}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.headerContainer}
        >
          <View style={styles.backNavigationContainer}>
            <Image
              style={styles.backNavigation}
              source={require("../../assets/Back.png")}
            />
          </View>
        </TouchableOpacity>
        <View style={commonStyles.flex1}>
          <Text style={styles.pageHeader}>Data Breach</Text>
        </View>
      </View>
      <View style={styles.pageContainer}>
        <ChartList
          propsData={pwnedData}
          fixedheight={700}
          setSelectedItem={data => setSelectedItem(data)}
        />
      </View>
    </SafeAreaView>
  );
}

export default Pwned;

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: Colors.white,
    ...commonStyles.flex1
  },
  headerContainer: {
    ...commonStyles.flexRow,
    ...commonStyles.alignCenter,
    zIndex: 999
  },
  pageHeader: {
    fontSize: Fonts.size.medium,
    fontWeight: Fonts.weight.bold,
    textAlign: "center",
    color: Colors.deepBlue,
    marginLeft: -moderateScale(36)
  },
  backNavigationContainer: {
    paddingHorizontal: Metrics.padding.medium
  },
  backNavigation: {
    height: moderateScale(18),
    width: moderateScale(18)
  }
});
