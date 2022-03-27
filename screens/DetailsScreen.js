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
import HighestPercentage from "../components/HighestPercentage";
import LabelsOcurrence from "../components/LabelsOcurrence";

const screenWidth = Dimensions.get("window").width;

const DetailsScreen = ({ navigation, route }) => {
  const { previsionLabel } = route.params;

  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{ name: "Home" }],
  });
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ScrollView>
        <HighestPercentage previsionLabel={previsionLabel} />
        <LineChartPrev previsionLabel={previsionLabel} />

        <LabelsOcurrence previsionLabel={previsionLabel} />

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
