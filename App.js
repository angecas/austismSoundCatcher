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
    tomatoToast: () => (
      <View style={{ height: 60, width: "100%", backgroundColor: "tomato" }}>
        <Text> oioioioi </Text>
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
            headerStyle: {
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
            headerTitleAlign: "center",
            headerStyle: {
              fontWeight: "600",
            },
          }}
        />
      </Stack.Navigator>
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
}
