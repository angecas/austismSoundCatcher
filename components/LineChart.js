import { LineChart } from "react-native-gifted-charts";
import { View, Text } from "react-native";
import React, { useState, useEffect, useRef } from "react";

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
        { value: unknownAcum / size, label: "Unknown" },
        { value: positiveAcum / size, label: "Positive" },
        { value: negativeAcum / size, label: "Negative" },
      ];
    }

    return averagePercents;
  };

  return (
    <LineChart
      data={averagePredPercent()}
      showTextOnPress
      pressEnabled
      isAnimated={true}
      spacing={80}
    />
  );
};

export default LineChartPrev;
