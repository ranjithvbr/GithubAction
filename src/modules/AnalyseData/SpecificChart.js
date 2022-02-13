import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import { VictoryPie } from "victory-native";
import Gcard from "./Gcard";
import { googleActivityData } from "./sampleDataGoogleActivity.json";
import { Colors } from "../../styles/colors";
import { commonStyles } from "../../styles/commonStyles";
import { Fonts } from "../../styles/fonts";
import { Metrics } from "../../styles/metrics";
import { moderateScale } from "../../styles/scaleUnits";

const d = new Date();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function SpecificChart({
  selectedItem,
  chart_data,
  setSelectedItem,
  chart_colorCode,
  collectedData
}) {
  const [ selectedChartData, setSelectedChartData ] = useState([]);
  const [ chartClr, setChartClr ] = useState([]);
  const [ cardDetails, setCardDetails ] = useState([]);
  const [ gServices, setGServices ] = useState([]);
  const [ iconList, setIconList ] = useState([]);
  const googleActivity = {
    webAndAppActivity: collectedData.webAndAppActivity,
    locationHistory: collectedData.locationHistory,
    youtubeHistory: collectedData.youtubeHistory,
    emailId: collectedData.email,
    adsPersonalisationSelection: collectedData.adsPersonalisationSelection,
    personalResultSelection: collectedData.personalResultSelection,
    isAudioRecordingsChecked: collectedData.isAudioRecordingsChecked,
    isChromeHistoryChecked: "false",
    addsOnGoogle: collectedData.adsPersonalisationSelection,
    adsOnPartnerSites: collectedData.adsPersonalisationSelection
  };

  useEffect(() => {
    let selectedId = selectedItem.id;
    let chartRadius = [ { x: " ", y: 30, radius: 150 } ];
    let showChartColor = [];
    for (let i = 0; i < 3; i++) {
      let showChartData =
        (selectedId - 1 + i < 0
          ? chart_data.length - 1
          : selectedId - 1 + i === chart_data.length
            ? -2
            : selectedId - 1) + i;
      let chartIndexData = chart_data[showChartData];
      chartRadius.push({
        x: i === 1 ? chartIndexData?.x : " ",
        y: i === 1 ? chartIndexData?.y + 3 : chartIndexData?.y,
        radius: chartIndexData?.radius + 150
      });
      showChartColor.push(chart_colorCode[showChartData]);
    }
    chartRadius.push({ x: " ", y: 60, radius: 150 });
    let gActivityKeys = Object.keys(googleActivityData[0]);
    let services = [];
    gActivityKeys.forEach(data => {
      if (
        googleActivityData[0][data].dataCategory.toLowerCase() ===
        selectedItem.title.toLowerCase()
      ) {
        googleActivityData[0][data].servicesUsed.forEach(gTitle => {
          if (!services.includes(gTitle)) {
            services.push(gTitle);
          }
        });
      }
    });
    setGServices(services);
    setSelectedChartData(chartRadius);
    setChartClr(showChartColor);
  }, [ selectedItem, chart_data ]);

  const handleGoback = () => {
    setSelectedChartData([]);
    setSelectedItem();
  };

  useEffect(() => {
    let cardDetails = [];
    let gActivityLabel = [];
    switch (selectedItem.title) {
      case "Digital Footprint Data":
        cardDetails = [
          googleActivityData[0][
            `webAppActivity_${googleActivity.webAndAppActivity}`
          ],
          googleActivityData[0][
            `locationHistory_${googleActivity.locationHistory}`
          ],
          googleActivityData[0][
            `audioRecordings_${googleActivity.isAudioRecordingsChecked}`
          ],
          googleActivityData[0][
            `browsingHistory_${googleActivity.isChromeHistoryChecked}`
          ]
        ];
        gActivityLabel = [
          "Web & App Activity",
          "Location History",
          "Audio Recordings",
          "Browsing history"
        ];
        break;
      case "Lifestyle & Health Data":
        cardDetails = [
          googleActivityData[0][`addsOnGoogle_${googleActivity.addsOnGoogle}`]
        ];
        gActivityLabel = [ "Ads on Google" ];
        break;
      case "Personal Interests":
        cardDetails = [
          googleActivityData[0][
            `adsOnPartnerSites_${googleActivity.adsOnPartnerSites}`
          ]
        ];
        gActivityLabel = [ "Ads on partner Sites" ];
        break;
      default:
        break;
    }

    let list = [];
    cardDetails.forEach(data => {
      if (!list.includes(data.confidentiality)) {
        list.push(data.confidentiality);
      }
    });

    let iconList = [];
    cardDetails.forEach(data => {
      const { confidentiality, dataAssets } = data;
      iconList.push({ [confidentiality]: dataAssets });
    });
    setIconList(iconList);
    setCardDetails(list);
  }, []);

  function ordinal(i) {
    var j = i % 10,
      k = i % 100;
    if (j == 1 && k != 11) {
      return i + "st";
    }
    if (j == 2 && k != 12) {
      return i + "nd";
    }
    if (j == 3 && k != 13) {
      return i + "rd";
    }
    return i + "th";
  }

  return (
    <SafeAreaView style={commonStyles.flex1}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleGoback}>
          <View style={styles.arrowHeight}>
            <Image
              style={styles.image}
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
          <Text style={styles.pageHeader}>{selectedItem.title}</Text>
        </View>
      </View>
      <ScrollView style={styles.pageContainer}>
        <View style={styles.IndividualChartContainer}>
          {selectedChartData.length > 0 && (
            <VictoryPie
              data={selectedChartData}
              width={moderateScale(500)}
              height={moderateScale(500)}
              labelRadius={({ index }) =>
                moderateScale(selectedChartData[index].radius - 5)
              }
              labelPosition={"centered"}
              radius={({ datum }) => moderateScale(datum.radius)}
              style={{ labels: { fill: "black", fontSize: moderateScale(16) } }}
              colorScale={[ "#FFFFFF", ...chartClr, "#FFFFFF", "#FFFFFF" ]}
            />
          )}
        </View>
        <View style={styles.googleIconContainer}>
          {gServices.map(label => {
            let path =
              label === "Google Search"
                ? require("../../assets/googleSearch.png")
                : label === "Google Ads"
                  ? require("../../assets/googleAd.png")
                  : label === "Google Maps"
                    ? require("../../assets/googleMap.png")
                    : "";
            return (
              <View style={styles.gImgText}>
                <Image style={styles.gImage} source={path} />
                <Text style={styles.gText}>{label}</Text>
              </View>
            );
          })}
        </View>
        <Text
          style={[
            styles.levelOf,
            selectedItem.title === "Known concerns" && styles.levelOfLeft
          ]}
        >
          {selectedItem.title === "Known concerns"
            ? "Known incidents"
            : "Level of confidentiality"}
        </Text>
        {selectedItem.title === "Known concerns" ? (
          <View style={styles.knownContainer}>
            <View style={styles.greenTickContainer}>
              <Image
                style={styles.greenTick}
                source={require("../../assets/tickIcon.png")}
              />
            </View>
            <View style={styles.knownTextContainer}>
              <Text style={styles.knownDate}>{`Last checked ${ordinal(
                d.getDate()
              )} ${months[d.getMonth()]} ${d.getFullYear()}`}</Text>
              <Text style={styles.knownDesc}>All good. No Known incidents</Text>
            </View>
          </View>
        ) : (
          cardDetails.map((data, index) => {
            return (
              <Gcard
                key={index}
                cardLabel={data}
                header={iconList.map(it => it[data])}
                title={
                  data === "Confidential"
                    ? "Confidental: Only me and others who need to know."
                    : "Restricted: Small selected group"
                }
                content={
                  data === "Confidential"
                    ? "Google must keep this data private and can only share this data when legally obliged to"
                    : "Google must seek explicity consent from the user when passing on this data to other groups."
                }
              />
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default SpecificChart;

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: Colors.white,
    ...commonStyles.flex1
  },
  IndividualChartContainer: {
    marginTop: -moderateScale(250),
    marginLeft: -moderateScale(250),
    ...commonStyles.flex1
  },
  headerContainer: {
    ...commonStyles.flexRow,
    ...commonStyles.alignCenter,
    paddingHorizontal: Metrics.padding.base,
    zIndex: 99
  },
  pageHeader: {
    fontSize: Fonts.size.medium,
    fontWeight: Fonts.weight.bold,
    color: Colors.deepBlue
  },
  image: {
    width: 18,
    height: 18,
    zIndex: 9999
  },
  arrowHeight: {
    height: moderateScale(50),
    ...commonStyles.justifyCenter
  },
  googleIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  gImgText: {
    ...commonStyles.alignCenter,
    ...commonStyles.justifyCenter,
    marginLeft: Metrics.margin.small,
    marginRight: Metrics.margin.small,
    marginTop: Metrics.margin.base
  },
  gText: {
    color: Colors.deepBlue,
    fontSize: Fonts.size.caption,
    textAlign: "center"
  },
  gImage: {
    width: moderateScale(40),
    height: moderateScale(40)
  },
  levelOf: {
    fontSize: Fonts.size.header,
    color: Colors.black,
    marginTop: Metrics.margin.medium,
    marginBottom: Metrics.margin.xSmall,
    textAlign: "center"
  },
  levelOfLeft: {
    textAlign: "left",
    paddingHorizontal: Metrics.padding.xSmall
  },
  knownContainer: {
    ...commonStyles.flexRow,
    ...commonStyles.alignCenter,
    padding: Metrics.padding.xSmall,
    marginHorizontal: Metrics.margin.xSmall,
    borderRadius: Metrics.radius.base
  },
  knownTextContainer: {
    marginLeft: Metrics.margin.medium
  },
  knownDate: {
    textAlign: "center",
    fontSize: Fonts.size.small,
    color: Colors.deepBlue
  },
  knownDesc: {
    fontSize: Fonts.size.base,
    color: Colors.deepBlue,
    textAlign: "center",
    fontWeight: Fonts.weight.bold
  },
  greenTickContainer: {
    backgroundColor: Colors.green,
    padding: Metrics.padding.tiny,
    borderRadius: moderateScale(50)
  },
  greenTick: {
    width: moderateScale(24),
    height: moderateScale(24)
  }
});
