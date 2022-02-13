import { StyleProp, ViewStyle, TextStyle } from "react-native";

export interface ButtonTypes {
  icon?;
  mode?: "text" | "outlined" | "contained";
  color?: string;
  loading?: boolean;
  uppercase?: boolean;
  disabled?: boolean;
  onLongPress?: () => void;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  title: string;
}