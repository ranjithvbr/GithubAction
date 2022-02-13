import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView
} from "react-native";
import { LocalStorage } from "../common/LocalStorage";
import BubbleChart from "../common/BubbleChart";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Navigation } from "../../constant/navigation";
import { PlatformType } from "../../constant/commonType";
import { ApplicationConstant } from "../../constant/message";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "../../styles/widthHeightToDP";
import { commonStyles } from "../../styles/commonStyles";
import { Metrics } from "../../styles/metrics";
import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { verticalScale } from "../../styles/scaleUnits";

const dataArray = [
  {
    name: PlatformType.GOOGLE,
    color: "#53A4FF",
    value: 6,
    iconText: "G",
    iconColor: "#4286F4",
    path: Navigation.AnalyseData
  },
  {
    name: PlatformType.DATA_BREACH,
    color: "#947DF9",
    value: 0,
    iconText: "Db",
    iconColor: "#5742F4",
    path: Navigation.Pwned
  }
];

const Understand = () => {
  const navigation = useNavigation();
  const [ userMeldId, setMeldId ] = useState();
  const [ pwnedData, setPwnedData ] = useState([]);
  const [ collectedData, setCollectedData ] = useState();
  const [ dataProviders, setDataProviders ] = useState(dataArray);
  const [ bubbleChartData, setBubbleChartData ] = useState(dataArray);
  const [ loading, setLoading ] = useState(false);
  const widthForBubble = widthPercentageToDP(100);
  const heightForBubble = heightPercentageToDP(35);

  const getMeldIdentificationNumber = async () => {
    const meldId = await LocalStorage.getMeldId();
    setMeldId(meldId);
  };

  const getWebScrappedData = async () => {
    const data = await LocalStorage.getScrappedData();
    setCollectedData(data);
  };

  useEffect(() => {
    getMeldIdentificationNumber();
    getWebScrappedData();
  }, []);

  useEffect(() => {
    if (userMeldId) {
      setLoading(true);
      axios
        .get(
          `http://ae5b3a1588dd54a0998ff795812bb08a-238351751.us-west-1.elb.amazonaws.com/meld/api/V-1/individual/${userMeldId}/breaches`
        )
        .then(res => {
          let resetPwnedData = [];
          res.data.forEach((da, index) => {
            resetPwnedData.push({
              id: index,
              label: 1,
              title: da.title,
              preview: da?.domain_name,
              description: da.description,
              breachedDate: da.breached_date
            });
          });

          const updatedDataProviders = dataArray.map(el => {
            if (el.path === Navigation.Pwned) {
              return {
                ...el,
                value: resetPwnedData.length
              };
            } else return el;
          });

          const updatedBubbleChartData = updatedDataProviders.filter(
            el => el.value !== 0
          );

          setPwnedData(resetPwnedData);
          setDataProviders(updatedDataProviders);
          setBubbleChartData(updatedBubbleChartData);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [ userMeldId ]);

  const renderItem = ({ item }, navigation) => {
    const { name, value, iconText, iconColor } = item;
    return (
      <TouchableOpacity
        onPress={() => {
          if (item.value > 0) {
            navigation.navigate(item.path, { collectedData, pwnedData });
          }
        }}
      >
        <View style={[ styles.cardContainer, { backgroundColor: item.color } ]}>
          <View style={[ styles.iconContainer, { backgroundColor: iconColor } ]}>
            <Text style={styles.iconTextStyle}>{iconText}</Text>
          </View>
          <Text style={styles.cardTitleText}>{name}</Text>
          <Text
            style={styles.cardRightText}
          >{`${value} ${ApplicationConstant.DATA_ITEMS}`}</Text>
          {item.value > 0 ? (
            <Image
              source={require("../../assets/RightIndicator.png")}
              style={styles.imageStyle}
            />
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  const renderChart = () => {
    return (
      <BubbleChart
        width={widthForBubble}
        height={heightForBubble}
        data={bubbleChartData}
      />
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>{ApplicationConstant.LOADING}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <View style={styles.firstHalfContainer}>
          <Text style={styles.titleTextStyle}>
            {ApplicationConstant.WHERE_IS_YOUR_DATA}
          </Text>
          {renderChart()}
        </View>
        <View style={commonStyles.flex1}>
          <Text style={styles.connectedServicesTextStyle}>
            {ApplicationConstant.CONNECTED_SERVICES}
          </Text>
          <FlatList
            style={styles.listContainer}
            data={dataProviders}
            renderItem={({ item, index }) =>
              renderItem({ item, index }, navigation)
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Understand;

const styles = StyleSheet.create({
  safeAreaContainer: {
    ...commonStyles.flex1,
    backgroundColor: Colors.headerBG
  },
  container: {
    ...commonStyles.flex1,
    backgroundColor: Colors.white
  },
  cardContainer: {
    height: verticalScale(72),
    marginHorizontal: Metrics.margin.xSmall,
    marginVertical: Metrics.margin.tiny,
    borderRadius: Metrics.radius.base,
    ...commonStyles.flexRow,
    ...commonStyles.alignCenter
  },
  iconContainer: {
    height: verticalScale(24),
    width: verticalScale(24),
    marginLeft: Metrics.margin.tiny,
    borderRadius: verticalScale(24) / 2,
    ...commonStyles.alignCenter,
    ...commonStyles.justifyCenter
  },
  iconTextStyle: {
    fontSize: Fonts.size.small,
    color: Colors.white,
    fontWeight: Fonts.weight.bold
  },
  cardTitleText: {
    marginLeft: Metrics.margin.tiny,
    fontSize: Fonts.size.base,
    color: Colors.white,
    fontWeight: Fonts.weight.bold,
    ...commonStyles.flex1
  },
  cardRightText: {
    marginLeft: Metrics.margin.tiny,
    fontSize: Fonts.size.xSmall,
    color: Colors.blueTint,
    fontWeight: Fonts.weight.bold,
    marginHorizontal: Metrics.margin.tiny
  },
  imageStyle: { marginRight: Metrics.margin.tiny },
  loadingContainer: {
    ...commonStyles.flex1,
    ...commonStyles.justifyCenter,
    ...commonStyles.alignCenter
  },
  loadingText: {
    fontSize: Fonts.size.base
  },
  firstHalfContainer: {
    ...commonStyles.flex1,
    backgroundColor: Colors.headerBG,
    borderBottomLeftRadius: Metrics.radius.large,
    borderBottomRightRadius: Metrics.radius.large
  },
  titleTextStyle: {
    fontSize: Fonts.size.medium,
    fontWeight: Fonts.weight.bold,
    textAlign: "center",
    marginTop: Metrics.margin.tiny,
    color: Colors.deepBlue
  },
  connectedServicesTextStyle: {
    marginTop: Metrics.margin.small,
    marginLeft: Metrics.margin.xSmall,
    fontSize: Fonts.size.xSmall * 2,
    color: Colors.deepBlue
  },
  listContainer: { marginTop: Metrics.margin.tiny }
});
