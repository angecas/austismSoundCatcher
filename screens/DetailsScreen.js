import React, { useState, useEffect, useRef } from "react";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

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
  let toastText =
    "This graph describes the peak that each label reached in all collected sound samples.";
  let toastText1 =
    " This graph displays the average prevision percentage that each label presented in all the collected sound samples. ";
  let toastText2 =
    "This graph shows how many times each label had the highest prevision perncentage in all collected sound samples.";
  const showToast = () => {
    Toast.show({
      type: "tomatoToast",
      text1: toastText,
      text2: "This is some something 👋",
    });
  };
  const showToast1 = () => {
    Toast.show({
      type: "tomatoToast",
      text1: toastText1,
      text2: "This is some something 👋",
    });
  };

  const showToast2 = () => {
    Toast.show({
      type: "tomatoToast",
      text1: toastText2,
      text2: "This is some something 👋",
    });
  };
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
        <View style={{ marginTop: 30, alignItems: "center" }}>
          <TouchableOpacity onPress={showToast}>
            <Image
              style={{
                width: 25,
                height: 25,
                resizeMode: "contain",
                marginRight: 5,
              }}
              source={require("../src/pngs/info2.png")}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "600",
              marginTop: 10,
            }}
          >
            Highest Prevision x Label
          </Text>
        </View>
        <View
          style={{
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <HighestPercentage previsionLabel={previsionLabel} />
        </View>

        <View style={{ alignItems: "center", marginTop: 40 }}>
          <TouchableOpacity onPress={showToast1}>
            <Image
              style={{
                width: 25,
                height: 25,
                resizeMode: "contain",
                marginRight: 5,
              }}
              source={require("../src/pngs/info2.png")}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 20,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "600",
            }}
          >
            Average Global Prevision x Label
          </Text>
        </View>
        <View
          style={{
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <LineChartPrev previsionLabel={previsionLabel} />
        </View>

        <View
          style={{
            margin: 2,
            marginBottom: 10,
          }}
        >
          <View
            style={{
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <TouchableOpacity onPress={showToast2}>
              <Image
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: "contain",
                  marginRight: 5,
                }}
                source={require("../src/pngs/info2.png")}
              />
            </TouchableOpacity>
            <Text style={{ textAlign: "center", fontSize: 20, marginTop: 10 }}>
              Overall Label Ocurrences x Label
            </Text>
          </View>
          <View
            style={{
              marginBottom: 90,
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <LabelsOcurrence previsionLabel={previsionLabel} />
          </View>
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
