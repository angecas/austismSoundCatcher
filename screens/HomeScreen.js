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
import PrevisionTable from "../components/PrevisionTable";
import react from "react";
import MatrixModal from "../components/MatrixModal";
import DetailsScreen from "./DetailsScreen";
import Rings from "../components/Rings";

const screen = Dimensions.get("screen");

function HomeScreen({ navigation }) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const modalizeRef = useRef(null);
  const funRef = useRef(null);
  const [recording, setRecording] = React.useState();
  const [path, setPath] = React.useState(true);
  const [prev, setPrev] = React.useState("");
  const [disable, setDisable] = React.useState(false);
  const [load, setLoad] = React.useState(false);
  const [stream, setStream] = React.useState(true);
  const [sample, setSample] = React.useState(0);
  const [countdown, setCountdown] = react.useState(false);
  const [mic, setMic] = react.useState(false);
  const [ringWaves, setRingWaves] = react.useState(false);
  const [listagem, setListagem] = React.useState([]);
  let smp = 0;
  let list = [];
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
      setPrev(json.label);

      setSample(smp);
      list.push(json.label);

      setListagem(list);
    } catch (err) {
      alert(err, "Alert Title");
    }
    setLoad(false);
  };
  console.log(listagem, "LISTAGEM");

  useEffect(() => {
    try {
      if (!stream) {
        funRef.current = setInterval(async () => {
          await Audio.requestPermissionsAsync();
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          });
          setMic(true);

          const recording = new Audio.Recording();

          await recording.prepareToRecordAsync(
            Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
          );
          await recording.startAsync();

          setRecording(recording);
          setCountdown(true);
          console.log("Recording started");
          setTimeout(async () => {
            console.log("entrou");
            console.log(disable);
            console.log("Stopping recording..");
            setRecording(undefined);
            recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            console.log("Recording stopped and stored at", uri);
            setMic(false);
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
    setRingWaves(true);
    //setSeconds(sec);
    //setStartToggle(false);
    console.log("steam passou  a falso");
    setStream(false);
  };

  const stopTimer = () => {
    setRingWaves(false);
    //setSeconds(sec);
    //setStartToggle(true);
    console.log("steam passou  a true");

    setStream(true);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
      <ScrollView>
        <View style={{ alignItems: "center", marginTop: 80 }}>
          {mic ? <Rings /> : <></>}
          {mic ? (
            <Mic height={50} width={50} fill={"red"} />
          ) : (
            <Mic height={50} width={50} fill={"black"} />
          )}
        </View>
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <View style={styles.loader}>
            {load === true ? <PacmanIndicator color="orange" /> : <></>}
            {/*{countdown ? (
              <CountDown
                id={String(sample)}
                until={5}
                onFinish={() => console.log("finish")}
                onPress={() => console.log("pressed")}
                size={20}
                timeToShow={["M", "S"]}
                timeLabels={{ m: null, s: null }}
                showSeparator
              />
            ) : (
              <></>
            )}*/}
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

        {sample != 0 ? (
          <Text
            style={{
              marginTop: 5,
              fontSize: 14,
              color: "#333533",
              textAlign: "center",
            }}
          >
            Sample: {sample}
          </Text>
        ) : (
          <></>
        )}
        {sample != 0 ? (
          <Text
            style={{
              marginTop: 5,
              fontSize: 14,
              color: "#333533",
              textAlign: "center",
            }}
          >
            Overall Classification: {prev.previsionLabel}
          </Text>
        ) : (
          <></>
        )}
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
        {sample != 0 ? (
          <TouchableOpacity onPress={onOpen}>
            <Text
              style={{
                color: "white",
              }}
            >
              more info
            </Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>

      <Modalize ref={modalizeRef} snapPoint={400} modalHeight={400}>
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
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("DetailsScreen", {
            previsionLabel: listagem,
          });
        }}
      >
        <Text>MUDAR O ECRA</Text>
      </TouchableOpacity>

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

export default HomeScreen;
