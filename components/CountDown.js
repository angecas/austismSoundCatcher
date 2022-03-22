// import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const screen = Dimensions.get("screen");

const CountDown = ({ startTimer, stopTimer }) => {
  const [seconds, setSeconds] = useState(11);
  const funRef = useRef(null);
  const [start, setStartToggle] = useState(true);

  const getRemaining = () => {
    const minute = Math.floor(seconds / 60);
    const second = seconds - minute * 60;
    return formatTime(minute) + ":" + formatTime(second);
  };

  const formatTime = (time) => {
    return ("0" + time).slice(-2);
  };
  let sec = seconds;
  useEffect(() => {
    // let timer = null;

    if (!start) {
      let sec = seconds;
      funRef.current = setInterval(() => {
        console.log("Seconds remaining:", sec);
        if (sec <= 0) {
          clearInterval(funRef.current);
          setStartToggle(true);
        }
        setSeconds(sec--);
      }, 1000);
    } else {
      clearInterval(funRef.current);
    }
  }, [start]);

  const startTimer = () => {
    setSeconds(sec);
    setStartToggle(false);
  };

  const stopTimer = () => {
    setSeconds(sec);
    setStartToggle(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text
        style={
          seconds ? styles.timerText : [styles.timerText, { color: "red" }]
        }
      >
        {getRemaining(seconds)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07121B",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderWidth: 10,
    borderColor: "#89aaff",
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 40,
    color: "#89aaff",
    fontWeight: "bold",
  },

  timerText: {
    fontSize: 90,
    color: "#89aaff",
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default CountDown;
