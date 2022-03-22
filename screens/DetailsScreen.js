import React, { useState, useEffect, useRef } from "react";
import { Audio } from "expo-av";
import Toast from "react-native-toast-message";

import Mic from "../src/icones/icon_mic2.svg";
import Pause from "../src/icones/mono-player-stop.svg";
import Rec from "../src/icones/mono-krec-record.svg";

import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from "react-native-indicators";

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

const DetailsScreen = ({ delay }) => {
  return (
    <View>
      <Text>oiii</Text>
    </View>
  );
};

export default DetailsScreen;
