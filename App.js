// import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { Audio } from "expo-av";
import Toast from "react-native-toast-message";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import AnimatedProgressWheel from "react-native-progress-wheel";

import Mic from "./src/icones/icon_mic2.svg";
import Pause from "./src/icones/mono-player-stop.svg";
import Rec from "./src/icones/mono-krec-record.svg";

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

import { Modalize } from "react-native-modalize";
import {
  GestureHandlerRootView,
  GestureHandlerRootHOC,
} from "react-native-gesture-handler";

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
import PrevisionTable from "./components/PrevisionTable";
import react from "react";
import MatrixModal from "./components/MatrixModal";

const screen = Dimensions.get("screen");

export default function App() {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const modalizeRef = useRef(null);
  const funRef = useRef(null);

  const [start, setStartToggle] = useState(true);

  const [recording, setRecording] = React.useState();
  const [path, setPath] = React.useState(true);
  const [prev, setPrev] = React.useState("");
  const [disable, setDisable] = React.useState(false);
  const [load, setLoad] = React.useState(false);
  const [stop, setStop] = React.useState(false);
  const [stream, setStream] = React.useState(true);
  const [sample, setSample] = React.useState(0);

  let smp = 0;

  const toastConfig = {
    tomatoToast: () => (
      <View style={{ height: 60, width: "100%", backgroundColor: "tomato" }}>
        <Text> oioioioi </Text>
      </View>
    ),
  };

  const showToast = () => {
    Toast.show({
      type: "tomatoToast",
    });
  };

  function onOpen() {
    modalizeRef.current?.open();
  }

  const onClose = () => {
    modalizeRef.current?.close();
  };

  const uploadAudio = async (path) => {
    smp += 1;
    const formData = new FormData();
    formData.append("file", {
      uri: path,
      name: "audio.wav",
      type: "audio/wav",
    });
    try {
      setLoad(true);
      const res = await fetch("http://10.0.2.2:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      const json = await res.json();
      console.log(json);
      setPrev(json.label);
      setSample(smp);
      console.log("PREVVVV", prev);
    } catch (err) {
      alert(err, "Alert Title");
    }
    setLoad(false);
  };

  useEffect(() => {
    try {
      if (!stream) {
        funRef.current = setInterval(async () => {
          await Audio.requestPermissionsAsync();
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          });

          const recording = new Audio.Recording();

          await recording.prepareToRecordAsync(
            Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
          );
          await recording.startAsync();
          setRecording(recording);
          console.log("Recording started");
          setTimeout(async () => {
            console.log("entrou");
            console.log(disable);
            console.log("Stopping recording..");
            setRecording(undefined);
            recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            console.log("Recording stopped and stored at", uri);
            setPath(uri);
            uploadAudio(uri);

            console.log("sai");
          }, 5000);
        }, 7000);
      } else {
        clearInterval(funRef.current);
      }
    } catch (err) {
      alert(err, "Alert Titleeeeeeeeeeeeeeeee");
    }
  }, [stream]);

  const startTimer = () => {
    //setSeconds(sec);
    //setStartToggle(false);
    console.log("steam passou  a falso");
    setStream(false);
  };

  const stopTimer = () => {
    //setSeconds(sec);
    //setStartToggle(true);
    console.log("steam passou  a true");

    setStream(true);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#333533",
            paddingLeft: 10,
            paddingRight: 10,
            //borderBottomColor: "black",
            //borderBottonWidth: 5,
            borderWidth: 1,
            height: 70,
            elevation: 30,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 22,
              fontWeight: "600",
              color: "white",
            }}
          >
            Sound Classification
          </Text>
        </View>
        <View style={{ alignItems: "center", marginTop: 80 }}>
          <Mic height={100} width={100} fill={"black"} />
        </View>
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <View style={styles.loader}>
            {load === true ? (
              <PacmanIndicator color="orange" />
            ) : (
              <Text style={{ fontSize: 40 }}>00:03</Text>
            )}
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            margin: 30,
          }}
        >
          {stream ? (
            <TouchableOpacity style={{ margin: 10 }} onPress={startTimer}>
              <Rec width={70} height={70} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={{ margin: 10 }} onPress={stopTimer}>
              <Pause width={70} height={70} />
            </TouchableOpacity>
          )}
        </View>
        <Text
          style={{
            marginTop: 5,
            fontSize: 14,
            color: "#333533",
            textAlign: "center",
          }}
        >
          Sample:
        </Text>
        <Text
          style={{
            marginTop: 5,
            fontSize: 14,
            color: "#333533",
            textAlign: "center",
          }}
        >
          Overall Classification:
        </Text>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#333533",
          paddingLeft: 10,
          paddingRight: 10,
          //borderBottomColor: "black",
          //borderBottonWidth: 5,
          borderWidth: 1,
          height: 55,
          elevation: 30,
          justifyContent: "center",
        }}
      >
        <TouchableOpacity onPress={onOpen}>
          <Text
            style={{
              color: "white",
            }}
          >
            more info
          </Text>
        </TouchableOpacity>
      </View>

      <Modalize ref={modalizeRef} snapPoint={350} modalHeight={350}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PrevisionTable
            previsionResults={prev}
            sample={sample}
          ></PrevisionTable>
        </View>

        <View style={{ flex: 1, flexDirection: "row-reverse" }}>
          <TouchableOpacity
            style={{
              width: 120,
              height: 30,
              justifyContent: "flex-end",
              elevation: 8,
              backgroundColor: "#40798c",
              borderColor: "#fcfdfb",
              borderWidth: 2,
              outlineColor: "#523009",
              outlineStyle: "solid",
              borderRadius: 7,
              margin: 5,
              justifyContent: "center",
            }}
            onPress={onClose}
          >
            <Text
              style={{
                alignSelf: "center",
                fontWeight: "bold",
                color: "white",
              }}
            >
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </Modalize>
      <Text style={{ color: "orange", fontSize: 35, marginTop: 35 }}>
        {prev.previsionLabel}
      </Text>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderWidth: 10,
    borderColor: "#89aaff",
    width: 200,
    height: 100,
    borderRadius: screen.width / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 40,
    color: "#89aaff",
    fontWeight: "bold",
  },
  loader: {
    color: "orange",
    flex: 0.1,
    bottom: 30,
  },
});
