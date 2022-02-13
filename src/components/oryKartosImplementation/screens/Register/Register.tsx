import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Keyboard,
  ScrollView,
  View,
  TouchableWithoutFeedback,
  Text
} from "react-native";
import { Colors } from "../../../../styles/colors";
import { commonStyles } from "../../../../styles/commonStyles";
import {
  SelfServiceRegistrationFlow,
  SubmitSelfServiceRegistrationFlowBody
} from "@ory/kratos-client";
import { AuthContext } from "../../provider/AuthProvider";
import { newKratosSdk } from "../../helpers/sdk";
import { useFocusEffect } from "@react-navigation/native";
import CustomStatusBar from "../../../common/CustomStatusBar";
import { ICONS, SVGIcon } from "../../../svg/SVGIcon";
import { moderateScale } from "../../../../styles/scaleUnits";
import Input from "../../../Input";
import { handleFormSubmitError } from "../../helpers/errorHandler";
import Loading from "../../../common/Loading";
import { Navigation, NavigatorParamList } from "../../../../constant/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { TextInput } from "react-native-paper";
import Button from "../../../Button";
import DotIndicator from "./DotIndicator";
import IconEntypo from "react-native-vector-icons/Entypo";
import { Criteria, validationUtils } from "../../../../utils/validationUtils";
import { styles } from "./styles";
import { ApplicationConstant } from "../../../../constant/message";
import ErrorSheet from "../../../common/ErrorSheet/ErrorSheet";
const inputBorderColors = { colors: { text: Colors.white, placeholder: Colors.white, background: Colors.transparent } };

export interface RegisterOryKartosProps {
  navigation: StackNavigationProp<NavigatorParamList, Navigation.RegisterOryKartos>
}

export interface EmailProps {
  rightIcon: {
    name: string,
    bgColor: string
  }
}

