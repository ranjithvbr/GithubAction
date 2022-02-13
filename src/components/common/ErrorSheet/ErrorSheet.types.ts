export interface ErrorSheetType {
  showErrorSheet: boolean;
  errorTitle: string;
  errorText: string;
  hideErrorSheet: () => void;
  hasPrimaryBtn?: boolean;
  primaryBtnTitle?: string;
  hasSecondaryBtn?: boolean;
  secondaryBtnTitle?: string;
  onPrimaryBtnPressed?: () => void;
  onSecondaryBtnPressed?: () => void;
  sheetBgColor?: string;
  primaryBtnTextColor?: string; 
}