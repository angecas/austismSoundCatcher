import React, { useState, useEffect, useRef } from "react";

import { CommonActions } from "@react-navigation/native";
import {
  Image,
  Text,
  View,
  Button,
  Dimensions,
  ScrollView,
  TouchableOpacity,
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
          <View
            style={{
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Image
              style={{
                width: 25,
                height: 25,
                resizeMode: "contain",
                marginRight: 5,
              }}
              source={require("../src/pngs/info2.png")}
            />
            <Text
              style={{ textAlign: "center", fontSize: 20, fontWeight: "600" }}
            >
              Highest Prevision x Label
            </Text>
          </View>

          <HighestPercentage previsionLabel={previsionLabel} />
        </View>
        <View style={{ margin: 2, marginBottom: 10, marginTop: 14 }}>
          <View
            style={{
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            <Image
              style={{
                width: 25,
                height: 25,
                resizeMode: "contain",
                marginRight: 5,
              }}
              source={require("../src/pngs/info2.png")}
            />
            <Text
              style={{ textAlign: "center", fontSize: 20, fontWeight: "600" }}
            >
              Average Global Prevision x Label
            </Text>
          </View>
          <LineChartPrev previsionLabel={previsionLabel} />
        </View>
        <View
          style={{
            margin: 2,
            marginBottom: 10,
            marginTop: 14,
          }}
        >
          <View
            style={{
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Image
              style={{
                width: 25,
                height: 25,
                resizeMode: "contain",
                marginRight: 5,
              }}
              source={require("../src/pngs/info2.png")}
            />
            <Text style={{ textAlign: "center", fontSize: 20 }}>
              Overall Label Ocurrences x Label
            </Text>
          </View>
          <LabelsOcurrence previsionLabel={previsionLabel} />
        </View>
      </ScrollView>

      <View
        style={{
          borderColor: "#e1e8ea",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderWidth: 1,
          width: "100%",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ margin: 5, marginTop: 10 }}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(resetAction)}
            style={{
              borderRadius: 8,
              backgroundColor: "#0e7fe5",
              height: 35,
              width: 300,
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
              New Classification
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ margin: 5 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={{
              borderRadius: 8,
              backgroundColor: "#0e7fe5",
              height: 35,
              width: 300,
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
              Keep Classifying
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DetailsScreen;
