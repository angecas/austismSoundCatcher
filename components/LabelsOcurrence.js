import { Text } from "react-native";
import React from "react";
import { BarChart, PieChart } from "react-native-gifted-charts";
import { useTranslation } from "react-i18next";

const LabelsOcurrence = ({ previsionLabel }) => {
  let size = Object.keys(previsionLabel).length;
  const { t, i18n } = useTranslation();

  const frequenciaLabel = () => {
    let freqArray = [];
    for (let i = 0; i < size; i++) {
      freqArray.push(previsionLabel[i].previsionLabel);
    }

    let barData = [
      {
        value: freqArray.filter((x) => x === "unknown").length,
        label: t("unknown"),
        topLabelComponent: () => (
          <Text style={{ color: "black", fontSize: 18, marginBottom: 6 }}>
            {String(freqArray.filter((x) => x === "unknown").length)}
          </Text>
        ),
      },

      {
        value: freqArray.filter((x) => x === "positive").length,
        label: t("positive"),
        frontColor: "#177AD5",
        topLabelComponent: () => (
          <Text style={{ color: "black", fontSize: 18, marginBottom: 6 }}>
            {String(freqArray.filter((x) => x === "positive").length)}
          </Text>
        ),
      },
      {
        value: freqArray.filter((x) => x === "negative").length,
        label: t("negative"),
        frontColor: "#177AD5",
        topLabelComponent: () => (
          <Text style={{ color: "black", fontSize: 18, marginBottom: 6 }}>
            {String(freqArray.filter((x) => x === "negative").length)}
          </Text>
        ),
      },
    ];

    return barData;
  };

  return (
    <BarChart
      isAnimated
      barWidth={22}
      spacing={80}
      noOfSections={3}
      barBorderRadius={4}
      frontColor="#0e7fe5"
      data={frequenciaLabel()}
      yAxisThickness={0}
      xAxisThickness={0}
      initialSpacing={10}
      disablePress={true}
    />
  );
};

export default LabelsOcurrence;
