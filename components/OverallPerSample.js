import { LineChart } from "react-native-gifted-charts";
import React from "react";
import { useTranslation } from "react-i18next";

const OverallPerSample = ({ overallPerSamp }) => {
  const { t, i18n } = useTranslation();

  let size = Object.keys(overallPerSamp).length;

  let graphResponse = [];
  for (let [key, value] of overallPerSamp) {
    let obj = { value: key, label: value };
    graphResponse.push(obj);
  }

  const overallPerSample = () => {
    let graphResponse = [];
    for (let [key, value] of overallPerSamp) {
      let obj = { value: key, label: value };
      graphResponse.push(obj);
    }
    return graphResponse;
  };

  return (
    <LineChart
      data={overallPerSample()}
      showTextOnPress
      pressEnabled
      isAnimated={true}
      spacing={80}
    />
  );
};

export default OverallPerSample;
