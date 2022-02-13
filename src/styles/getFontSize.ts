import { Dimensions } from "react-native";

export function getFontSize(fontSize, standardScreenHeight = 680): number {
  const { height, width } = Dimensions.get("screen");
  const standardLength = width > height ? width : height;

  const heightPercent = (fontSize * standardLength) / standardScreenHeight;

  return Math.round(heightPercent);
}
