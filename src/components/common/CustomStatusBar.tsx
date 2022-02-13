import * as React from "react";
import { View, StatusBar, StatusBarStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../../styles/colors";

export interface StatusBarConfig {
  backgroundColor?: string;
  barStyle?: StatusBarStyle;
}

const CustomStatusBar = ({
  backgroundColor = Colors.base,
  barStyle = "light-content"
}: StatusBarConfig): JSX.Element => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ height: insets.top, backgroundColor }}>
      <StatusBar
        animated={true}
        backgroundColor={backgroundColor}
        barStyle={barStyle}
      />
    </View>
  );
};

export default CustomStatusBar;
