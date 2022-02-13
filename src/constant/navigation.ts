export enum Navigation {
  Login = "Login",
  Home = "Home",
  Welcome = "Welcome",
  WelcomeBack = "WelcomeBack",
  PageScroll = "PageScroll",
  TabNavigator = "TabNavigator",
  FetchGoogleOtherInfo = "FetchGoogleOtherInfo",
  FetchGooglePersonalInfo = "FetchGooglePersonalInfo",
  AnalyseData = "AnalyseData",
  Pwned = "Pwned",
  Connect = "Connect",
  Notifications = "Notifications",
  FetchGoogleDataAndPrivacy = "FetchGoogleDataAndPrivacy",
  HomeOryKartos = "HomeOryKartos",
  RegisterOryKartos = "RegisterOryKartos",
  LoginOryKartos = "LoginOryKartos",
  OryKartosIntro = "OryKartosIntro",
  TermsAndCondition = "TermsAndCondition",
  NewWelcome = "NewWelcome"
}

export type NavigatorParamList = {
  [Navigation.RegisterOryKartos]: {[key: string]: unknown} | undefined,
  [Navigation.LoginOryKartos]: {[key: string]: unknown} | undefined,
  [Navigation.OryKartosIntro]: {[key: string]: unknown} | undefined,
  [Navigation.HomeOryKartos]: {[key: string]: unknown} | undefined,
  [Navigation.Home]: {[key: string]: unknown} | undefined,
  [Navigation.PageScroll]: {[key: string]: unknown} | undefined,
  [Navigation.TermsAndCondition]: {[key: string]: unknown} | undefined,
  [Navigation.NewWelcome]: {[key: string]: unknown} | undefined
}
