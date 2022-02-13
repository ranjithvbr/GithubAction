import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import fonts from "../../../assets/fonts";
import { Navigation, NavigatorParamList } from "../../../constant/navigation";
import { Colors } from "../../../styles/colors";
import { commonStyles } from "../../../styles/commonStyles";
import { Fonts } from "../../../styles/fonts";
import { Metrics } from "../../../styles/metrics";
import { moderateScale } from "../../../styles/scaleUnits";
import CustomStatusBar from "../../common/CustomStatusBar";
import { AuthContext } from "../provider/AuthProvider";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";
export interface HomeOryKartosProps {
  navigation: StackNavigationProp<NavigatorParamList, Navigation.HomeOryKartos>
}

function HomeOryKartos({ navigation }: HomeOryKartosProps): JSX.Element {
  const { setSession, isAuthenticated, sessionToken, session } =
    useContext(AuthContext);

  const onLogout = async (): Promise<void> => setSession(null);

  useEffect(() => {
    if (!isAuthenticated || !session) {
      navigation.popToTop();
    }
  }, [ isAuthenticated, sessionToken ]);

  if (!isAuthenticated || !session) {
    return null;
  }

  const onProceed = (): void => {
    navigation.navigate(Navigation.Home);
  };

  return (
    <View style={commonStyles.flex1}>
      <CustomStatusBar
        backgroundColor={Colors.white}
        barStyle={"dark-content"}
      />
      <View style={styles.headerContainer}>
        <Text
          style={styles.header}
        >{`Welcome ${session?.identity?.traits?.email}!`}</Text>
        <IconMaterialIcons name={"logout"} size={moderateScale(30)} color={Colors.red} onPress={onLogout} />
      </View>
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.subTitle}>
            {"Hello, nice to have you! You signed up with this data:"}
          </Text>
          <View style={styles.codeBox}>
            <Text style={styles.codeText}>
              {JSON.stringify(session.identity.traits || "{}", null, 2)}
            </Text>
          </View>
          <Text style={styles.subTitle}>
            {"You are signed in using an ORY Kratos Session Token:"}
          </Text>
          <View style={styles.codeBox}>
            <Text style={styles.codeText}>{sessionToken}</Text>
          </View>
          <Text
            style={styles.subTitle}
          >{`This app makes REST requests to ORY Kratos' Public API to validate and
          decode the ORY Kratos Session payload:`}</Text>
          <View style={styles.codeBox}>
            <Text style={styles.codeText}>
              {JSON.stringify(session || "{}", null, 2)}
            </Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={onProceed}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonTextStyle}>proceed</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default HomeOryKartos;

const styles = StyleSheet.create({
  container: {
    ...commonStyles.flex1,
    paddingHorizontal: Metrics.padding.base,
    backgroundColor: Colors.white
  },
  header: {
    fontSize: Fonts.size.header,
    fontWeight: Fonts.weight.bold,
    color: Colors.green,
    textAlign: "center",
    fontFamily: fonts.Poppins_Regular,
    backgroundColor: Colors.white
  },
  buttonTextStyle: {
    paddingVertical: Metrics.padding.small,
    paddingHorizontal: Metrics.padding.base * 2,
    color: Colors.white,
    textTransform: "uppercase",
    fontSize: Fonts.size.caption,
    lineHeight: Fonts.size.caption + 5,
    fontWeight: Fonts.weight.bold,
    letterSpacing: 1,
    fontFamily: fonts.Poppins_Regular
  },
  buttonContainer: {
    backgroundColor: Colors.black,
    borderRadius: moderateScale(40),
    position: "absolute",
    bottom: Metrics.margin.base,
    alignSelf: "center"
  },
  codeBox: {
    backgroundColor: Colors.base,
    borderRadius: Metrics.radius.base,
    marginVertical: Metrics.margin.base
  },
  codeText: {
    fontSize: Fonts.size.base,
    color: Colors.white,
    fontFamily: fonts.Poppins_Regular,
    padding: Metrics.padding.base
  },
  subTitle: {
    fontSize: Fonts.size.base,
    color: Colors.base,
    fontFamily: fonts.Poppins_Regular,
    paddingVertical: Metrics.padding.tiny
  },
  headerContainer: {
    ...commonStyles.flexRow,
    ...commonStyles.alignCenter,
    justifyContent: "space-between",
    paddingHorizontal: Metrics.padding.base
  }
});
