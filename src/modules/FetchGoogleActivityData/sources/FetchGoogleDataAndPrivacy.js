import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import { Navigation } from "../../../constant/navigation";
import { commonStyles } from "../../../styles/commonStyles";

class FetchGoogleDataAndPrivacy extends Component {
  render() {
    const { route, navigation } = this.props;
    const scripts = () => {
      return `
        var adsPersonalisationSelection = 
        document.querySelectorAll("a[href*='adssettings.google.com/']")[1].children[0].children[0].children[0].children[1]
        .children[0].children[1].innerText

        var personalResultSelection = 
        document.querySelector("a[href*='setting/search/privateresults']").children[1].children[0].children[0].children[0]
        .children[0].children[0].children[0].children[0].children[1].innerText

        var data = {
          adsPersonalisationSelection,
          personalResultSelection,
        }
        window.ReactNativeWebView.postMessage(JSON.stringify(data))
        true
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
          source={{
            uri: "https://myaccount.google.com/data-and-privacy?hl=en_GB"
          }}
          onMessage={event => {
            clearInterval(intervalId);
            const { adsPersonalisationSelection, personalResultSelection } =
              JSON.parse(event.nativeEvent.data);
            const completData = {
              ...route.params,
              adsPersonalisationSelection,
              personalResultSelection
            };
            navigation.navigate(Navigation.FetchGoogleOtherInfo, completData);
          }}
        />
      </SafeAreaView>
    );
  }
}

export default FetchGoogleDataAndPrivacy;
