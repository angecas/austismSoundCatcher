import { LineChart } from "react-native-gifted-charts";
import { View, Text } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { BarChart, PieChart } from "react-native-gifted-charts";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { useTranslation } from "react-i18next";

const LabelsOcurrence = ({ previsionLabel }) => {
  let size = Object.keys(previsionLabel).length;
  const { t, i18n } = useTranslation();

  const frequenciaLabel = () => {
    let freqArray = [];
    for (let i = 0; i < size; i++) {
      //console.log(previsionLabel[i], "CICLO");
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
        topLabelComponent: () => (
          <Text style={{ color: "black", fontSize: 18, marginBottom: 6 }}>
            {String(freqArray.filter((x) => x === "positive").length)}
          </Text>
        ),

        frontColor: "#7dc4e3",
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
      frontColor="#0e7fe5"
      data={frequenciaLabel()}
      yAxisThickness={0}
      xAxisThickness={0}
      initialSpacing={10}
    />
  );
};

export default LabelsOcurrence;
