import React from "react";
import { Button } from "react-native-paper";
import { ButtonTypes } from "./button.type";

function ButtonComponent({
  icon,
  mode = "contained",
  color,
  loading,
  uppercase,
  disabled,
  onLongPress,
  onPress,
  style,
  labelStyle,
  contentStyle,
  accessibilityLabel,
  accessibilityHint,
  title
}: ButtonTypes): JSX.Element {
  return (
    <Button
      icon={icon}
      mode={mode}
      color={color}
      loading={loading}
      uppercase={uppercase}
      disabled={disabled}
      onLongPress={onLongPress}
      onPress={onPress}
      style={[ style ]}
      labelStyle={[ labelStyle ]}
      contentStyle={[ contentStyle ]}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}>
      {title}
    </Button>
  );
}

export default ButtonComponent;
