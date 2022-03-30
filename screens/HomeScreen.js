import React, { useState, useEffect, useRef } from "react";
import { Audio } from "expo-av";
import Toast from "react-native-toast-message";
import WavyHeader from "../components/WavyHeader";
import AnimatedEllipsis from "react-native-animated-ellipsis";

import Mic from "../src/icones/icon_mic2.svg";
import Pause from "../src/icones/mono-player-stop.svg";
import Rec from "../src/icones/mono-krec-record.svg";

import Record from "../src/svgs/reco.svg";
import StopRecord from "../src/svgs/13714618201553666702.svg";

//import { FloatingMenu } from "react-native-floating-action-menu";
import ActionButton from "react-native-circular-action-menu";
import Icon from "react-native-vector-icons/Ionicons";

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
import RingWaves from "../components/RingWaves";
import Classifying from "../components/Classifying";

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

  function onOpen() {
    modalizeRef.current?.open();
  }

  const onClose = () => {
    modalizeRef.current?.close();
  };

  const [startBut, setStartBut] = useState(true);

  const [descriptiveText, setDescriptiveText] = useState(true);

  const [iconeInfo, setIconeInfo] = useState(true);

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
    setStream(false);

    console.log(stream);
  };

  const stopTimer = () => {
    setRingWaves(false);
    setStream(true);
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        //justifyContent: "flex-end",
      }}
    >
      <View style={{ justifyContent: "flex-end", flex: 1 }}>
        <View
          style={{
            flex: 0.5,
            alignSelf: "center",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <RingWaves iconeInfo={iconeInfo} />
        </View>
        <Classifying loading={true} />
        <View
          style={{
            backgroundColor: "#14213d",
            flex: 0.7,
            //borderRadius: 50,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            borderWidth: 1,
            elevation: 15,
            justifyContent: "space-around",
          }}
        >
          {descriptiveText ? (
            <View
              style={{
                alignItems: "center",
                height: 60,
              }}
            >
              <Text style={{ color: "#D3D3D3" }}> Sample 1</Text>
              <Text style={{ color: "#D3D3D3" }}>
                Overall classification: negative
              </Text>
            </View>
          ) : (
            <View
              style={{
                alignItems: "center",
                height: 60,
              }}
            />
          )}

          <View
            style={{
              alignItems: "center",
              marginBottom: 100,
            }}
          >
            {stream ? (
              <TouchableOpacity onPress={startTimer}>
                <StopRecord height={70} width={70} fill={"red"} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={stopTimer}>
                <Record height={70} width={70} fill={"red"} />
              </TouchableOpacity>
            )}
          </View>
          <ActionButton buttonColor="rgba(231,76,60,1)">
            <ActionButton.Item
              buttonColor="rgba(231,76,60,1)"
              title="sample info"
              onPress={onOpen}
            >
              <Image
                source={require("../src/pngs/lupa.png")}
                style={{ width: 20, height: 20 }}
              />
            </ActionButton.Item>

            <ActionButton.Item
              buttonColor="rgba(231,76,60,1)"
              title="resume classification"
              onPress={() => {
                navigation.navigate("DetailsScreen", {
                  previsionLabel: listagem,
                });
              }}
            >
              <Image
                source={require("../src/pngs/graph.png")}
                style={{ width: 20, height: 20 }}
              />
            </ActionButton.Item>
          </ActionButton>
          <Modalize ref={modalizeRef} snapPoint={400} modalHeight={400}>
            <View
              style={{
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
        </View>
      </View>
    </View>
  );
}
export default HomeScreen;
