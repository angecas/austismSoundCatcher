// import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { Audio } from "expo-av";
import Toast from "react-native-toast-message";

import {
  StyleSheet,
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

import DetailsScreen from "./screens/DetailsScreen";

const screen = Dimensions.get("screen");

const Stack = createNativeStackNavigator();

export default function App() {
  const toastConfig = {
    tomatoToast: ({ text1, props }) => (
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
            Sample Info{" "}
          </Text>
        </View>
        <View
          style={{
            height: 70,
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
          <Text style={{ margin: 12 }}> {text1} </Text>
        </View>
      </View>
    ),
  };

  return (
    <NavigationContainer>
      <StatusBar
        translucent
        barStyle="dark-content"
        //  backgroundColor="rgba(0, 0, 0, 0.251)"
        backgroundColor="white"
      />
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Classification",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 24,
              fontFamily: "roboto",
              fontWeight: "600",
            },
          }}
        />
        <Stack.Screen name="TESTES" component={Example} />

        <Stack.Screen
          name="DetailsScreen"
          component={DetailsScreen}
          options={{
            title: "Statistics",
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
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
}
