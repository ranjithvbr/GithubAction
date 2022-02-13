import React from 'react';
import {View, Text, TextStyle, ViewStyle, StyleSheet} from 'react-native';
import {Colors} from '../../styles/colors';
import {Fonts} from '../../styles/fonts';
import {Metrics} from '../../styles/metrics';

import Logo from '../../assets/svg/Logo.svg';
import ArrowLeftCircle from '../../assets/svg/arrow-left-circle.svg';
import MailIconWhite from '../../assets/svg/envelope-white.svg';
import LockWhite from '../../assets/svg/lock-white.svg';
import AvatarWhite from '../../assets/svg/avatar-white.svg';
import GoogleIcon from '../../assets/svg/google.svg';

export const SVGIcon = (props: PropTypes) => {
  const modifiedProps = {
    ...props,
    color: props.color || Colors.grey,
    style: null,
  };
  const getIcon = (iconName: ICONS) => {
    switch (iconName) {
      case ICONS.IC_LOGO:
        return <Logo {...modifiedProps} />;
      case ICONS.IC_BACK_CIRCLE:
        return <ArrowLeftCircle {...modifiedProps} />;
      case ICONS.IC_MAIL_WHITE:
        return <MailIconWhite {...modifiedProps} />;
      case ICONS.IC_LOCK_WHITE:
        return <LockWhite {...modifiedProps} />;
      case ICONS.IC_AVATAR_WHITE:
        return <AvatarWhite {...modifiedProps} />;
      case ICONS.IC_GOOGLE:
        return <GoogleIcon {...modifiedProps} />;
    }
  };

  return (
    <View style={[styles.container, props.style]}>
      {getIcon(props.name)}
      {props.text && <Text style={styles.text}>{props.text}</Text>}
    </View>
  );
};

type Styles = {
  text: TextStyle;
  container: ViewStyle;
};

export const styles = StyleSheet.create<Styles>({
  text: {
    fontSize: Fonts.size.small,
    fontWeight: Fonts.weight.w5,
    marginTop: Metrics.margin.tiny,
    textAlign: 'center',
  },
  container: {
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

export interface PropTypes {
  color?: string;
  name: ICONS;
  width?: number;
  height?: number;
  title?: string;
  text?: string;
  style?;
}

export enum ICONS {
  IC_LOGO,
  IC_BACK_CIRCLE,
  IC_MAIL_WHITE,
  IC_LOCK_WHITE,
  IC_AVATAR_WHITE,
  IC_GOOGLE
}
