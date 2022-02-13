import React, {ReactElement} from 'react';
import {Path, Svg, SvgProps} from 'react-native-svg';

const BlackTickIcon = (props?: SvgProps): ReactElement => {
  return (
    <Svg width="15" height="11" viewBox="0 0 15 11" fill="none" {...props}>
      <Path
        d="M13.9246 1.24185C13.5952 0.919384 13.0612 0.919383 12.7318 1.24185L6.17163 7.66449L2.43985 4.07028C2.11048 3.74781 1.57646 3.74781 1.24709 4.07028C0.917713 4.39274 0.917714 4.91556 1.24709 5.23803L6.17163 10L13.9246 2.4096C14.254 2.08714 14.254 1.56432 13.9246 1.24185Z"
        fill="#061934"
        stroke="#061934"
      />
    </Svg>
  );
};
export default BlackTickIcon;
