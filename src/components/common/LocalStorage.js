import AsyncStorage from "@react-native-community/async-storage";
import { ApplicationConstant } from "../../constant/message";
import { MELD_ID, IS_TOOLTIP_SHOWN_FIRST_TIME, SCRAPPED_DATA } from "./Contants";

const setMeldId = async meldId => {
  try {
    await AsyncStorage.setItem(MELD_ID, meldId);
  } catch (e) {
    // eslint-disable-next-line
    console.error(ApplicationConstant.ERROR_IN_STORING_VALUE_TO_STORE, e);
  }
};

const getMeldId = async () => {
  try {
    const value = await AsyncStorage.getItem(MELD_ID);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // eslint-disable-next-line
    console.error(ApplicationConstant.ERROR_IN_READING_VALUE_FROM_STORE);
  }
};

const setScrappedData = async data => {
  try {
    await AsyncStorage.setItem(SCRAPPED_DATA, JSON.stringify(data));
  } catch (e) {
    // eslint-disable-next-line
    console.error(ApplicationConstant.ERROR_IN_STORING_VALUE_TO_STORE, e);
  }
};

const getScrappedData = async () => {
  try {
    const dataStr = await AsyncStorage.getItem(SCRAPPED_DATA);
    
    const value = JSON.parse(dataStr);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // eslint-disable-next-line
    console.error(ApplicationConstant.ERROR_IN_READING_VALUE_FROM_STORE);
  }
};

const setTooltipDisplayStatus = async isshown => {
  try {
    await AsyncStorage.setItem(
      IS_TOOLTIP_SHOWN_FIRST_TIME,
      isshown ? "true" : "false"
    );
  } catch (e) {
    // eslint-disable-next-line
    console.error(ApplicationConstant.ERROR_IN_STORING_VALUE_TO_STORE, e);
  }
};

const getTooltipDisplayStatus = async () => {
  try {
    const value = await AsyncStorage.getItem(IS_TOOLTIP_SHOWN_FIRST_TIME);
    if (value !== null) {
      return value === "true" ? true : false;
    } else {
      return false;
    }
  } catch (e) {
    // eslint-disable-next-line
    console.error(ApplicationConstant.ERROR_IN_READING_VALUE_FROM_STORE);
  }
};

export const LocalStorage = {
  setMeldId,
  getMeldId,
  setScrappedData,
  getScrappedData,
  setTooltipDisplayStatus,
  getTooltipDisplayStatus
};