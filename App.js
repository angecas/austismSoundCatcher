// import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { Audio } from "expo-av";
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
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import PrevisionTable from "./components/PrevisionTable";
import react from "react";

const screen = Dimensions.get("screen");

export default function App() {
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

  function onOpen() {
    modalizeRef.current?.open();
  }

  const uploadAudio = async (path) => {
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
      console.log("PREVVVV", prev);
    } catch (err) {
      alert(err, "Alert Title");
    }
    setLoad(false);
  };

  useEffect(() => {
    try {
      if (!stream) {
        console.log("ENTROUUUUU");
        funRef.current = setInterval(async () => {
          console.log("TAMBEM ENTROU");

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
    <View style={styles.container}>
      <View style={styles.loader}>
        {load === true ? <PacmanIndicator color="orange" /> : <></>}
      </View>
      <StatusBar barStyle="light-content" />

      {stream ? (
        <TouchableOpacity onPress={startTimer} style={styles.button}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={stopTimer}
          style={[styles.button, { borderColor: "orange" }]}
        >
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={onOpen}>
        <Text style={{ color: "white" }}>Abrir Modal</Text>
      </TouchableOpacity>

      <Modalize ref={modalizeRef} snapPoint={180}>
        <View
          style={{
            flex: 1,
            height: 180,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity>
            <Text>Editar</Text>
          </TouchableOpacity>
        </View>
      </Modalize>

      {/*<PrevisionTable previsionResults={prev} />*/}
      <Text style={{ color: "orange", fontSize: 35, marginTop: 35 }}>
        {prev.previsionLabel}
      </Text>
    </View>
  );
}

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