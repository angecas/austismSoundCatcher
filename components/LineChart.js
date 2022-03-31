import { LineChart } from "react-native-gifted-charts";
import { View, Text } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const LineChartPrev = ({ previsionLabel }) => {
  let size = Object.keys(previsionLabel).length;

  const averagePredPercent = () => {
    let unknownAcum = 0;
    let positiveAcum = 0;
    let negativeAcum = 0;
    let size = Object.keys(previsionLabel).length;

    let averagePercents = [
      { value: unknownAcum, label: "Unknown" },
      { value: positiveAcum, label: "Positive" },
      { value: negativeAcum, label: "Negative" },
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
          label: "Unknown",
          dataPointText: String(unknownAcum / size) + " %",
        },
        {
          value: positiveAcum / size,
          label: "Positive",
          dataPointText: String(positiveAcum / size) + " %",
        },
        {
          value: negativeAcum / size,
          label: "Negative",
          dataPointText: String(negativeAcum / size) + " %",
        },
      ];
    }

    return averagePercents;
  };

  let toastText =
    " This graph displays the average prevision percentage in every sample for each lable ";

  const showToast = () => {
    Toast.show({
      type: "tomatoToast",
      text1: toastText,
      text2: "This is some something 👋",
    });
  };

  return (
    <LineChart
      data={averagePredPercent()}
      showTextOnPress={true}
      isAnimated={true}
      spacing={80}
      pressEnabled={true}
      showDataPointOnPress={true}
      onPress={() => {
        showToast();
      }}
    />
  );
};

export default LineChartPrev;
