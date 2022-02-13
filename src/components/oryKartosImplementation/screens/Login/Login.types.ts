import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Navigation, NavigatorParamList } from "../../../../constant/navigation";

export type LoginOryKartosParams = {
  [Navigation.LoginOryKartos]: {
    refresh?: boolean,
    aal?: string | undefined,
    id?: string
  }
}
  
export interface LoginOryKartosProps {
  navigation: StackNavigationProp<NavigatorParamList, Navigation.LoginOryKartos>,
  route?: RouteProp<LoginOryKartosParams>
}