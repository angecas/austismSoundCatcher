// import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { Audio } from "expo-av";
import Toast from "react-native-toast-message";

import { checkConnected } from "./functions";

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
import NetInfo from "@react-native-community/netinfo";
import { useNetInfo } from "@react-native-community/netinfo";
import DetailsScreen from "./screens/DetailsScreen";

const screen = Dimensions.get("screen");

const Stack = createNativeStackNavigator();

export default function App() {
  const [connectStatus, setConnectStatus] = useState(false);

  checkConnected().then((res) => {
    setConnectStatus(res);
  });

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
          <Text style={{ margin: 12 }}> {text1} </Text>
        </View>
      </View>
    ),

    internetToast: ({ text1, props }) => (
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
            source={require("./src/pngs/warning.png")}
          ></Image>
          <Text style={{ fontWeight: "700", color: "white" }}>Warning</Text>
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
          <Text style={{ margin: 12 }}>
            Verify your internet connection to proceed with the classification.
          </Text>
        </View>
      </View>

      /*
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
          borderColor: "black",
          elevation: 14,
          borderWidth: 2,
          borderRadius: 8,
          opacity: 0.8,
        }}
      >
        <Image
          style={{
            alignSelf: "flex-start",
            height: 25,
            width: 25,
            marginRight: 5,
          }}
          source={require("./src/pngs/warn.png")}
        ></Image>
        <Text
          style={{
            fontWeight: "700",
            color: "white",
            marginTop: 4,
            marginBottom: 2,
            marginLeft: 16,
            marginRight: 16,
          }}
        >
          No internet connection.
        </Text>
        <Text
          style={{
            fontWeight: "700",
            color: "white",
            marginTop: 4,
            marginBottom: 16,
            marginLeft: 16,
            marginRight: 16,
          }}
        >
          Please, connect to classify.
        </Text>
      </View>*/
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

      {/*
      {connectStatus ? (
        <View>
          <Text>on? </Text>
        </View>
      ) : (
        <View>
          <Text>off?</Text>
        </View>
      )} */}
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
}
