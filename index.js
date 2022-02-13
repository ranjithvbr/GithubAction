import * as React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import App from "./App";
import "react-native-url-polyfill/auto";

const Index = () => {
  return(
    <PaperProvider>
      <App />
    </PaperProvider>
  );};

AppRegistry.registerComponent(appName, () => Index);
