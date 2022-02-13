import { moderateScale } from "./scaleUnits";

type FontWeight =
  | "normal"
  | "bold"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

export const Fonts = {
  family: {},
  size: {
    xSmall: moderateScale(10),
    small: moderateScale(12),
    base: moderateScale(16),
    medium: moderateScale(24),
    caption: moderateScale(14),
    header: moderateScale(20),
    large: moderateScale(38)
  },
  lineHeight: {
    xSmall: moderateScale(10),
    small: moderateScale(12),
    base: moderateScale(16),
    medium: moderateScale(24),
    caption: moderateScale(14),
    header: moderateScale(20)
  },
  weight: {
    base: "700" as FontWeight,
    bold: "700" as FontWeight,
    w5: "500" as FontWeight,
    w4: "400" as FontWeight,
    normal: "normal" as FontWeight
  }
};
