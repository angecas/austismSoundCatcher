import React, { useState, useEffect, useRef } from "react";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation();

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

  return (
    <View
      style={{
        flex: 1,
        //alignItems: "center", // tirar?
        //justifyContent: "center", // tirar?

        backgroundColor: "#ffffff",
      }}
    >
      <ScrollView>
        <View
          style={{
            marginTop: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: "600",
            marginTop: 10,
          }}
        >
          {t("HighestPrevisionXLabel")}
        </Text>

        <View
          style={{
            alignContent: "center",
            justifyContent: "center",

            alignItems: "center",
            marginLeft: 90,
          }}
        >
          <HighestPercentage previsionLabel={previsionLabel} />
        </View>

        <View
          style={{
            marginTop: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
              marginTop: 10,
            }}
          >
            {t("AverageGlobalPrevisionXLabel")}
          </Text>
        </View>
        <View
          style={{
            alignContent: "center",
            justifyContent: "center",
            marginLeft: 5,
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
          </View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "600",
              marginTop: 10,
            }}
          >
            {t("OverallLabelOcurrencesXLabel")}
          </Text>

          <View
            style={{
              marginBottom: 90,
              marginLeft: 5,
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
        <View style={{ margin: 5 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
            style={{
              borderRadius: 8,
              backgroundColor: "#0e7fe5",
              height: 35,
              width: 300,
              alignContent: "center",
              justifyContent: "center",
              margin: 8,
            }}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
              {t("KeepClassifying")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DetailsScreen;
