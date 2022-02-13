import { moderateScale } from "./scaleUnits";

export const Metrics = {
  tiny: moderateScale(8),
  xSmall: moderateScale(16),
  small: moderateScale(18),
  medium: moderateScale(20),
  base: moderateScale(24),
  large: moderateScale(32),
  xLarge: moderateScale(40),
  padding: {
    tiny: moderateScale(8),
    xSmall: moderateScale(16),
    small: moderateScale(18),
    medium: moderateScale(20),
    base: moderateScale(24),
    large: moderateScale(32),
    xLarge: moderateScale(40)
  },
  margin: {
    tiny: moderateScale(8),
    xSmall: moderateScale(16),
    small: moderateScale(18),
    medium: moderateScale(20),
    base: moderateScale(24),
    large: moderateScale(32),
    xLarge: moderateScale(40)
  },
  radius: {
    base: moderateScale(8),
    medium: moderateScale(16),
    large: moderateScale(24)
  }
};
