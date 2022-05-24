import { LineChart } from "react-native-gifted-charts";
import React from "react";
import Toast from "react-native-toast-message";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { BarChart, PieChart } from "react-native-gifted-charts";
import { Text } from "react-native";
import { View } from "react-native-web";

const LineChartPrev = ({ previsionLabel }) => {
  const { t, i18n } = useTranslation();

  let size = Object.keys(previsionLabel).length;

  const averagePredPercent = () => {
    let unknownAcum = 0;
    let positiveAcum = 0;
    let negativeAcum = 0;
    let size = Object.keys(previsionLabel).length;

    let averagePercents = [
      { value: unknownAcum, label: "unknown" },
      { value: positiveAcum, label: "positive" },
      { value: negativeAcum, label: "negative" },
    ];

    if (size !== 0) {
      for (let i = 0; i < size; i++) {
        if (previsionLabel[i].firstPrevisionLabel === "negative") {
          negativeAcum += parseFloat(previsionLabel[i].firstPrevisionPercent);
        }
        if (previsionLabel[i].secondPrevisionLabel === "negative") {
          negativeAcum += parseFloat(previsionLabel[i].secondPrevisionPercent);
        }
        if (previsionLabel[i].thirdPrevisionLabel === "negative") {
          negativeAcum += parseFloat(previsionLabel[i].thirdPrevisionPercent);
        }
        if (previsionLabel[i].firstPrevisionLabel === "unknown") {
          unknownAcum += parseFloat(previsionLabel[i].firstPrevisionPercent);
        }
        if (previsionLabel[i].secondPrevisionLabel === "unknown") {
          unknownAcum += parseFloat(previsionLabel[i].secondPrevisionPercent);
        }

        if (previsionLabel[i].thirdPrevisionLabel === "unknown") {
          unknownAcum += parseFloat(previsionLabel[i].thirdPrevisionPercent);
        }
        if (previsionLabel[i].firstPrevisionLabel === "positive") {
          positiveAcum += parseFloat(previsionLabel[i].firstPrevisionPercent);
        }
        if (previsionLabel[i].secondPrevisionLabel === "positive") {
          positiveAcum += parseFloat(previsionLabel[i].secondPrevisionPercent);
        }
        if (previsionLabel[i].thirdPrevisionLabel === "positive") {
          positiveAcum += parseFloat(previsionLabel[i].thirdPrevisionPercent);
        }
      }

      averagePercents = [
        {
          value: unknownAcum / size,
          label: t("unknown"),
          topLabelComponent: () => (
            <Text style={{ color: "black", fontSize: 10, marginBottom: 6 }}>
              {String(unknownAcum / size)} {"%"}
            </Text>
          ),
          //dataPointText: String(unknownAcum / size) + " %",
        },
        {
          value: positiveAcum / size,
          label: t("positive"),
          topLabelComponent: () => (
            <Text style={{ color: "black", fontSize: 10, marginBottom: 6 }}>
              {String(positiveAcum / size)} {"%"}
            </Text>
          ),
          //dataPointText: String(positiveAcum / size) + " %",
        },
        {
          value: negativeAcum / size,
          label: t("negative"),
          topLabelComponent: () => (
            <Text style={{ color: "black", fontSize: 10, marginBottom: 6 }}>
              {String(negativeAcum / size)} {"%"}
            </Text>
          ),
          //dataPointText: String(negativeAcum / size) + " %",
        },
      ];
    }

    return averagePercents;
  };

  /*
  <LineChart
  data={averagePredPercent()}
  textColor="black"
  dataPointsColor="#0e7fe5"
  textFontSize={16}
  yAxisLabelSuffix="%"
  color="#0e7fe5"
  showTextOnPress={true}
  isAnimated={true}
  spacing={80}
  pressEnabled={true}
  showDataPointOnPress={true}
/>
*/

  return (
    <BarChart
      isAnimated
      spacing={75}
      barWidth={22}
      yAxisLabelSuffix="%"
      noOfSections={3}
      barBorderRadius={4}
      data={averagePredPercent()}
      yAxisThickness={0}
      xAxisThickness={0}
      frontColor="#0e7fe5"
      initialSpacing={10}
      disablePress={true}
    />
  );
};

export default LineChartPrev;
