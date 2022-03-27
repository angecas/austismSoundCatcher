import { LineChart } from "react-native-gifted-charts";
import { View, Text } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { BarChart, PieChart } from "react-native-gifted-charts";

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
      },
      {
        value: freqArray.filter((x) => x === "negative").length,
        label: "negative",
        frontColor: "#177AD5",
      },
      {
        value: freqArray.filter((x) => x === "positive").length,
        label: "positive",
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
      frontColor="lightgray"
      data={frequenciaLabel()}
      yAxisThickness={0}
      xAxisThickness={0}
    />
  );
};

export default LabelsOcurrence;
