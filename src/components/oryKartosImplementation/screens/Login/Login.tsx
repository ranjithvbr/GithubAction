import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  Text
} from "react-native";
import { Colors } from "../../../../styles/colors";
import { commonStyles } from "../../../../styles/commonStyles";
import { Fonts } from "../../../../styles/fonts";
import { Metrics } from "../../../../styles/metrics";
import { heightPercentageToDP } from "../../../../styles/widthHeightToDP";
import { moderateScale } from "../../../../styles/scaleUnits";
import { AuthContext } from "../../provider/AuthProvider";
import {
  SelfServiceLoginFlow,
  SubmitSelfServiceLoginFlowBody
} from "@ory/kratos-client";
import { newKratosSdk } from "../../helpers/sdk";
import { SessionContext } from "../../helpers/auth";
import { useFocusEffect } from "@react-navigation/native";
import { handleFormSubmitError } from "../../helpers/errorHandler";
import Loading from "../../../common/Loading";
import CustomStatusBar from "../../../common/CustomStatusBar";
import { ICONS, SVGIcon } from "../../../svg/SVGIcon";
import Input from "../../../Input";
import fonts from "../../../../assets/fonts";
import ErrorSheet from "../../../common/ErrorSheet/ErrorSheet";
import { LoginOryKartosProps } from "./Login.types";
import { TextInput } from "react-native-paper";
import Button from "../../../Button";
import { Navigation } from "../../../../constant/navigation";
import { ApplicationConstant } from "../../../../constant/message";
import { validationUtils } from "../../../../utils/validationUtils";
import { EmailProps } from "../Register/Register";

const inputBorderColors = { colors: { text: Colors.white, placeholder: Colors.white, background: Colors.transparent } };

