import { StyleProp, TextStyle } from "react-native";

export interface InputTypes {
  mode?: "flat" | "outlined";
  label?: string;
  dense?: boolean;
  error?: boolean;
  inputStyles?: StyleProp<TextStyle>;
  value?: string;
  theme?: object,
  left?: React.ReactNode;
  right?: React.ReactNode;
  disabled?: boolean;
  multiline?: boolean;
  placeholder?: string;
  secureTextEntry?: boolean;
  onChangeText?: (string) => void;
  onBlurInput?: (string) => void;
  onFocusInput?: (string) => void;
  selectionColor?: string;
  underlineColor?: string;
  activeUnderlineColor?: string;
  outlineColor?: string;
  activeOutlineColor?: string;
  errorType?: "error" | "info";
  errorTextPadding?: "none" | "normal";
  errorMsg?: string;
  errorStyle?: StyleProp<TextStyle>;
}
  