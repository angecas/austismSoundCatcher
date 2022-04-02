import React, { useState, useEffect, useRef } from "react";

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
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
      }}
    >
      <ScrollView>
        <View style={{ margin: 2, marginTop: 14, marginBottom: 10 }}>
          <Text
            style={{ textAlign: "center", fontSize: 20, fontWeight: "600" }}
          >
            Highest Prevision x Label
          </Text>
          <HighestPercentage previsionLabel={previsionLabel} />
        </View>
        <View style={{ margin: 2, marginBottom: 10, marginTop: 14 }}>
          <Text
            style={{ textAlign: "center", fontSize: 20, fontWeight: "600" }}
          >
            Average Global Prevision x Label
          </Text>
          <LineChartPrev previsionLabel={previsionLabel} />
        </View>
        <View
          style={{
            margin: 2,
            marginBottom: 10,
            marginTop: 14,
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 20 }}>
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
            onPress={() => navigation.navigate("Home")}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailsScreen;
