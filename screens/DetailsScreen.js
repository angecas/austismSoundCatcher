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
        <View style={{ margin: 2, marginBottom: 10 }}>
          <Text>
            a percentagem mais alta detetada de cada label na amostra total
          </Text>
          <Text
            style={{ textAlign: "center", fontSize: 20, fontWeight: "600" }}
          >
            Highest Prevision (%) x Label
          </Text>
          <HighestPercentage previsionLabel={previsionLabel} />
        </View>
        <View style={{ margin: 2, marginBottom: 10 }}>
          <Text>média das percentagens de previsao de cada label</Text>
          <Text
            style={{ textAlign: "center", fontSize: 20, fontWeight: "600" }}
          >
            Average Global Prevision (%) x Label
          </Text>
          <LineChartPrev previsionLabel={previsionLabel} />
        </View>
        <View style={{ margin: 2, marginBottom: 10 }}>
          <Text>Quantas vezes cada label aparece</Text>
          <Text
            style={{ textAlign: "center", fontSize: 20, fontWeight: "600" }}
          >
            Overall Label Ocurrences x Label
          </Text>
          <LabelsOcurrence previsionLabel={previsionLabel} />
        </View>

        <View style={{ margin: 2, marginTop: 40 }}>
          <Button
            title="New Classification"
            onPress={() => navigation.dispatch(resetAction)}
          />
        </View>
        <View style={{ margin: 2, marginTop: 20 }}>
          <Button
            title="Keep Classifying"
            onPress={() => navigation.dispatch(resetAction)}
          />
        </View>

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
