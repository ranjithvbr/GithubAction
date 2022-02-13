import React from "react";
import { View } from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import { InputTypes } from "./input.types";

const Input = ({
  mode,
  label,
  dense = true,
  error,
  inputStyles,
  value,
  theme,
  left,
  right,
  disabled,
  multiline,
  placeholder,
  secureTextEntry,
  onChangeText,
  onBlurInput,
  onFocusInput,
  selectionColor,
  underlineColor,
  activeUnderlineColor,
  outlineColor,
  activeOutlineColor,
  errorType,
  errorTextPadding,
  errorMsg,
  errorStyle,
  ...rest
}: InputTypes): JSX.Element => {
  return (
    <View>
      <TextInput
        mode={mode}
        label={label}
        dense={dense}
        error={error}
        style={[ inputStyles ]}
        value={value}
        theme={theme}
        left={left}
        right={right}
        disabled={disabled}
        multiline={multiline}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        onBlur={onBlurInput}
        onFocus={onFocusInput}
        selectionColor={selectionColor}
        underlineColor={underlineColor}
        activeUnderlineColor={activeUnderlineColor}
        outlineColor={outlineColor}
        activeOutlineColor={activeOutlineColor}
        {...rest}
      />
      <HelperText style={[ errorStyle ]} type={errorType} visible={errorMsg} padding={errorTextPadding}>
        {errorMsg}
      </HelperText>
    </View>
  );
};

export default Input;
