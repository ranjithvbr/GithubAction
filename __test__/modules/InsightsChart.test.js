import { render } from "@testing-library/react-native";
import React from "react";
import InsightsChart from "../../src/modules/Insights/InsightsChart";
import { LocalStorage } from "../../src/components/common/LocalStorage";


jest.mock("@react-native-community/async-storage", () => ({
  getItem: jest.fn()
}));

describe("Insight Charts for strict mode where the user data has  webAndAppActivity On locationHistory On and youtubeHistory On, ", () => {
  const radioName = { strict: "strict", relaxed: "relaxed", comfortable: "comfortable" };
  const changePage = jest.fn();
  beforeAll(() => {
    const temp = {
      webAndAppActivity: "On",
      locationHistory: "On",
      youtubeHistory: "On",
      email: "abctest.gmail.com",
      name: "Garima Mittal\n",
      phone: "123456789",
      adsPersonalisationSelection: "On",
      personalResultSelection: "On",
      isAudioRecordingsChecked: false
    };
    jest.spyOn(LocalStorage, "getScrappedData").mockImplementation(() => temp);
  });
  it("renders correctly", async () => {
    const { tree, getByText, getByTestId } = render(<InsightsChart radioName={radioName.strict} changePage={changePage} />);
    const label1 = getByText("Insights on privacy settings");
    const label2 = getByText("Suggestions on privacy settings");
    const sheildStrength = getByTestId("sheild-strength");
    const approach = getByTestId("approach");

    expect(label1).toBeTruthy();
    expect(label2).toBeTruthy();
    expect(sheildStrength).toBeTruthy();
    expect(approach).toBeTruthy();
    // expect(getByText("Your shield strength: 0", sheildStrength)).toBeTruthy();
    expect(tree).toMatchSnapshot();
  });

  it("should call local storage to get collected data when null", async () => {
    render(<InsightsChart radioName={radioName.strict} changePage={changePage} />);

    expect(LocalStorage.getScrappedData).toHaveBeenCalled();

  });
});