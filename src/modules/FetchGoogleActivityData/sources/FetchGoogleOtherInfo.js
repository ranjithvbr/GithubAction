import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import { EventRegister } from "react-native-event-listeners";
import { Navigation } from "../../../constant/navigation";
import { commonStyles } from "../../../styles/commonStyles";

class FetchGoogleOtherInfo extends Component {
  componentDidMount() {
    this.listener = EventRegister.addEventListener("navigatetoTabs", () => {
      const { navigation } = this.props;
      EventRegister.emit("openOverLay", false);
      navigation.navigate(Navigation.TabNavigator);
    });
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
  }

  render() {
    const uri =
      "https://myactivity.google.com/activitycontrols?utm_source=google-account&continue=https:" +
      "//myaccount.google.com/data-and-privacy?hl%3Den_GB&settings=app";
    const { route } = this.props;
    const scripts = () => {
      return `        
        var audio = document.evaluate("//span[contains(text(), 'Include audio recordings.')]", document, null, XPathResult.ANY_TYPE, null);
        var audioEl = audio.iterateNext();
        var isAudioRecordingsChecked = audioEl.parentElement.parentElement.parentElement.children[0].children[0].checked;

        window.ReactNativeWebView.postMessage(JSON.stringify({isAudioRecordingsChecked}))
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
          source={{ uri }}
          onMessage={event => {
            clearInterval(intervalId);
            const { isAudioRecordingsChecked } = JSON.parse(
              event.nativeEvent.data
            );
            const completeData = {
              ...route.params,
              isAudioRecordingsChecked
            };
            EventRegister.emit("webScrappingCompleted", completeData);
          }}
        />
      </SafeAreaView>
    );
  }
}

export default FetchGoogleOtherInfo;
