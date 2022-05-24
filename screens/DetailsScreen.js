import React from "react";
import Toast from "react-native-toast-message";
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

  let toastText = t("graphToast");
  let toastText1 = t("graphToast2");
  let toastText2 = t("graphToast3");
  const showToast = () => {
    Toast.show({
      type: "graphToast",
      text1: toastText,
    });
  };
  const showToast1 = () => {
    Toast.show({
      type: "graphToast",
      text1: toastText1,
    });
  };

  const showToast2 = () => {
    Toast.show({
      type: "graphToast",
      text1: toastText2,
    });
  };
  const { previsionLabel } = route.params;

  return (
    <View
      style={{
        flex: 1,
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
