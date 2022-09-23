import { View, Text } from "react-native";
import React from "react";
import { BarChart } from "react-native-gifted-charts";
import { useTranslation } from "react-i18next";

const HighestPercentage = ({ previsionLabel }) => {
  let size = Object.keys(previsionLabel).length;
  const { t, i18n } = useTranslation();

  const highestPercentage = () => {
    let unknownVal = 0;
    let positiveVal = 0;
    let negativeVal = 0;
    for (let i = 0; i < size; i++) {
      //console.log(previsionLabel[i], "CICLO");
      if (previsionLabel[i].firstPrevisionLabel === "negative") {
        if (negativeVal < parseFloat(previsionLabel[i].firstPrevisionPercent)) {
          negativeVal = parseFloat(previsionLabel[i].firstPrevisionPercent);
        }
      }
      if (previsionLabel[i].secondPrevisionLabel === "negative") {
        if (
          negativeVal < parseFloat(previsionLabel[i].secondPrevisionPercent)
        ) {
          negativeVal = parseFloat(previsionLabel[i].secondPrevisionPercent);
        }
      }

      if (previsionLabel[i].firstPrevisionLabel === "unknown") {
        if (unknownVal < parseFloat(previsionLabel[i].firstPrevisionPercent)) {
          unknownVal = parseFloat(previsionLabel[i].firstPrevisionPercent);
        }
      }

      if (previsionLabel[i].firstPrevisionLabel === "positive") {
        if (positiveVal < parseFloat(previsionLabel[i].firstPrevisionPercent)) {
          positiveVal = parseFloat(previsionLabel[i].firstPrevisionPercent);
        }
      }

      if (previsionLabel[i].secondPrevisionLabel === "unknown") {
        if (unknownVal < parseFloat(previsionLabel[i].secondPrevisionPercent)) {
          unknownVal = parseFloat(previsionLabel[i].secondPrevisionPercent);
        }
      }

      if (previsionLabel[i].secondPrevisionLabel === "positive") {
        if (
          positiveVal < parseFloat(previsionLabel[i].secondPrevisionPercent)
        ) {
          positiveVal = parseFloat(previsionLabel[i].secondPrevisionPercent);
        }
      }

      if (previsionLabel[i].thirdPrevisionLabel === "unknown") {
        if (unknownVal < parseFloat(previsionLabel[i].thirdPrevisionPercent)) {
          unknownVal = parseFloat(previsionLabel[i].thirdPrevisionPercent);
        }
      }

      if (previsionLabel[i].thirdPrevisionLabel === "negative") {
        if (negativeVal < parseFloat(previsionLabel[i].thirdPrevisionPercent)) {
          negativeVal = parseFloat(previsionLabel[i].thirdPrevisionPercent);
        }
      }
      if (previsionLabel[i].thirdPrevisionLabel === "positive") {
        if (positiveVal < parseFloat(previsionLabel[i].thirdPrevisionPercent)) {
          positiveVal = parseFloat(previsionLabel[i].thirdPrevisionPercent);
        }
      }
    }

    let highestPercentageData = [
      {
        value: unknownVal,
        label: t("unknown"),
        topLabelComponent: () => (
          <Text style={{ color: "black", fontSize: 10, marginBottom: 6 }}>
            {String(unknownVal)} {"%"}
          </Text>
        ),
      },
      {
        value: positiveVal,
        label: t("positive"),
        topLabelComponent: () => (
          <Text style={{ color: "black", fontSize: 10, marginBottom: 6 }}>
            {String(positiveVal)} {"%"}
          </Text>
        ),
      },
      {
        value: negativeVal,
        label: t("negative"),
        topLabelComponent: () => (
          <Text style={{ color: "black", fontSize: 10, marginBottom: 6 }}>
            {String(negativeVal)} {"%"}
          </Text>
        ),
      },
    ];

    return highestPercentageData;
  };

  return (
    <View
      style={{
        justifyContent: "center",
        alignContent: "center",
        alignSelf: "center",
      }}
    >
      <BarChart
        isAnimated
        spacing={75}
        barWidth={22}
        yAxisLabelSuffix="%"
        noOfSections={3}
        barBorderRadius={4}
        data={highestPercentage()}
        yAxisThickness={0}
        xAxisThickness={0}
        frontColor="#0e7fe5"
        initialSpacing={10}
        disablePress={true}
      />
    </View>
  );
};

export default HighestPercentage;
