import React, { useState, useEffect, useRef } from "react";
import { Audio } from "expo-av";
import BottomSheet from "react-native-gesture-bottom-sheet";
import { CommonActions } from "@react-navigation/native";

import Record from "../src/svgs/newstart.svg";
import StopRecord from "../src/svgs/newpause.svg";

import NewMic from "../src/svgs/newmic.svg";

//import { FloatingMenu } from "react-native-floating-action-menu";
import ActionButton from "react-native-circular-action-menu";

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
  const ref = useRef(null);
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
  const [ovPerSamp, setOvPerSamp] = React.useState([]);
  const bottomSheet = useRef();
  const [on, setOn] = React.useState(false);

  const [firstRender, setFirstRender] = React.useState(true);

  let smp = 0;
  let list = [];

  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{ name: "Home" }],
  });

  let teste = new Map();
  const toastConfig = {
    tomatoToast: () => (
      <View style={{ height: 60, width: "100%", backgroundColor: "tomato" }}>
        <Text> oioioioi </Text>
      </View>
    ),
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
      const res = await fetch(
        "http://mivbox.di.uminho.pt:36554/angelica/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );
      const json = await res.json();
      setPrev(json.label);
      setSample(smp);
      teste.set(smp, prev.previsionLabel);
      list.push(json.label);

      setOvPerSamp(teste);
      setListagem(list);
    } catch (err) {
      alert(err, "Alert Title");
    }
    setLoad(false);
  };

  /*
  useEffect(() => {
    if (!stream) {
      funRef.current = setInterval(async () => {
        await Audio.requestPermissionsAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        setMic(true);

        try {
          const recording = new Audio.Recording();

          await recording.prepareToRecordAsync(
            Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
          );
          await recording.startAsync();
          console.log("Recording started");

          setRecording(
            recording,
            setTimeout(async () => {
              setRecording(undefined);
              recording.stopAndUnloadAsync();
              const uri = recording.getURI();
              console.log("Recording stopped and stored at", uri);
              setMic(false);
              setPath(uri);
              uploadAudio(uri);
            }, 5000)
          );
        } catch (err) {
          alert(err);
        }
      }, 8000);
    } else {
      clearInterval(funRef.current);
    }
  }, [stream]);

  */

  useEffect(() => {
    if (!stream) {
      ref.current = setTimeout(repeatingFunc, 1000);
    }

    return () => clearTimeout(ref.current);
  }, [stream]);

  // clear timeout on component dismount

  async function repeatingFunc() {
    console.log("It's been 5 seconds. Execute the function again.");
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });
    setMic(true);

    try {
      const recording = new Audio.Recording();

      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      console.log("Recording started");

      setRecording(
        recording,
        setTimeout(async () => {
          setRecording(undefined);
          recording.stopAndUnloadAsync();
          const uri = recording.getURI();
          console.log("Recording stopped and stored at", uri);
          setMic(false);
          setPath(uri);
          uploadAudio(uri);
        }, 5000)
      );
      console.log("TERMINOU DE FZER O AUDIO");
    } catch (err) {
      alert(err);
    }

    console.log("VAI CORRER DE NOVO");

    ref.current = setTimeout(repeatingFunc, 6000);
  }

  //----------------------------------

  const startTimer = () => {
    setRingWaves(true);
    setStream(false);
    setOn(true);

    console.log(stream);
  };

  const stopTimer = () => {
    setRingWaves(false);
    setStream(true);
    setOn(false);
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
          {!on ? (
            /*<Image
              style={{
                width: 65,
                height: 65,
                resizeMode: "contain",
              }}
              source={require("../src/icones/voice5.png")}
            />*/

            <NewMic height={120} width={120}></NewMic>
          ) : (
            <RingWaves iconeInfo={mic} />
          )}
        </View>
        {load === true ? (
          <View style={{ height: 50 }}>
            <Classifying loading={true} />
          </View>
        ) : (
          <View style={{ height: 50 }}>
            <></>
          </View>
        )}
        <View
          style={{
            backgroundColor: "#0e7fe5",
            borderColor: "#0e7fe5",
            flex: 0.6,
            //borderRadius: 50,
            borderTopLeftRadius: 80,
            borderTopRightRadius: 80,
            borderWidth: 1,
            elevation: 15,
            justifyContent: "space-around",
          }}
        >
          {sample != 0 ? (
            <View
              style={{
                alignItems: "center",
                height: 60,
                marginTop: 14,
              }}
            >
              <Text
                style={{ color: "#ffffff", fontSize: 18, fontFamily: "roboto" }}
              >
                {" "}
                Sample {sample}
              </Text>
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 14,
                  marginTop: 12,
                  fontFamily: "roboto",
                }}
              >
                Overall classification: {prev.previsionLabel}
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
                <Record height={110} width={110} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={stopTimer}>
                <StopRecord height={110} width={110} />
              </TouchableOpacity>
            )}

            {stream === true ? (
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  setFirstRender(true);
                  console.log("hope");
                  setStream(true, navigation.dispatch(resetAction));
                }}
              >
                <Text style={{ color: "white" }}>New Classification?</Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>

          {sample === 0 ? (
            <ActionButton buttonColor="#0e7fe5" />
          ) : (
            <ActionButton buttonColor="white" btnOutRange="white">
              <ActionButton.Item
                buttonColor="white"
                title="sample info"
                onPress={() => {
                  bottomSheet.current.show();
                }}
              >
                <Image
                  source={require("../src/pngs/lupa.png")}
                  style={{ width: 20, height: 20 }}
                />
              </ActionButton.Item>

              <ActionButton.Item
                buttonColor="white"
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
          )}

          <BottomSheet
            hasDraggableIcon
            ref={bottomSheet}
            height={350}
            sheetBackgroundColor={"#ffffff"}
          >
            <View
              style={{
                alignItems: "center",
                backgroundColor: "#ffffff",
              }}
            >
              <PrevisionTable
                previsionResults={prev}
                sample={sample}
              ></PrevisionTable>
            </View>
          </BottomSheet>
        </View>
      </View>
    </View>
  );
}
export default HomeScreen;
