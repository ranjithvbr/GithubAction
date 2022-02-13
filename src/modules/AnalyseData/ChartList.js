import React from "react";
import {
  FlatList,
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import { Colors } from "../../styles/colors";
import { Fonts } from "../../styles/fonts";
import { Metrics } from "../../styles/metrics";
import { moderateScale } from "../../styles/scaleUnits";

const DATA = [
  {
    id: 0,
    label: 4,
    title: "Digital Footprint Data",
    preview:
      "Website Activities,  Browsing histories,  Audio recordings and Geographic locations "
  },
  {
    id: 1,
    label: 1,
    title: "Lifestyle & Health Data",
    preview: "Personal Interests"
  },
  {
    id: 2,
    label: 1,
    title: "Personal Interests",
    preview: "Personal Interests"
  },
  {
    id: 3,
    label: 0,
    title: "Known concerns",
    preview: "Has there been anything you should be aware"
  }
];

const Item = ({ item, onPress, index, chart_colorCode = [] }) => {
  let chartClr =
    chart_colorCode.length > 0 && chart_colorCode[index]
      ? { backgroundColor: chart_colorCode[index] }
      : "";
  return (
    <TouchableOpacity onPress={onPress} style={[ styles.item ]}>
      <View style={[ styles.listContainer ]}>
        <View style={[ styles.listConstantContainer ]}>
          <View style={[ styles.listCircleNum, chartClr ]}>
            <Text style={[ styles.circleText ]}>{item.label}</Text>
          </View>
          <View>
            <Text style={[ styles.listHeader ]}>{item.title}</Text>
            <Text style={[ styles.listPreview ]}>{item.preview}</Text>
          </View>
        </View>
        <Image
          style={styles.image}
          source={require("../../assets/rightArrow.png")}
        />
      </View>
    </TouchableOpacity>
  );
};

const ChartList = ({
  setSelectedItem,
  chart_colorCode,
  propsData,
  fixedheight
}) => {
  const renderItem = ({ item, index }) => {
    return (
      <Item
        item={item}
        onPress={() => setSelectedItem(item)}
        index={index}
        chart_colorCode={chart_colorCode}
      />
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        nestedScrollEnabled
        data={propsData ? propsData : DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        maxHeight={fixedheight ? fixedheight : 430}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: moderateScale(20),
    marginVertical: moderateScale(8),
    backgroundColor: Colors.headerBG,
    borderRadius: moderateScale(8),
    margin: moderateScale(8)
  },
  listPreview: {
    color: Colors.deepBlue,
    fontSize: Fonts.size.caption,
    maxWidth: moderateScale(225)
  },
  circleText: {
    fontSize: Fonts.size.caption,
    color: Colors.deepBlue,
    fontWeight: Fonts.weight.bold
  },
  listHeader: {
    fontSize: Fonts.size.caption,
    color: Colors.deepBlue,
    fontWeight: Fonts.weight.bold,
    flex: 1,
    flexWrap: "wrap"
  },
  listContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  listConstantContainer: {
    flexDirection: "row"
  },
  listCircleNum: {
    width: moderateScale(35),
    height: moderateScale(35),
    borderRadius: moderateScale(20),
    marginRight: Metrics.margin.xSmall,
    marginTop: Metrics.margin.tiny / 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: moderateScale(18),
    height: moderateScale(18)
  }
});

export default ChartList;
