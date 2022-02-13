import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Modal } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import HomeScreen from "components/HomeScreen";
import HowMeldWorks from "components/HowMeldWorks";
import StaticPageScroller from "components/StaticPageScroller";
import AnalyseScreen from "components/AnalyseScreen";
import FetchGoogleActivityData from "modules/FetchGoogleActivityData/sources/FetchGoogleActivityData";
import FetchGooglePersonalInfo from "modules/FetchGoogleActivityData/sources/FetchGooglePersonalInfo";
import FetchGoogleDataAndPrivacy from "modules/FetchGoogleActivityData/sources/FetchGoogleDataAndPrivacy";
import DataCollected from "modules/FetchGoogleActivityData/DataCollected";
import FetchGoogleOtherInfo from "modules/FetchGoogleActivityData/sources/FetchGoogleOtherInfo";
import AnalyseData from "modules/AnalyseData";
import TabNavigator from "components/TabMenu/TabNavigator";
import WelcomeScreen from "components/welcomeBackScreen";
import FilterScreen from "components/filterScreen";
import Settings from "components/TabMenu/Settings";
import Notifications from "components/TabMenu/Notifications";
import Connect from "components/TabMenu/Connect";
import { MenuProvider } from "react-native-popup-menu";
import Insights from "modules/Insights";
import Pwned from "modules/Pwned";
import { EventRegister } from "react-native-event-listeners";
import RegisterOryKartos from "/components/oryKartosImplementation/screens/Register/Register";
import LoginOryKartos from "/components/oryKartosImplementation/screens/Login/Login";
import HomeOryKartos from "/components/oryKartosImplementation/screens/Home";
import AuthProvider from "/components/oryKartosImplementation/provider/AuthProvider";
import Intro from "/components/oryKartosImplementation/screens/Intro";
import TermsAndCondition from "/components/oryKartosImplementation/screens/TermsAndCondition/TermsAndCondition";
import NewWelcome from "/components/oryKartosImplementation/screens/NewWelcome";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Colors } from "styles/colors";
import linking from "/linking";
const Stack = createStackNavigator();

const App = () => {

  const [ modalVisible, setModalVisible ] = useState(false);

  let listener;

  useEffect(() => {
    listener = EventRegister.addEventListener("openOverLay", (isShowModal) => {
      setModalVisible(isShowModal);

    });
    return () => EventRegister.removeEventListener(listener);
  });

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.white,
      background:Colors.white
    }
  };

  return (
    <SafeAreaProvider>
      <MenuProvider>
        <AuthProvider>
          <NavigationContainer theme={MyTheme} linking={linking}>
            <Stack.Navigator initialRouteName="OryKartosIntro" screenOptions={{
              headerShown: false,
              gestureEnabled: false
            }}>
              <Stack.Screen name="OryKartosIntro" component={Intro} />
              <Stack.Screen name="TermsAndCondition" component={TermsAndCondition} />
              <Stack.Screen name="NewWelcome" component={NewWelcome} />
              <Stack.Screen name="RegisterOryKartos" component={RegisterOryKartos} />
              <Stack.Screen name="LoginOryKartos" component={LoginOryKartos} />
              <Stack.Screen name="HomeOryKartos" component={HomeOryKartos} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="HowMeld" component={HowMeldWorks} />
              <Stack.Screen name="PageScroll" component={StaticPageScroller} />
              <Stack.Screen name="Login" component={FetchGoogleActivityData} />
              <Stack.Screen name="FetchGooglePersonalInfo" component={FetchGooglePersonalInfo} />
              <Stack.Screen name="FetchGoogleDataAndPrivacy" component={FetchGoogleDataAndPrivacy} />
              <Stack.Screen name="FetchGoogleOtherInfo" component={FetchGoogleOtherInfo} />
              <Stack.Screen name="DataCollected" component={DataCollected} />
              <Stack.Screen name="Analyze" component={AnalyseScreen} />
              <Stack.Screen name="WelcomeBack" component={WelcomeScreen} />
              <Stack.Screen name="Filter" component={FilterScreen} />
              <Stack.Screen name="AnalyseData" component={AnalyseData} />
              <Stack.Screen name="TabNavigator" component={TabNavigator} />
              <Stack.Screen name="Insights" component={Insights} />
              <Stack.Screen name="Pwned" component={Pwned} />
              <Stack.Screen name="Settings" component={Settings} />
              <Stack.Screen name="Notifications" component={Notifications} />
              <Stack.Screen name="Connect" component={Connect} />
            </Stack.Navigator>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
            >
              <AnalyseScreen />
            </Modal>
          </NavigationContainer>
        </AuthProvider>
      </MenuProvider>
    </SafeAreaProvider>
  );
};

export default App;