function RegisterOryKartos({ navigation }: RegisterOryKartosProps): JSX.Element {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ showPwdText, setShowPwdText ] = useState(true);
  const [ selectedDotIndex, setSelectedDotIndex ] = useState(0);
  const [ showError, setShowError ] = useState(false);
  const [ errorMsgForEmail, setErrorMsgForEmail ] = useState("");
  const [ textInputWithCondition, setTextCondition ] = useState(validationUtils.getCriteria().passwordCriteria);
  const [ flow, setConfig ] = useState<SelfServiceRegistrationFlow | undefined>(
    undefined
  );

  const { setSession, isAuthenticated } = useContext(AuthContext);

  const resetState = (): void => {
    setUsername("");
    setPassword("");
    setSelectedDotIndex(0);
  };

  const initializeFlow = (): Promise<void> =>
    newKratosSdk()
      .initializeSelfServiceRegistrationFlowWithoutBrowser()
      // The flow was initialized successfully, let's set the form data:
      .then(({ data: flow }) => {
        setConfig(flow);
      })
      .catch(err => {
        alert(err);
      });

  useFocusEffect(
    React.useCallback(() => {
      initializeFlow();

      return () => {
        setConfig(undefined);
      };
    }, [])
  );

  useEffect(() => {
    if (flow?.ui?.messages?.length) {
      setShowError(!showError);
    }
  }, [ flow ]);

  useEffect(() => {
    if (!username.length) {
      setErrorMsgForEmail("");
    }
  }, [ username ]);

  const onSubmit = (
    payload: SubmitSelfServiceRegistrationFlowBody
  ): Promise<void> =>
    flow
      ? newKratosSdk()
        .submitSelfServiceRegistrationFlow(flow.id, payload)
        .then(({ data }) => {
          if (!data.session_token || !data.session) {
            const err = new Error(
              "It looks like you configured ORY Kratos to not issue a session automatically\
               after registration. This edge-case is currently not supported in this example app. \
               You can find more information on enabling this \
               feature here: https://www.ory.sh/kratos/docs/next/self-service/flows/user-registration#successful-registration"
            );
            return Promise.reject(err);
          }

          setSelectedDotIndex(2);
          return Promise.resolve({
            session: data.session,
            session_token: data.session_token
          });
        })
        .then(setSession)
        .catch(
          handleFormSubmitError<SelfServiceRegistrationFlow | undefined>(
            setConfig,
            initializeFlow
          )
        )
      : Promise.resolve();

  const onContinuePressed = async (): Promise<void> => {
    if(selectedDotIndex === 0){
      setSelectedDotIndex(1);
      return;
    }
    if(selectedDotIndex === 2){
      resetState();
      navigation.navigate(Navigation.TermsAndCondition);
      return;
    }
    setLoading(true);
    await onSubmit({
      csrf_token: "",
      "traits.email": username,
      password: password,
      method: "password"
    }).then(() => {
      setLoading(false);
    });
  };


  const _onEmailChanged = (text: string): void => {
    setUsername(text);
    setErrorMsgForEmail(validationUtils.validateEmail(text) ? "Looks good!" : "Invalid email. Please check.");
  };

  const getRightIcon = (): EmailProps["rightIcon"] => {
    if(username.length){
      if(validationUtils.validateEmail(username)){
        return { name: "emoticon-happy-outline", bgColor: Colors.green };
      }else{
        return { name: "emoticon-sad-outline", bgColor: Colors.red };
      }
    }
    return { name: "email-outline", bgColor: Colors.transparent };
  };

  const getRightIconForPasswordField = (): EmailProps["rightIcon"] => {
    if(password.length){
      if(textInputWithCondition.findIndex(item => item.fullFill === false) === -1){
        return { name: "emoticon-happy-outline", bgColor: Colors.green };
      }else{
        return { name: "emoticon-sad-outline", bgColor: Colors.red };
      }
    }
    return { name: "lock-outline", bgColor: Colors.transparent };
  };

  const showEmailField = (): JSX.Element => {
    return(
      <View style={commonStyles.flex1}>
        <Text style={styles.screenTitle}>Type in your email</Text>
        <View style={[ commonStyles.flex1, commonStyles.justifyCenter ]}>
          <Input
            value={username}
            secureTextEntry={false}
            onChangeText={_onEmailChanged}
            label={"Email address"}
            theme={inputBorderColors}
            inputStyles={styles.inputPadding}
            errorStyle={styles.errorTextStyle}
            activeUnderlineColor={Colors.white}
            underlineColor={Colors.white}
            errorMsg={errorMsgForEmail}
            autoCapitalize={"none"}
            right={<TextInput.Icon style={[ styles.inputTextIconStyle, { backgroundColor: getRightIcon().bgColor } ]} color={Colors.white} name={getRightIcon().name} />}
          />
        </View>
      </View>
    );
  };

  const showEmailVerification = (): JSX.Element => {
    return(
      <View style={commonStyles.flex1}>
        <Text style={styles.screenTitle}>{ApplicationConstant.LOOK_INTO_YOUR_INBOX}</Text>
        <View style={styles.showEmailVerificationContainer}>
          <Text style={styles.emailVerificationText}>{ApplicationConstant.MELD_HAS_SENT_EMAIL_VERIFICATION}</Text>
          <Text style={styles.emailVerificationText1}>{username}</Text>
          <Text style={[ styles.emailVerificationText1, styles.underlinedText ]} onPress={() => setSelectedDotIndex(0)}>{ApplicationConstant.EDIT_EMAIL}</Text>
          <View style={styles.verifyTextContainer}>
            <Text style={styles.emailVerificationText}>{ApplicationConstant.GO_TO_EMAIL_AND_CLICK}</Text>
            <Text style={styles.emailVerificationText}>{`"${ApplicationConstant.VERIFY_EMAIL}"`}</Text>
          </View>
        </View>
      </View>
    );
  };

  const _onPasswordChanged = useCallback((text: string) => {
    const temp = [ ...textInputWithCondition ];
    const criteria = temp.map((item): Criteria => {
      item.fullFill = item.regex.test(text);
      return item;
    });
    setTextCondition(criteria);
    setPassword(text);
  }, []);

  const showPasswordTextContainer = (): JSX.Element => {
    return (
      <TouchableWithoutFeedback onPress={() => setShowPwdText(!showPwdText)}>
        <View style={styles.showPasswordTextContainer}>
          <View style={styles.rectContainer}>
            {showPwdText ? null : <View style={styles.circularDot} />}
          </View>
          <View>
            <Text style={styles.showPwdText}>Show password</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const showPasswordField = (): JSX.Element => {
    return (
      <View style={commonStyles.flex1}>
        <Text style={styles.screenTitle}>Create a password</Text>
        <View style={[ commonStyles.flex1 ]}>
          <Input
            secureTextEntry={showPwdText}
            value={password}
            onChangeText={_onPasswordChanged}
            label={"Type in password"}
            theme={inputBorderColors}
            inputStyles={styles.inputPadding}
            errorStyle={styles.errorTextStyle}
            activeUnderlineColor={Colors.white}
            underlineColor={Colors.white}
            errorMsg={flow?.ui?.nodes[2]?.messages[0]?.text}
            right={
              <TextInput.Icon
                style={[
                  styles.inputTextIconStyle,
                  { backgroundColor: getRightIconForPasswordField().bgColor }
                ]}
                color={Colors.white}
                name={getRightIconForPasswordField().name}
              />
            }
          />
          <View>
            {textInputWithCondition.map((item, index) => {
              return (
                <View
                  style={styles.passwordConstraintsItemContainer}
                  key={index.toString()}>
                  <IconEntypo
                    name="dot-single"
                    size={moderateScale(20)}
                    color={Colors.white}
                  />
                  <Text
                    style={[
                      item.fullFill
                        ? styles.passwordConstraintsTextSatisfied
                        : null,
                      styles.passwordConstraintsText
                    ]}>
                    {item.text}
                  </Text>
                </View>
              );
            })}
          </View>
          <View>
            {showPasswordTextContainer()}
          </View>
        </View>
      </View>
    );
  };

  const renderCenterContent = (): JSX.Element => {
    if(selectedDotIndex === 0){
      return showEmailField();
    }
    if(selectedDotIndex === 1){
      return showPasswordField();
    }
    if(selectedDotIndex === 2){
      return showEmailVerification();
    }
  };

  const getContinueButtonStatus = (): boolean => {
    if(selectedDotIndex === 0 && validationUtils.validateEmail(username)){
      return false;
    }
    if(selectedDotIndex === 1 && textInputWithCondition.findIndex(item => item.fullFill === false) === -1){
      return false;
    }
    if(selectedDotIndex === 2){
      return false;
    }
    return true;
  };

  const onBackPressed = (): void => {
    if(selectedDotIndex === 1){
      setSelectedDotIndex(0);
      return;
    }
    if(selectedDotIndex === 2){
      setSelectedDotIndex(1);
      return;
    }
    navigation.goBack();
  };

  const hideErrorSheet = (): void => setShowError(!showError);

  const _onPrimaryBtnPressed = (): void => {
    navigation.navigate(Navigation.LoginOryKartos);
    hideErrorSheet();
  };

  const _onSecondaryBtnPressed = (): void => {
    setSelectedDotIndex(0);
    hideErrorSheet();
  };

  return (
    <TouchableWithoutFeedback
      style={commonStyles.flex1}
      onPress={Keyboard.dismiss}
    >
      <View style={styles.container}>
        <ErrorSheet
          showErrorSheet={showError}
          errorTitle={ApplicationConstant.ACCOUNT_ALREADY_EXISTS}
          errorText={
            flow?.ui?.messages?.length ? ApplicationConstant.EMAIL_IS_ALREADY_REGISTERED_DESC : ""
          }
          hideErrorSheet={hideErrorSheet}
          primaryBtnTitle={"Go To Login"}
          hasSecondaryBtn={true}
          secondaryBtnTitle={"Use another email address"}
          sheetBgColor={Colors.black}
          primaryBtnTextColor={Colors.black}
          onPrimaryBtnPressed={_onPrimaryBtnPressed}
          onSecondaryBtnPressed={_onSecondaryBtnPressed}
        />
        <Loading loading={loading} />
        <CustomStatusBar />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.containerRounded}>
            <View style={styles.child}>
              <View style={styles.navBar}>
                <TouchableWithoutFeedback onPress={onBackPressed}>
                  <SVGIcon
                    name={ICONS.IC_BACK_CIRCLE}
                    width={moderateScale(40)}
                    height={moderateScale(40)}
                  />
                </TouchableWithoutFeedback>
                <DotIndicator selectedIndex={selectedDotIndex} />
              </View>
              {renderCenterContent()}
            </View>
          </View>
          <View style={commonStyles.flex1Center}>
            <Button
              title="continue"
              onPress={onContinuePressed}
              disabled={getContinueButtonStatus()}
              style={[ styles.buttonStyles, {
                backgroundColor: getContinueButtonStatus() ? Colors.baseDisabled : Colors.black
              } ]}
              contentStyle={styles.buttonContentStyles}
              labelStyle={styles.buttonLabelStyles}
            />
            {selectedDotIndex === 2 ? <View style={styles.didNotReceiveLinkContainer}>
              <Text style={styles.didNotReceiveLinkText}>{ApplicationConstant.DID_NOT_RECEIVE_THE_LINK}</Text>
              <Text style={styles.didNotReceiveLinkText}>{ApplicationConstant.IT_CAN_TAKE_UPTO_2MIN}</Text>
            </View> : undefined}
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default RegisterOryKartos;