function LoginOryKartos({ navigation, route }: LoginOryKartosProps): JSX.Element {
  // const {
  //   params: { id }
  // } = route;
  const [ showPwdText, setShowPwdText ] = useState(true);
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ showError, setShowError ] = useState(false);
  const [ errorMsgForEmail, setErrorMsgForEmail ] = useState("");
  const [ errorMsgForPassword, setErrorMsgForPassword ] = useState("");
  const [ flow, setFlow ] = useState<SelfServiceLoginFlow | undefined>(undefined);

  const { setSession, isAuthenticated, sessionToken } = useContext(AuthContext);

  const initializeFlow = (): Promise<void> =>
    newKratosSdk()
      .initializeSelfServiceLoginFlowWithoutBrowser(
        route?.params?.refresh,
        route?.params?.aal,
        sessionToken
      )
      .then(response => {
        const { data: flow } = response;
        setFlow(flow);
      })
      .catch(() => {
        // alert(JSON.stringify(err));
      });

  useFocusEffect(
    React.useCallback(() => {
      initializeFlow();

      return () => {
        setFlow(undefined);
      };
    }, [])
  );

  useEffect(() => {
    if (flow?.ui?.messages?.length) {
      setShowError(true);
      setErrorMsgForEmail("Invalid email or password");
      setErrorMsgForPassword("Invalid email or password");
    }
  }, [ flow ]);

  useEffect(() => {
    if (!username.length) {
      setErrorMsgForEmail("");
    }
  }, [ username ]);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate(Navigation.HomeOryKartos);
    }
  }, [ isAuthenticated ]);

  if (isAuthenticated) {
    return null;
  }

  const onSubmit = (payload: SubmitSelfServiceLoginFlowBody): Promise<void> =>
    flow
      ? newKratosSdk()
        .submitSelfServiceLoginFlow(flow.id, sessionToken, payload)
        .then(({ data }) => Promise.resolve(data as SessionContext))
        .then(session => {
          setSession(session);
          setUsername("");
          setPassword("");
        })
        .catch(handleFormSubmitError(setFlow, initializeFlow))
      : Promise.resolve();

  const onContinuePressed = async (): Promise<void> => {
    setLoading(true);
    await onSubmit({
      csrf_token: "",
      password_identifier: username,
      password: password,
      method: "password"
    }).then(() => setLoading(false));
  };

  const hideErrorSheet = (): void => setShowError(!showError);

  const _onEmailChanged = (text: string): void => {
    setUsername(text);
    setErrorMsgForEmail(validationUtils.validateEmail(text) ? "" : "Please check email format");
  };

  const showPasswordTextContainer = (): JSX.Element => {
    return (
      <TouchableWithoutFeedback onPress={() => setShowPwdText(!showPwdText)}>
        <View style={styles.showPasswordTextContainer}>
          <View style={styles.rectContainer}>
            {showPwdText ? null : <View style={styles.circularDot} />}
          </View>
          <View>
            <Text style={styles.showPwdText}>{ApplicationConstant.SHOW_PASSWORD}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const getRightIcon = (): EmailProps["rightIcon"] => {
    if(username.length){
      if(validationUtils.validateEmail(username) && errorMsgForEmail === ""){
        return { name: "check-circle", bgColor: Colors.green };
      }else{
        return { name: "emoticon-sad-outline", bgColor: Colors.red };
      }
    }
    return { name: "email-outline", bgColor: Colors.transparent };
  };

  return (
    <TouchableWithoutFeedback
      style={commonStyles.flex1}
      onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Loading loading={loading} />
        <ErrorSheet
          showErrorSheet={showError}
          errorTitle={ApplicationConstant.INVALID_CREDENTIALS}
          errorText={
            flow?.ui?.messages?.length ? flow?.ui?.messages[0]?.text : ""
          }
          hideErrorSheet={hideErrorSheet}
        />
        <CustomStatusBar />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.containerRounded}>
            <View style={styles.child}>
              <View style={styles.navBar}>
                <TouchableWithoutFeedback onPress={navigation.goBack}>
                  <SVGIcon
                    name={ICONS.IC_BACK_CIRCLE}
                    width={moderateScale(40)}
                    height={moderateScale(40)}
                  />
                </TouchableWithoutFeedback>
                <Text style={styles.headerTextStyle}>Login to Meld</Text>
              </View>

              {/* <Text style={{ fontSize: 18,color: "red" }}>Deep link params: {id}</Text> */}

              <View style={styles.inputContainer}>
                <Input
                  value={username}
                  onChangeText={_onEmailChanged}
                  label={ApplicationConstant.EMAIL_ADDRESS}
                  theme={inputBorderColors}
                  inputStyles={styles.inputPadding}
                  errorStyle={styles.errorTextStyle}
                  activeUnderlineColor={Colors.white}
                  underlineColor={Colors.white}
                  errorMsg={errorMsgForEmail}
                  autoCapitalize={"none"}
                  right={
                    <TextInput.Icon
                      style={[ styles.inputTextIconStyle, { backgroundColor: getRightIcon().bgColor } ]}
                      color={Colors.white}
                      name={getRightIcon().name}
                    />
                  }
                />
              </View>
              <View style={styles.inputContainer}>
                <Input
                  secureTextEntry={showPwdText}
                  value={password}
                  onChangeText={(text: string) => {
                    setPassword(text);
                    setErrorMsgForEmail(validationUtils.validateEmail(username) ? "" : "Please check email format");
                    if(errorMsgForPassword.length){
                      setErrorMsgForPassword("");
                    }
                  }}
                  label={ApplicationConstant.PASSWORD}
                  theme={inputBorderColors}
                  inputStyles={styles.inputPadding}
                  errorStyle={styles.errorTextStyle}
                  activeUnderlineColor={Colors.white}
                  underlineColor={Colors.white}
                  errorMsg={errorMsgForPassword}
                  right={
                    <TextInput.Icon
                      style={[ styles.inputTextIconStyle, { backgroundColor: errorMsgForPassword ? Colors.red : Colors.transparent } ]}
                      color={Colors.white}
                      name={errorMsgForPassword ? "emoticon-sad-outline" : "lock-outline"}
                    />
                  }
                />
              </View>
              {showPasswordTextContainer()}
              <Text
                style={[ styles.forgotPasswordText, styles.underlinedText ]}
                onPress={() => undefined}>
                {ApplicationConstant.FORGOT_PASSWORD}
              </Text>
            </View>
          </View>
          <View style={commonStyles.flex1Center}>
            <Button
              title={ApplicationConstant.LOGIN}
              onPress={onContinuePressed}
              disabled={username.length && password.length ? false : true}
              style={[
                styles.buttonStyles,
                {
                  backgroundColor:
                    username.length && password.length
                      ? Colors.black
                      : Colors.baseDisabled
                }
              ]}
              contentStyle={styles.buttonContentStyles}
              labelStyle={styles.buttonLabelStyles}
            />
            <View style={styles.bottomContainer}>
              <Text style={styles.accountText}>{ApplicationConstant.NO_MELD_ACCOUNT_YET}</Text>
              <Text
                style={[ styles.accountText, styles.underlinedTextGrey ]}
                onPress={() => navigation.navigate(Navigation.RegisterOryKartos)}>
                {ApplicationConstant.SIGNUP_FOR_MELD}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default LoginOryKartos;

const styles = StyleSheet.create({
  container: {
    ...commonStyles.flex1
  },
  containerRounded: {
    ...commonStyles.containerRounded
  },
  child: {
    ...commonStyles.containerRoundedChild,
    paddingHorizontal: Metrics.padding.base,
    ...commonStyles.justifyCenter,
    ...commonStyles
  },
  navBar: {
    position: "absolute",
    top: 0,
    paddingHorizontal: Metrics.padding.base
  },
  inputPadding: {
    paddingHorizontal: 0,
    fontSize: Fonts.size.caption
  },
  errorTextStyle: {
    color: Colors.lightGrey,
    fontSize: Fonts.size.small,
    paddingHorizontal: 0 
  },
  inputTextIconStyle: {
    position: "absolute", 
    left: 0
  },
  buttonStyles: {
    borderRadius: moderateScale(40),
    paddingHorizontal: Metrics.padding.large,
    lineHeight: Fonts.size.caption + 5,
    fontWeight: Fonts.weight.w5,
    letterSpacing: 1,
    fontFamily: fonts.Poppins_Regular
  },
  buttonContentStyles: {
    height: heightPercentageToDP(7.2)
  },
  buttonLabelStyles: {
    color: Colors.white,
    fontSize: Fonts.size.caption
  },
  headerTextStyle: {
    fontFamily: fonts.Poppins_Regular,
    fontSize: Fonts.size.header,
    color: Colors.white,
    lineHeight: Fonts.size.header + 5,
    fontWeight: Fonts.weight.w5,
    marginVertical: Metrics.margin.base
  },
  showPasswordTextContainer: {
    ...commonStyles.flexRow,
    ...commonStyles.alignCenter,
    marginTop: Metrics.margin.medium
  },
  rectContainer: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(2),
    borderWidth: 1,
    borderColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Metrics.margin.medium / 2
  },
  circularDot: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(5),
    backgroundColor: Colors.white
  },
  showPwdText: {
    fontFamily: fonts.Poppins_Regular,
    fontSize: Fonts.size.base,
    lineHeight: Fonts.size.base + 5,
    color: Colors.white
  },
  forgotPasswordText: {
    fontSize: Fonts.size.base,
    color: Colors.white,
    lineHeight: Fonts.size.base + 5,
    fontFamily: fonts.Poppins_Regular,
    paddingTop: Metrics.padding.base
  },
  underlinedText: {
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: Colors.white
  },
  underlinedTextGrey: {
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: Colors.grey
  },
  bottomContainer: {
    marginTop: Metrics.margin.medium
  },
  accountText: {
    fontSize: Fonts.size.base,
    color: Colors.grey,
    lineHeight: Fonts.size.base + 5,
    textAlign: "center",
    fontFamily: fonts.Poppins_Regular
  },
  inputContainer: {
    marginVertical: Metrics.margin.base
  }
});
