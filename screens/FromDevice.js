import React, { useState, useEffect, useRef } from "react";
import MusicIn from "../src/svgs/music.svg";
import MusicOut from "../src/svgs/musicout.svg";
import BottomSheet from "react-native-gesture-bottom-sheet";
import PrevisionTable from "../components/PrevisionTable";
import { useTranslation } from "react-i18next";

import Classifying from "../components/Classifying";

import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  Modal,
} from "react-native";

import * as DocumentPicker from "expo-document-picker";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const FromDevice = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const [pathFile, setPathFile] = useState("");
  const [load, setLoad] = useState(false);
  const [prev, setPrev] = useState("");
  const [fileName, setFileName] = useState("");
  const bottomSheet = useRef();

  const uploadAudio = async (path) => {
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
      setPrev(json);

      console.log("JASON", json);
      console.log("jjjjj", json["label"]);
      console.log("llllll, ", json["label"]["firstPrevisionLabel"]);
      console.log(" prevvvvvvv", prev);
    } catch (err) {
      console.log(err);
      console.log("ERROOOOO");
      //showToast();
    }
    setLoad(false);
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        //justifyContent: "flex-end",
      }}
    >
      <View
        style={{
          flex: 1,
          alignSelf: "center",
          alignContent: "center",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {pathFile != "" ? (
          <MusicIn width={120} height={120} />
        ) : (
          <MusicOut width={120} height={120} />
        )}

        <View
          style={{
            flexDirection: "row",
            marginTop: 25,
          }}
        >
          <TouchableOpacity
            style={{ marginRight: 15 }}
            onPress={async () => {
              let result = await DocumentPicker.getDocumentAsync({});
              console.log("TYPE, ", result.type);
              if (result.type === "success") {
                setPathFile(result.uri);
                setFileName(result.name);
              }
            }}
          >
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#0e7fe5",
                borderRadius: 40,
                width: "100%",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../src/pngs/show.png")}
                style={{
                  width: 40,
                  height: 40,
                  marginRight: 10,
                  marginLeft: 10,
                  marginBottom: 10,
                  marginTop: 10,
                }}
              />

              <View
                style={{
                  marginLeft: 10,
                  marginRight: 15,
                  marginBottom: 10,
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                  }}
                >
                  {t("search")}
                </Text>

                {fileName != "" ? (
                  <Text
                    style={{
                      color: "white",
                      fontSize: 8,
                    }}
                  >
                    {fileName}
                  </Text>
                ) : null}
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={pathFile === ""}
            style={{ marginLeft: 15 }}
            onPress={async () => {
              console.log("classificar", pathFile);
              await uploadAudio(pathFile);
            }}
          >
            <View
              style={{
                flexDirection: "row",

                backgroundColor: pathFile != "" ? "#0e7fe5" : "#b5d6f7",
                borderRadius: 40,
                width: "100%",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../src/pngs/class.png")}
                style={{
                  width: 40,
                  height: 40,
                  marginRight: 10,
                  marginLeft: 10,
                  marginBottom: 10,
                  marginTop: 10,
                }}
              />

              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  marginLeft: 10,
                  marginRight: 15,
                  marginBottom: 10,
                  marginTop: 10,
                }}
              >
                {t("Classify")}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
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
          flex: 0.3,
          //borderRadius: 50,
          borderTopLeftRadius: 80,
          borderTopRightRadius: 80,
          borderWidth: 1,
          elevation: 15,
          justifyContent: "space-around",
        }}
      >
        {prev != "" ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-around",
              alignContent: "center",
              height: 30,
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: 16,
                fontFamily: "roboto",
              }}
            >
              {t("OverallClassification")} :{" "}
              {prev["label"]["firstPrevisionLabel"]}
            </Text>
          </View>
        ) : (
          <View style={{ backgroundColor: "red" }} />
        )}

        <TouchableOpacity
          disabled={prev === ""}
          onPress={() => {
            bottomSheet.current.show();
          }}
        >
          <View
            style={{
              borderRadius: 100,
              backgroundColor: prev === "" ? "#b5d6f7" : "white",
              width: 45,
              height: 45,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Image
              source={require("../src/pngs/lupa.png")}
              style={{ width: 25, height: 25 }}
            />
          </View>
        </TouchableOpacity>

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
              previsionResults={prev.label}
              showSample={false}
              sample={1}
            ></PrevisionTable>
          </View>
        </BottomSheet>
      </View>
    </View>
  );
};

export default FromDevice;
