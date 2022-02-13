import React, { Component } from "react";
import { LogBox } from "react-native";
import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import { EventRegister } from "react-native-event-listeners";
import { Navigation } from "../../../constant/navigation";
import { commonStyles } from "../../../styles/commonStyles";

class FetchGoogleActivityData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin",
      onetime: true
    };
  }

  componentDidMount() {
    LogBox.ignoreAllLogs();
  }

  render() {
    const { navigation } = this.props;

    const scripts = () => {
      return `
      var headings =  document.evaluate("//div[contains(text(), 'My Google Activity')]", document, null, XPathResult.ANY_TYPE, null)
      var activityHeading = headings.iterateNext()

      var webAndAppActivity = 
      document.querySelector("a[href='activitycontrols?settings=search&utm_source=my-activity&facs=1']").children[1].children[0].innerText

      var locationHistory = 
      document.querySelector("a[href='activitycontrols?settings=location&utm_source=my-activity']").children[1].children[0].innerText

      var youtubeHistory =  
      document.querySelector("a[href='activitycontrols?settings=youtube&utm_source=my-activity&facs=1']").children[1].children[0].innerText
    
        var data = {
          webAndAppActivity,
          locationHistory,
          youtubeHistory
        }
        window.ReactNativeWebView.postMessage(JSON.stringify(data));
        true;
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
          source={{ uri: this.state.url }}
          onMessage={event => {
            if (event.nativeEvent.data && this.state.onetime) {
              EventRegister.emit("openOverLay", true);
              this.setState({ onetime: false });
              clearInterval(intervalId);
              const activityData = JSON.parse(event.nativeEvent.data);
              navigation.navigate(
                Navigation.FetchGooglePersonalInfo,
                activityData
              );
            }
          }}
          onNavigationStateChange={state => {
            if (
              state.url ===
                "https://myaccount.google.com/?utm_source=sign_in_no_continue" ||
              state.url ===
                "https://myaccount.google.com/?utm_source=sign_in_no_continue&pli=1"
            ) {
              this.setState({
                url: "https://myactivity.google.com/?continue=https://myactivity.google.com/myactivity"
              });
            }
          }}
        />
      </SafeAreaView>
    );
  }
}

export default FetchGoogleActivityData;
