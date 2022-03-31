import { LineChart } from "react-native-gifted-charts";
import { View, Text } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { BarChart, PieChart } from "react-native-gifted-charts";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

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
      {
        value: unknownVal,
        label: "unknown",
        onPress: () => {
          showToast();
        },
      },
      {
        value: positiveVal,
        label: "positive",
        onPress: () => {
          showToastPosit();
        },
      },
      {
        value: negativeVal,
        label: "negative",
        onPress: () => {
          showToastNeg();
        },
      },
    ];

    return highestPercentageData;
  };

  let daT = highestPercentage();

  console.log(daT);
  console.log(daT[0].value, "aquiiiii");

  let toastText =
    'The label "unknown" reached a peak of ' +
    daT[0].value +
    " % in the collected sound samples.";

  let toastTextPos =
    'The label "positive" reached a peak of ' +
    daT[1].value +
    " % in the collected sound samples.";

  let toastTextNeg =
    'The label "negative" reached a peak of ' +
    daT[2].value +
    " % in the collected sound samples.";

  const showToast = () => {
    Toast.show({
      type: "tomatoToast",
      text1: toastText,
      text2: "This is some something 👋",
    });
  };

  const showToastPosit = () => {
    Toast.show({
      type: "tomatoToast",
      text1: toastTextPos,
      text2: "This is some something 👋",
    });
  };

  const showToastNeg = () => {
    Toast.show({
      type: "tomatoToast",
      text1: toastTextNeg,
      text2: "This is some something 👋",
    });
  };

  return (
    <>
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
    </>
  );
};

export default HighestPercentage;
