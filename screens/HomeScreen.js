import React, { useState, useEffect, useRef } from "react";
import { Audio } from "expo-av";
import Toast from "react-native-toast-message";
import WavyHeader from "../components/WavyHeader";

import Mic from "../src/icones/icon_mic2.svg";
import Pause from "../src/icones/mono-player-stop.svg";
import Rec from "../src/icones/mono-krec-record.svg";

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
import MatrixModal from "../components/MatrixModal";
import DetailsScreen from "./DetailsScreen";
import Rings from "../components/Rings";
import RingWaves from "../components/RingWaves";

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

  /*

  const items = [
    { label: "Do a little dance" },
    { label: "Make a lil love" },
    { label: "Get down tonight" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = (isMenuOpen) => {
    setIsMenuOpen({ isMenuOpen });
  };

  const handleItemPress = (item, index) => console.log("pressed item", item);

  */

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

  const [iconeInfo, setIconeInfo] = useState(true);

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        //justifyContent: "flex-end",
      }}
    >
      {/*
      <View
        style={{
          //marginTop: 80,
          alignSelf: "center",
          alignContent: "center",
          //alignItems: "stretch",
          justifyContent: "center",
        }}
      >
        <RingWaves />
      </View>
      */}
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
        <View
          style={{
            backgroundColor: "#14213d",
            flex: 0.5,
            //borderRadius: 50,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            borderWidth: 1,
            elevation: 15,
          }}
        >
          <ActionButton buttonColor="rgba(231,76,60,1)">
            <ActionButton.Item
              buttonColor="rgba(231,76,60,1)"
              title="sample info"
              onPress={() => console.log("notes tapped!")}
            >
              {/*<Icon name="android-create" style={styles.actionButtonIcon} />*/}

              <Text>I</Text>
            </ActionButton.Item>

            <ActionButton.Item
              buttonColor="rgba(231,76,60,1)"
              title="resume classification"
              onPress={() => console.log("notes tapped!")}
            >
              <Text>N</Text>
            </ActionButton.Item>
          </ActionButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // rest of the styles
  svgCurve: {
    position: "absolute",
    width: Dimensions.get("window").width,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    // change the color property for better output
    color: "#fff",
    textAlign: "center",
  },
});
export default HomeScreen;
