import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity
} from "react-native";
import { registerIndividualService } from "../services/API";
import { EventRegister } from "react-native-event-listeners";
import { LocalStorage } from "./common/LocalStorage";
import { Fonts } from "../styles/fonts";
import { Metrics } from "../styles/metrics";
import { Colors } from "../styles/colors";
import { commonStyles } from "../styles/commonStyles";
import Textloader from "./TextLoader";
import { moderateScale } from "../styles/scaleUnits";
import { ApplicationConstant } from "../constant/message";
import { DataAnalysis } from "../constant/commonType";

const dataAnalysisArray = [
  {
    label: ApplicationConstant.IDENTIFY_DATA,
    value: DataAnalysis.IDENTIFY
  },
  {
    label: ApplicationConstant.PEOPLE_MATTER_MOST,
    value: DataAnalysis.PEOPLE
  },
  {
    label: ApplicationConstant.ADS_YOU_FIND_USEFULL,
    value: DataAnalysis.ADS
  },
  {
    label: ApplicationConstant.COOKIES,
    value: DataAnalysis.COOKIES
  },
  {
    label: ApplicationConstant.THINKS_YOU_CREATE,
    value: DataAnalysis.THINKS
  },
  {
    label: ApplicationConstant.GOOGLE_SEARCH,
    value: DataAnalysis.GOOGLE
  },
  {
    label: ApplicationConstant.GMAIL,
    value: DataAnalysis.GMAIL
  },
  {
    label: ApplicationConstant.YOUTUBE,
    value: DataAnalysis.YOUTUBE
  },
  {
    label: ApplicationConstant.HANGOUTS,
    value: DataAnalysis.HANGOUTS
  },
  {
    label: ApplicationConstant.GOOGLE_MAPS,
    value: DataAnalysis.GOOGLE_MAPS
  },
  {
    label: ApplicationConstant.GOOGLE_KEEP,
    value: DataAnalysis.KEEP
  }
];

const AnalyseScreen = () => {
  const [ selectedValue, setSelectedValue ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isResponseReceived, setIsResponseReceived ] = useState(false);

  let listener;

  useEffect(() => {
    changeTheSelect();

    listener = EventRegister.addEventListener(
      "webScrappingCompleted",
      completeData => {
        setIsResponseReceived(true);

        const { email } = completeData;
        if (email) {
          LocalStorage.setScrappedData(completeData);

          let userName = email;
          if (email.includes("\n")) {
            userName = email.split("\n")[0];
          }
          const params = {
            persona_user_name: userName,
            identity_provider: DataAnalysis.GOOGLE.toUpperCase()
          };
          invokeRegisterIndividualAPI(params);
        }
      }
    );
    return () => EventRegister.removeEventListener(listener);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      changeTheSelect();
    }, 1000);
  }, [ selectedValue ]);

  const invokeRegisterIndividualAPI = params => {
    setIsLoading(true);
    registerIndividualService(params)
      .then(response => {
        setIsLoading(false);
        setTimeout(() => {
          setIsResponseReceived(true);
        }, 11000);
        const {
          data: { meld_user_id }
        } = response;
        LocalStorage.setMeldId(meld_user_id);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const changeTheSelect = () => {
    let index = dataAnalysisArray.findIndex(
      temp => temp.value === selectedValue
    );
    const tempIndex = index + 1;
    const tempSelectedValue = dataAnalysisArray[tempIndex];
    if (tempSelectedValue) {
      setSelectedValue(tempSelectedValue.value);
    }
  };

  const renderGifImage = () => {
    return (
      <View style={styles.gifContainer}>
        <Image
          style={styles.gifImage}
          source={require("../assets/Spinner.gif")}
          resizeMode={"contain"}
        />
      </View>
    );
  };

  const renderTickMark = () => {
    return (
      <View style={styles.container}>
        <View style={styles.tickCircleIconContainer}>
          <Image
            source={require("../assets/TickMark.png")}
            style={styles.tickMarkIcon}
            resizeMode={"contain"}
          />
        </View>
        <View style={styles.insightsContainer}>
          <TouchableOpacity
            style={[
              commonStyles.flexRow,
              commonStyles.alignCenter,
              commonStyles.justifyCenter
            ]}
            onPress={() => {
              EventRegister.emit("navigatetoTabs");
            }}
          >
            <View style={commonStyles.flex1}>
              <Text style={styles.insightsText}>{"SHOW INSIGHTS"}</Text>
            </View>
            <Image
              source={require("../assets/RightArrowCircleIcon.png")}
              style={styles.rightArrowIcon}
              resizeMode={"contain"}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.infoText}>
        {" "}
        {isResponseReceived
          ? ApplicationConstant.DONE +
            "\n\n" +
            ApplicationConstant.INSIGHTS_ABOUT_GOOGLE
          : ApplicationConstant.ANALYSE_YOUR_DATA_GOOGLE}
      </Text>
      {!isResponseReceived && !isLoading && renderGifImage()}
      {isResponseReceived && renderTickMark()}
      {!isResponseReceived && <Textloader dataAnalysis={dataAnalysisArray} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.flex1,
    backgroundColor: Colors.white
  },
  infoText: {
    marginTop: Metrics.margin.tiny,
    fontSize: Fonts.size.medium,
    fontWeight: Fonts.weight.bold,
    paddingHorizontal: Metrics.padding.tiny,
    color: Colors.deepBlue
  },
  gifContainer: {
    flex: 0.65,
    marginTop: Metrics.margin.xSmall,
    marginHorizontal: Metrics.margin.tiny
  },
  gifImage: {
    height: undefined,
    width: undefined,
    flex: 1
  },
  tickCircleIconContainer: {
    flex: 0.8,
    marginTop: Metrics.margin.tiny,
    ...commonStyles.justifyCenter,
    ...commonStyles.alignCenter
  },
  insightsContainer: {
    position: "absolute",
    bottom: Metrics.margin.tiny,
    left: Metrics.margin.tiny,
    right: Metrics.margin.tiny,
    borderRadius: Metrics.radius.base,
    backgroundColor: Colors.deepBlue
  },
  insightsText: {
    fontWeight: Fonts.weight.bold,
    color: Colors.white,
    fontSize: Fonts.size.title,
    textAlign: "center",
    marginLeft: moderateScale(48)
  },
  tickMarkIcon: {
    height: moderateScale(136),
    width: moderateScale(136)
  },
  rightArrowIcon: {
    height: moderateScale(48),
    width: moderateScale(48),
    marginHorizontal: Metrics.margin.tiny,
    marginVertical: Metrics.margin.tiny
  }
});

export default AnalyseScreen;
