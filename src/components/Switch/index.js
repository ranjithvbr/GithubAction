import React from "react";
import { Switch } from "react-native";

function CustomSwitch({ isEnabled }) {
  return (
    <Switch
      trackColor={{ false: "#767577", true: "#81b0ff" }}
      thumbColor={"#f4f3f4"}
      value={isEnabled}
      disabled
    />
  );
}

export default CustomSwitch;
