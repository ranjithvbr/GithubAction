import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Insights from "../../modules/Insights";
import Understand from "./Understand";
import Settings from "./Settings";
import Connect from "./Connect";
import welcomeBackScreen from "../welcomeBackScreen";
import Tooltip from "react-native-walkthrough-tooltip";
import {
  LocalStorage
} from "../common/LocalStorage";
import { ToolTips } from "../../constant/commonType";
import { ApplicationConstant } from "../../constant/message";
import { Colors } from "../../styles/colors";
const window = Dimensions.get("window");

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const [ isUnderStandTT, setIsUnderstandTT ] = useState(false);
  const [ isInsightsTT, setIsInsightsTT ] = useState(false);
  const [ isMonitorTT, setIsMonitorTT ] = useState(false);
  const [ isSettingsTT, settingsTT ] = useState(false);
  const [ isConnectTT, setConnectTT ] = useState(false);

  const displayToolTip = async () => {
    const flag = await LocalStorage.getTooltipDisplayStatus();
    setTimeout(() => {
      if (!flag) {
        setIsUnderstandTT(true);
      }
    }, 1000);
  };

  useEffect(() => {
    displayToolTip();
  }, []);

  const renderTooltip = (title, content, type) => {
    return (
      <View style={styles.toolTipContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.contentText}>{content}</Text>
        <TouchableOpacity
          onPress={() => {
            switch (type) {
              case ToolTips.UNDERSTAND: {
                setIsUnderstandTT(false);
                setIsInsightsTT(true);
                break;
              }

              case ToolTips.INSIGHTS: {
                setIsInsightsTT(false);
                setIsMonitorTT(true);
                break;
              }

              case ToolTips.MONITOR: {
                setIsMonitorTT(false);
                settingsTT(true);
                break;
              }

              case ToolTips.SETTINGS: {
                settingsTT(false);
                setConnectTT(true);
                break;
              }

              case ToolTips.CONNECT: {
                setConnectTT(false);
                LocalStorage.setTooltipDisplayStatus(true);
                break;
              }
            }
          }}
        >
          <Text style={styles.buttonStyle}>
            {ApplicationConstant.OKAY_GOT_IT}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarActiveTintColor: Colors.blue,
      tabBarInactiveTintColor: Colors.greyDim
    })}>
      <Tab.Screen
        name={ToolTips.UNDERSTAND}
        component={Understand}
        options={{
          headerShown: false,
          tabBarIcon: ({ size }) => (
            <Tooltip
              isVisible={isUnderStandTT}
              content={renderTooltip(
                ToolTips.UNDERSTAND,
                "You can see what data the services have on you",
                ToolTips.UNDERSTAND
              )}
              placement="top"
              backgroundStyle={styles.greenColor}
            >
              <Image
                source={require("../../assets/tabs/Understand.png")}
                size={size}
              />
            </Tooltip>
          )
        }}
      />

      <Tab.Screen
        name={ToolTips.INSIGHTS}
        component={Insights}
        options={{
          headerShown: false,
          tabBarIcon: ({ size }) => (
            <Tooltip
              isVisible={isInsightsTT}
              content={renderTooltip(
                ToolTips.INSIGHTS,
                "You can get suggestions how to make your data more private in the services.",
                ToolTips.INSIGHTS
              )}
              placement="top"
            >
              <Image
                source={require("../../assets/tabs/Shield.png")}
                size={size}
              />
            </Tooltip>
          )
        }}
      />
      <Tab.Screen
        name={ToolTips.MONITOR}
        component={welcomeBackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ size }) => (
            <Tooltip
              isVisible={isMonitorTT}
              content={renderTooltip(
                ToolTips.MONITOR,
                "You can view how your data is used on daily basis with the services.",
                ToolTips.MONITOR
              )}
              placement="top"
            >
              <Image
                source={require("../../assets/tabs/Monitor.png")}
                size={size}
              />
            </Tooltip>
          )
        }}
      />
      <Tab.Screen
        name={ToolTips.SETTINGS}
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: ({ size }) => (
            <Tooltip
              isVisible={isSettingsTT}
              content={renderTooltip(
                ToolTips.SETTINGS,
                "You can change the preferences of your choice",
                ToolTips.SETTINGS
              )}
              placement="top"
            >
              <Image
                source={require("../../assets/tabs/Settings.png")}
                size={size}
              />
            </Tooltip>
          )
        }}
      />
      <Tab.Screen
        name={ToolTips.CONNECT}
        component={Connect}
        options={{
          headerShown: false,
          tabBarIcon: ({ size }) => (
            <Tooltip
              isVisible={isConnectTT}
              content={renderTooltip(
                ToolTips.CONNECT,
                "You can connect to different social media here.",
                ToolTips.CONNECT
              )}
              placement="top"
            >
              <Image
                source={require("../../assets/tabs/Connect.png")}
                size={size}
              />
            </Tooltip>
          )
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  greenColor: {
    color: Colors.green
  },
  toolTipContainer: {
    flex: 1,
    backgroundColor: Colors.skyGreen,
    width: window.width - 90,
    flexDirection: "column",
    borderRadius: 10
  },
  titleText: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 20,
    marginHorizontal: 10
  },
  contentText: {
    marginTop: 10,
    marginHorizontal: 10
  },
  buttonStyle: {
    marginHorizontal: 10,
    textAlign: "right",
    color: Colors.white,
    fontWeight: "bold",
    marginTop: 10
  }
});

export default TabNavigator;
