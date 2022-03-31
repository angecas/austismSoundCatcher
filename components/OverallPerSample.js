import { LineChart } from "react-native-gifted-charts";
import { View, Text } from "react-native";
import React, { useState, useEffect, useRef } from "react";

const OverallPerSample = ({ overallPerSamp }) => {
  console.log(overallPerSamp, "whattt");
  let size = Object.keys(overallPerSamp).length;

  let graphResponse = [];
  for (let [key, value] of overallPerSamp) {
    let obj = { value: key, label: value };
    graphResponse.push(obj);
    console.log(graphResponse, "GRAPH RESPONSEEE");
  }

  console.log(graphResponse, "GRAPH RESPONSEEE");
  const overallPerSample = () => {
    let graphResponse = [];
    for (let [key, value] of overallPerSamp) {
      let obj = { value: key, label: value };
      graphResponse.push(obj);
    }
    return graphResponse;
  };

  return (
    <LineChart
      data={overallPerSample()}
      showTextOnPress
      pressEnabled
      isAnimated={true}
      spacing={80}
    />
  );
};

export default OverallPerSample;
