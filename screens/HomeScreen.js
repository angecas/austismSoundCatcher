import React, { useState, useEffect, useRef } from "react";
import { Audio } from "expo-av";
import BottomSheet from "react-native-gesture-bottom-sheet";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { checkConnected } from "../functions";
import { useTranslation } from "react-i18next";

import Record from "../src/svgs/newstart.svg";
import StopRecord from "../src/svgs/newpause.svg";

import NewMic from "../src/svgs/newmic.svg";

import * as DocumentPicker from "expo-document-picker";

import ActionButton from "react-native-circular-action-menu";

import {
  RefreshControl,
  StyleSheet,
  Modal,
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
import { t } from "i18next";

const screen = Dimensions.get("screen");

function HomeScreen({ navigation }) {
  const { t, i18n } = useTranslation();

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const modalizeRef = useRef(null);
  const funRef = useRef(null);
  const ref = useRef(null);
  const [recording, setRecording] = React.useState();
  const [path, setPath] = React.useState(true);
  const [prev, setPrev] = React.useState("");
  const [load, setLoad] = React.useState(false);
  const [stream, setStream] = React.useState(true);
  const [sample, setSample] = React.useState(0);
  const [mic, setMic] = react.useState(false);
  const [ringWaves, setRingWaves] = react.useState(false);
  const [listagem, setListagem] = React.useState([]);
  const [ovPerSamp, setOvPerSamp] = React.useState([]);
  const bottomSheet = useRef();
  const [on, setOn] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const [overallCalss, setOverallClass] = react.useState("");

  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    wait(2000).then(() => {
      setRefresh(false);
      setStream(true, navigation.dispatch(resetAction));
    });
  }, [refresh]);

  let smp = 0;
  let list = [];

  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{ name: "Home" }],
  });

  let teste = new Map();

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
      //alert(err, "Alert Title");
      console.log(err);
      console.debug(err);
      //showToast();

      checkConnected()
        .then((res) => {
          count.current = res;
        })
        .finally(() => {
          if (count.current) {
            showToast2();
            console.log(count.current, "CURRENT");
          } else {
            showToast();
            console.log(count.current, "CURRENT");
          }
        });
    }
    setLoad(false);
  };

  //net

  /*

  const startTimer = () => {
    checkConnected()
      .then((res) => {
        count.current = res;
        console.log("PRESSEDCONNECT", connect);
      })
      .finally(() => {
        if (count.current) {
          setRingWaves(true);
          setStream(false);
          console.log(stream);
        } else {
          showToast();
        }
      });
  };

  */

  const showToast = () => {
    Toast.show({
      type: "internetToast",
    });
  };

  const showToast2 = () => {
    Toast.show({
      type: "somethingwrong",
    });
  };

  useEffect(() => {
    if (!stream) {
      ref.current = setTimeout(repeatingFunc, 0);
    }
    return () => {
      clearTimeout(ref.current);
      setOn(false);
    };
  }, [stream]);

  // clear timeout on component dismount

  async function repeatingFunc() {
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });
    setMic(true);
    try {
      setOn(true);
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
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
      console.log(err);
      console.debug(err);
    }
    ref.current = setTimeout(repeatingFunc, 6000);
  }

  //----------------------------------

  const [connect, setConnect] = useState(false);
  const count = useRef(connect);
  /*
  useEffect(() => {
    checkConnected().then((res) => {
      setConnect(res);
      count.current = connect;
      console.log("FIRSTCONNECT", connect);
    });
  });

  */

  const startTimer = () => {
    setRingWaves(true);
    setStream(false);
  };

  /*

  const startTimer = () => {
    checkConnected()
      .then((res) => {
        count.current = res;
        console.log("PRESSEDCONNECT", connect);
      })
      .finally(() => {
        if (count.current) {
          setRingWaves(true);
          setStream(false);
          console.log(stream);
        } else {
          showToast();
        }
      });
  };

  */

  const stopTimer = () => {
    setRingWaves(false);
    setStream(true);
    console.log(stream);
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
          <ScrollView
            style={{}}
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
            }
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
                  style={{
                    color: "#ffffff",
                    fontSize: 18,
                    fontFamily: "roboto",
                  }}
                >
                  {t("Sample")}: {sample}
                </Text>
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 14,
                    marginTop: 12,
                    fontFamily: "roboto",
                  }}
                >
                  {t("OverallClassification")}: {t(prev.previsionLabel)}
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
          </ScrollView>

          <View
            style={{
              alignItems: "center",
              marginBottom: 70,
              //marginBottom: 100,
            }}
          >
            {stream ? (
              <TouchableOpacity onPress={startTimer}>
                <Record height={100} width={100} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={stopTimer}>
                <StopRecord height={110} width={110} />
              </TouchableOpacity>
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
                showSample={true}
              ></PrevisionTable>
            </View>
          </BottomSheet>
        </View>
      </View>
    </View>
  );
}
export default HomeScreen;
