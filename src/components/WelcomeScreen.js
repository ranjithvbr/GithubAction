import React from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  SafeAreaView,
  Image
} from "react-native";
import { Navigation } from "../constant/navigation";
import Header from "./common/Header";
import { Colors } from "../styles/colors";
import { ApplicationConstant } from "../constant/message";

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.centeredView}>
      <Header navigation={navigation} />
      <Text style={styles.textStyle}>{ApplicationConstant.MELD}</Text>
      <Text style={styles.control}>{ApplicationConstant.BE_IN_CONTROL}</Text>
      <Image
        source={require("../assets/sliderImages/img-1.png")}
        style={styles.image}
        resizeMode={"contain"}
      />
      <Text style={styles.bottomText}>{ApplicationConstant.WELCOME}</Text>
      <Text style={styles.bottomText}>
        {ApplicationConstant.GUIDE_TO_TRANSPERANCY}
      </Text>
      <Pressable style={styles.button}>
        <View style={styles.modalViewTwo}>
          <Pressable
            style={[ styles.button, styles.buttonClose ]}
            onPress={() => {
              navigation.navigate(Navigation.PageScroll);
            }}
          >
            <View>
              <Text style={styles.connectNow}>GET STARTED</Text>
            </View>
          </Pressable>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: 300
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white
  },
  modalViewTwo: {
    backgroundColor: Colors.deepBlue,
    marginTop: 100,
    paddingLeft: "20%",
    paddingRight: "20%",
    borderRadius: 10
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },

  buttonClose: {
    backgroundColor: Colors.deepBlue
  },
  connectNow: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: "bold",
    lineHeight: 50,
    textAlign: "center",
    textAlignVertical: "bottom"
  },
  textStyle: {
    color: Colors.deepBlue,
    padding: 20,
    marginTop: 40,
    fontSize: 40,
    fontWeight: "normal",
    lineHeight: 40,
    textAlign: "center",
    textAlignVertical: "bottom"
  },
  control: {
    fontStyle: "normal",
    fontSize: 24,
    textAlign: "center",
    color: Colors.deepBlue,
    fontWeight: "bold"
  },
  bottomText: {
    marginTop: 10,
    fontStyle: "normal",
    fontSize: 16,
    textAlign: "center",
    color: Colors.deepBlue,
    fontWeight: "normal"
  }
});

export default WelcomeScreen;
