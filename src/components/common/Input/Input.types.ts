import { ICONS } from "../../svg/SVGIcon";

export interface InputTypes {
  value: string;
  onChangeText: (string) => void;
  placeholder: string;
  placeholderTextColor?: string;
  rightIcon?: ICONS;
  secureTextEntry?: boolean;
  errorText?: string | undefined;
  inputStyles?;
}