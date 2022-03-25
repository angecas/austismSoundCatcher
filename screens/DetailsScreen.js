import React, { useState, useEffect, useRef } from "react";

import { BarChart, PieChart } from "react-native-gifted-charts";

import { CommonActions } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  ScrollView,
} from "react-native";
import LineChartPrev from "../components/LineChart";

const screenWidth = Dimensions.get("window").width;

const DetailsScreen = ({ navigation, route }) => {
  const { previsionLabel } = route.params;

  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{ name: "Home" }],
  });

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

  highestPercentage();

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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ScrollView>
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
        <LineChartPrev previsionLabel={previsionLabel} />

        {/*
        <Button
          title="Go to Details... again"
          onPress={() =>
            navigation.push("DetailsScreen", {
              itemId: Math.floor(Math.random() * 100),
            })
          }
        />
        <Button
          title="Go to Home"
          onPress={() => navigation.dispatch(resetAction)}
        />
        <Button title="Go back" onPress={() => navigation.goBack()} /> */}
      </ScrollView>
    </View>
  );
};

export default DetailsScreen;
