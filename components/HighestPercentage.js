import { LineChart } from "react-native-gifted-charts";
import { View, Text } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { BarChart, PieChart } from "react-native-gifted-charts";

const HighestPercentage = ({ previsionLabel }) => {
  let size = Object.keys(previsionLabel).length;

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

          console.log(positiveVal, "teste 2");
          console.log(previsionLabel[i].secondPrevisionPercent);
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
      { value: unknownVal, label: "unknown" },
      { value: positiveVal, label: "positive" },
      { value: negativeVal, label: "negative" },
    ];

    return highestPercentageData;
  };

  return (
    <BarChart
      isAnimated
      spacing={80}
      barWidth={22}
      noOfSections={3}
      barBorderRadius={4}
      frontColor="lightgray"
      data={highestPercentage()}
      yAxisThickness={0}
      xAxisThickness={0}
    />
  );
};

export default HighestPercentage;