import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import { Navigation } from "../../../constant/navigation";
import { commonStyles } from "../../../styles/commonStyles";

class FetchGooglePersonalInfo extends Component {
  render() {
    const { route, navigation } = this.props;
    const scripts = () => {
      return `
        var name =  document.querySelector("a[href*='name']").children[0].children[0].children[0].children[1].innerText
        var email = document.querySelector("a[href*='email']").children[0].children[0].children[0].children[1].innerText
        var phone = document.querySelector("a[href*='phone']").children[0].children[0].children[0].children[1].innerText
        var data = {
          name,
          email,
          phone
        }
        if(data){
          window.ReactNativeWebView.postMessage(JSON.stringify(data));
          true;
        }
      `;
    };

    const intervalId = setInterval(() => {
      this.webref.injectJavaScript(scripts());
    }, 500);

    return (
      <SafeAreaView style={commonStyles.flex1}>
        <WebView
          ref={r => (this.webref = r)}
          javaScriptEnabled={true}
          source={{ uri: "https://myaccount.google.com/personal-info" }}
          onMessage={event => {
            clearInterval(intervalId);
            const { email, name, phone } = JSON.parse(event.nativeEvent.data);
            const completData = {
              ...route.params,
              email,
              name,
              phone
            };
            navigation.navigate(
              Navigation.FetchGoogleDataAndPrivacy,
              completData
            );
          }}
        />
      </SafeAreaView>
    );
  }
}

export default FetchGooglePersonalInfo;
