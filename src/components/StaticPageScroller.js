import React, { useRef, useState } from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import HowMeldWorks from "./HowMeldWorks";
import Header from "./common/Header";
import { Colors } from "../styles/colors";
import { ApplicationConstant } from "../constant/message";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "../styles/widthHeightToDP";
import { Metrics } from "../styles/metrics";
import { moderateScale } from "../styles/scaleUnits";

const windowWidth = Dimensions.get("window").width;
const activePageColor = Colors.deepBlue;
const deactivePageColor = Colors.skyGreen;

const StaticPageScroller = ({ navigation }) => {
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ lastX, setLastX ] = useState(-200);
  const scrollViewRef = useRef();

  const validatePageLimitAndSet = pageNumber => {
    if (pageNumber !== -1 && pageNumber < 5) {
      setCurrentPage(pageNumber);
    }
  };

  const goToPreviousPage = (isScroll = true) => {
    if (currentPage > -1) {
      const prevPage = currentPage - 1;
      if (isScroll) {
        scrollToGivenPage(prevPage);
      }
      validatePageLimitAndSet(prevPage);
    }
  };

  const goToNextPage = (isScroll = true) => {
    if (currentPage != -1 && currentPage < 4) {
      const nextPage = currentPage + 1;
      if (isScroll) {
        scrollToGivenPage(nextPage);
      }
      validatePageLimitAndSet(nextPage);
    }
  };

  const scrollToGivenPage = pageNumber => {
    scrollViewRef.current.scrollTo({
      x: windowWidth * pageNumber,
      y: 0,
      animated: true
    });
  };

  const handleScroll = event => {
    const x = event.nativeEvent.contentOffset.x;
    let temp = x - lastX;
    let isPagingHappened = false;
    if ((temp < 0 && temp < -100) || (temp > 0 && temp > 100)) {
      isPagingHappened = true;
    }
    if (isPagingHappened) {
      if (!lastX) {
        setLastX(x);
        goToNextPage(false);
      } else {
        if (x > lastX) {
          goToNextPage(false);
        } else {
          goToPreviousPage(false);
        }
        setLastX(x);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        decelerationRate={0}
        snapToInterval={windowWidth}
        snapToAlignment={"center"}
        pagingEnabled={true}
        onScrollEndDrag={handleScroll}
      >
        <HowMeldWorks
          style={styles.page}
          sourceImage={require("../assets/sliderImages/img-1.png")}
          contentStr={
            ApplicationConstant.WELCOME +
            "\n\n" +
            ApplicationConstant.GUIDE_TO_TRANSPERANCY
          }
        />
        <HowMeldWorks
          style={styles.page}
          sourceImage={require("../assets/sliderImages/img-2.png")}
          contentStr={
            ApplicationConstant.MELD_SHOWS_DIFFERENT_SERVICES_KNOW_ABOUT_YOU
          }
        />
        <HowMeldWorks
          style={styles.page}
          sourceImage={require("../assets/sliderImages/img-3.png")}
          contentStr={ApplicationConstant.MELD_ADVICE_CHANGE_PRIVACY_SETTINGS}
        />
        <HowMeldWorks
          style={styles.page}
          sourceImage={require("../assets/sliderImages/img-4.png")}
          contentStr={ApplicationConstant.MELD_KEEPS_EYE_AND_ALERTS}
        />
        <HowMeldWorks
          style={styles.page}
          sourceImage={require("../assets/sliderImages/img-5.png")}
          contentStr={ApplicationConstant.MELD_DONOT_COPY_DATA}
        />
      </ScrollView>
      <Header navigation={navigation} isDisplayCloseIcon={true} />
      <View style={styles.pagingView}>
        <TouchableOpacity onPress={goToPreviousPage}>
          <Image
            style={styles.pageNavigateImage}
            source={require("../assets/sliderImages/Previous.png")}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
        <View style={styles.indicatorView}>
          <View
            style={[
              styles.pageIndicator,
              styles.marginLeft,
              {
                backgroundColor:
                  currentPage === 0 ? activePageColor : deactivePageColor
              }
            ]}
          />
          <View
            style={[
              styles.pageIndicator,
              {
                backgroundColor:
                  currentPage === 1 ? activePageColor : deactivePageColor
              }
            ]}
          />
          <View
            style={[
              styles.pageIndicator,
              {
                backgroundColor:
                  currentPage === 2 ? activePageColor : deactivePageColor
              }
            ]}
          />
          <View
            style={[
              styles.pageIndicator,
              {
                backgroundColor:
                  currentPage === 3 ? activePageColor : deactivePageColor
              }
            ]}
          />
          <View
            style={[
              styles.pageIndicator,
              styles.marginRight,
              {
                backgroundColor:
                  currentPage === 4 ? activePageColor : deactivePageColor
              }
            ]}
          />
        </View>
        <TouchableOpacity onPress={goToNextPage}>
          <Image
            style={styles.pageNavigateImage}
            source={require("../assets/sliderImages/Next.png")}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  page: {
    flex: 1,
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100)
  },
  pagingView: {
    position: "absolute",
    bottom: moderateScale(20),
    left: Metrics.margin.medium,
    right: Metrics.margin.medium,
    height: moderateScale(100),
    flexDirection: "row",
    alignItems: "center"
  },
  pageNavigateImage: {
    height: moderateScale(50),
    width: moderateScale(40)
  },
  indicatorView: {
    flex: 1,
    width: moderateScale(200),
    height: moderateScale(80),
    flexDirection: "row",
    alignItems: "center"
  },
  pageIndicator: {
    flex: 1,
    backgroundColor: deactivePageColor,
    height: moderateScale(5),
    borderRadius: moderateScale(10),
    marginHorizontal: moderateScale(5)
  }
});

export default StaticPageScroller;
