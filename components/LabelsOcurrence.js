import { LineChart } from "react-native-gifted-charts";
import { View, Text } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { BarChart, PieChart } from "react-native-gifted-charts";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const LabelsOcurrence = ({ previsionLabel }) => {
  let size = Object.keys(previsionLabel).length;

  const frequenciaLabel = () => {
    let freqArray = [];
    for (let i = 0; i < size; i++) {
      //console.log(previsionLabel[i], "CICLO");
      freqArray.push(previsionLabel[i].previsionLabel);
    }

    let barData = [
      {
        value: freqArray.filter((x) => x === "unknown").length,
        label: "unknown",
        onPress: () => {
          showToast();
        },
      },
      {
        value: freqArray.filter((x) => x === "negative").length,
        label: "negative",
        frontColor: "#177AD5",
        onPress: () => {
          showToastPosit();
        },
      },
      {
        value: freqArray.filter((x) => x === "positive").length,
        label: "positive",
        onPress: () => {
          showToastNeg();
        },
      },
    ];

    return barData;
  };

  let obj = frequenciaLabel();

  let toastText =
    "The label " +
    obj[0].label +
    " was classified as the overall label " +
    obj[0].value +
    " times. ";

  let toastTextPos =
    "The label " +
    obj[1].label +
    " was classified as the overall label " +
    obj[1].value +
    " times. ";

  let toastTextNeg =
    "The label " +
    obj[2].label +
    " was classified as the overall label " +
    obj[2].value +
    " times. ";

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
    <BarChart
      isAnimated
      barWidth={22}
      spacing={80}
      noOfSections={3}
      barBorderRadius={4}
      frontColor="lightgray"
      data={frequenciaLabel()}
      yAxisThickness={0}
      xAxisThickness={0}
    />
  );
};

export default LabelsOcurrence;
