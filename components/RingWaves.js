import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import Mic from "../src/icones/icon_mic2.svg";
import NewMic2 from "../src/svgs/newmic2.svg";

const Ring = ({ delay }) => {
  const ring = useSharedValue(0);

  const ringStyle = useAnimatedStyle(() => {
    return {
      opacity: 0.8 - ring.value,
      transform: [
        {
          scale: interpolate(ring.value, [0, 1], [0, 4]),
        },
      ],
    };
  });
  useEffect(() => {
    ring.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration: 4000,
        }),
        -1,
        false
      )
    );
  }, []);
  return <Animated.View style={[styles.ring, ringStyle]} />;
};

export default function RingWaves({ iconeInfo }) {
  return (
    <View
      style={{
        //flex: 1,
        alignItems: "center",
        justifyContent: "center",
        //flexDirection: "column",
      }}
    >
      {iconeInfo ? (
        <>
          {/*
          <Image
            style={{
              width: 65,
              height: 65,
              resizeMode: "contain",
            }}
            source={require("../src/icones/voice2.png")}
          /> */}

          <NewMic2 height={120} width={120}></NewMic2>
          <Ring delay={0} />
          <Ring delay={1000} />
          <Ring delay={2000} />
          <Ring delay={3000} />
        </>
      ) : (
        <NewMic2 height={120} width={120}></NewMic2>
      )}
      {/*<Mic height={50} width={50} />*/}
    </View>
  );
}

const styles = StyleSheet.create({
  ring: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 40,
    borderColor: "#09eafe",
    borderWidth: 6,
  },
});
