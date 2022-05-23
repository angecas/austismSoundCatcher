// import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import Toast from "react-native-toast-message";
import { Button } from "react-native";
import Modal from "react-native-modal";
import Menu from "./components/Menu";

import { checkConnected } from "./functions";

import {
  StyleSheet,
  AppState,
  Text,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  requireNativeComponent,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import Example from "./screens/TESTES";
import Help from "./screens/Help";

import NetInfo from "@react-native-community/netinfo";
import DetailsScreen from "./screens/DetailsScreen";
import FromDevice from "./screens/FromDevice";
import { useTranslation } from "react-i18next";

const screen = Dimensions.get("screen");
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const Stack = createNativeStackNavigator();

export default function App() {
  const { t, i18n } = useTranslation();
  const [connectStatus, setConnectStatus] = useState(false);
  const [menuState, setMenuState] = useState(false);

  checkConnected().then((res) => {
    setConnectStatus(res);
  });

  const ToggleMenu = () => {
    setMenuState(!menuState);
    console.log(menuState);
  };

  const changeLanguage = () => {
    if (i18n.language === "en") {
      i18n.changeLanguage("pt");
    } else {
      i18n.changeLanguage("en");
    }
  };

  const toastConfig = {
    graphToast: ({ text1 }) => (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0e7fe5",
          borderColor: "#0e7fe5",
          elevation: 14,
          borderWidth: 2,
          borderRadius: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              alignSelf: "flex-start",
              height: 25,
              width: 25,
              marginRight: 5,
            }}
            source={require("./src/pngs/info3.png")}
          ></Image>
          <Text style={{ fontWeight: "700", color: "white" }}>
            {t("SampleInfo")}{" "}
          </Text>
        </View>
        <View
          style={{
            height: 95,
            width: "100%",
            backgroundColor: "white",
            borderRadius: 8,
            borderWidth: 2,
            elevation: 14,
            borderColor: "#0e7fe5",
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ margin: 12, textAlign: "justify" }}> {text1} </Text>
        </View>
      </View>
    ),
    helpPath: () => (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0e7fe5",
          borderColor: "#0e7fe5",
          elevation: 14,
          borderWidth: 2,
          borderRadius: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              alignSelf: "flex-start",
              height: 25,
              width: 25,
              marginRight: 5,
            }}
            source={require("./src/pngs/info3.png")}
          ></Image>
          <Text style={{ fontWeight: "700", color: "white" }}>
            {t("Explanation")}
          </Text>
        </View>
        <View
          style={{
            height: 95,
            width: "100%",
            backgroundColor: "white",
            borderRadius: 8,
            borderWidth: 2,
            elevation: 14,
            borderColor: "#0e7fe5",
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ margin: 12, textAlign: "justify" }}>
            {" "}
            {t("ExplanationText")}{" "}
          </Text>
        </View>
      </View>
    ),

    internetToast: () => (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0e7fe5",
          borderColor: "#0e7fe5",
          elevation: 14,
          borderWidth: 2,
          borderRadius: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              alignSelf: "flex-start",
              height: 25,
              width: 25,
              marginRight: 5,
            }}
            source={require("./src/pngs/withoutwifi.png")}
          ></Image>
          <Text style={{ fontWeight: "700", color: "white" }}>
            {t("Warning")}
          </Text>
        </View>
        <View
          style={{
            height: 95,
            width: "100%",
            backgroundColor: "white",
            borderRadius: 8,
            borderWidth: 2,
            elevation: 14,
            borderColor: "#0e7fe5",
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ margin: 12 }}>{t("verifyInternetConnection")}</Text>
        </View>
      </View>
    ),
  };

  return (
    <NavigationContainer>
      <StatusBar translucent barStyle="dark-content" backgroundColor="white" />

      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: t("Classification"),
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 24,
              fontFamily: "roboto",
              fontWeight: "600",
            },

            headerLeft: () => (
              <TouchableOpacity onPress={ToggleMenu}>
                <Image
                  source={require("./src/pngs/menu.png")}
                  style={{ width: 25, height: 25, margin: 5 }}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="TESTES" component={Example} />
        <Stack.Screen
          name="Help"
          component={Help}
          options={{
            title: t("Help"),
            headerTitleAlign: "center",
          }}
        />

        <Stack.Screen
          name="FromDevice"
          component={FromDevice}
          options={{
            title: t("FromDevice"),
            headerTitleAlign: "center",
          }}
        />

        <Stack.Screen
          name="DetailsScreen"
          component={DetailsScreen}
          options={{
            title: t("Statistics"),
            headerBackVisible: false,
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 24,
              fontFamily: "roboto",
              fontWeight: "600",
            },
          }}
        />
      </Stack.Navigator>
      <Menu
        changeLanguage={changeLanguage}
        isVisible={menuState}
        toggle={ToggleMenu}
        screenName="Help"
      />

      <Toast config={toastConfig} />
    </NavigationContainer>
  );
}
