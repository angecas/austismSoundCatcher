import React, { useEffect, useRef, useState } from "react";
import PrevisionTable from "../components/PrevisionTable";
import Tips from "react-native-guide-tips";
import NewMic from "../src/svgs/newmic.svg";
import RingWaves from "../components/RingWaves";
import Classifying from "../components/Classifying";
import Record from "../src/svgs/newstart.svg";
import StopRecord from "../src/svgs/newpause.svg";
import ActionButton from "react-native-circular-action-menu";
import BottomSheet from "react-native-gesture-bottom-sheet";
import Balloon from "react-native-balloon";
import Toast from "react-native-toast-message";

import {
  SafeAreaView,
  RefreshControl,
  Button,
  TouchableOpacity,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  Modal,
  View,
} from "react-native";

const Help = () => {
  // Needed in order to use .show()
  const bottomSheet = useRef();
  const [on, setOn] = React.useState(false);
  const [sample, setSample] = React.useState(0);
  const [stream, setStream] = React.useState(true);
  const [load, setLoad] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [prev, setPrev] = React.useState("");

  const [fastRef, setFastRef] = React.useState(false);
  const [rec, setRec] = React.useState(true);
  const [stop, setStop] = React.useState(false);
  const [showModal, setShowModal] = useState(false);
  const [actionBut, setActionBut] = useState(false);

  const [purpl, setPurpl] = useState(true);
  const [blu, setBlue] = useState(false);
  const [gre, setGre] = useState(false);
  const [rede, setRe] = useState(false);
  const [yell, setYell] = useState(false);

  const showToast = () => {
    Toast.show({
      type: "helpPath",
    });
  };

  const ModalPop = () => {
    return (
      <Modal transparent visible={showModal}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "80%",
              backgroundColor: "white",
              paddingHorizontal: 20,
              paddingVertical: 50,
              borderRadius: 50,
              alignItems: "center",
            }}
          >
            <ScrollView>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../src/pngs/lupa.png")}
                  style={{ width: 20, height: 20, marginRight: 10 }}
                />

                <Text style={{ textAlign: "justify" }}>
                  In this screen, a tour across the functionalities of this
                  classifier is made.
                </Text>
              </View>

              <View style={{ height: 20 }} />

              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../src/pngs/graph.png")}
                  style={{ width: 20, height: 20, marginRight: 10 }}
                />

                <Text style={{ textAlign: "justify" }}>
                  In this screen, a tour across the functionalities of this
                  classifier is made. In this screen, a tour across the
                </Text>
              </View>
            </ScrollView>

            <TouchableOpacity onPress={() => setShowModal(false)}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 30,
                  borderTopColor: "black",
                  borderTopWidth: 1,
                }}
              >
                <Image
                  source={require("../src/pngs/ok.png")}
                  style={{ width: 30, height: 30, margin: 5 }}
                />
                <Text>Ok</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  useEffect(() => {
    setTimeout(() => {
      showToast();
    }, 1500);
    if (stop) {
      console.log("parar");
    }
  }, []);

  const startTimer = () => {
    console.log("startTimer pressed");
  };

  const onRefresh = () => {
    console.log("fast refresh");

    setGre(false);

    setRe(true);
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <ModalPop></ModalPop>
      <View style={{ justifyContent: "flex-end", flex: 1 }}>
        <View
          style={{
            flex: 0.5,
            alignSelf: "center",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <NewMic height={120} width={120} />
          {yell ? (
            <View style={{ height: 90, width: 100, backgroundColor: "yellow" }}>
              <Balloon
                borderColor="#2E86C1"
                backgroundColor="yellow"
                borderWidth={2}
                width={100}
                height={90}
                borderRadius={20}
                triangleSize={10}
                triangleDirection="top"
                triangleOffset="45%"
                onPress={() => console.log("press")}
              >
                <Text>Microphone starts capturing sound.</Text>
              </Balloon>
            </View>
          ) : (
            <View style={{ height: 90, width: 100 }} />
          )}
        </View>

        {/* 

        {fastRef ? (
          <View style={{ backgroundColor: "red", height: 100 }}>
            <Balloon
              borderColor="#2E86C1"
              backgroundColor="#D6EAF8"
              borderWidth={2}
              borderRadius={20}
              triangleSize={15}
              triangleOffset="45%"
              onPress={() => console.log("press")}
            >
              <Text>
                Drag the edge of the blue view down and refresh your screen.
              </Text>
            </Balloon>
          </View>
        ) : (
          <View style={{ backgroundColor: "red", height: 100 }} />
        )}

         */}

        {gre ? (
          <View style={{ height: 40, width: 300, marginBottom: 20 }}>
            <Balloon
              borderColor="#2E86C1"
              backgroundColor="grey"
              borderWidth={2}
              width={300}
              height={40}
              borderRadius={20}
              triangleSize={10}
              triangleDirection="bottom"
              triangleOffset="45%"
              onPress={() => console.log("press")}
            >
              <Text>Drag the blue edge down to do a fast refresh.</Text>
            </Balloon>
          </View>
        ) : (
          <View style={{ height: 40, width: 300, marginBottom: 20 }} />
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
                  Sample: {sample}
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
          </ScrollView>

          <View
            style={{
              alignItems: "center",
              marginBottom: 70,
              //marginBottom: 100,
            }}
          >
            {/*
            {rec ? (
              <Balloon
                borderColor="#2E86C1"
                backgroundColor="#D6EAF8"
                borderWidth={2}
                borderRadius={20}
                triangleSize={15}
                triangleOffset="45%"
              >
                <Text>
                  Press this button to start the sound capture and its
                  classification.
                </Text>
              </Balloon>
            ) : (
              <View style={{}} />
            )}

            */}

            {/*
            {stop ? (
              <Balloon
                borderColor="#2E86C1"
                backgroundColor="#D6EAF8"
                borderWidth={2}
                borderRadius={20}
                triangleSize={15}
                triangleOffset="45%"
              >
                <Text>Press this button to stop.</Text>
              </Balloon>
            ) : (
              <View style={{}} />
            )}

            */}

            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "column" }}>
                {purpl ? (
                  <View
                    style={{
                      height: 90,
                      width: 90,
                    }}
                  >
                    <Balloon
                      borderColor="#2E86C1"
                      backgroundColor="purple"
                      borderWidth={2}
                      width={70}
                      height={80}
                      borderRadius={20}
                      triangleSize={10}
                      triangleDirection="right"
                      triangleOffset="45%"
                      onPress={() => console.log("press")}
                    >
                      <Text>Press to start.</Text>
                    </Balloon>
                  </View>
                ) : (
                  <View style={{ height: 90, width: 90 }} />
                )}

                {rede ? (
                  <View
                    style={{
                      height: 90,
                      width: 90,
                    }}
                  >
                    <Balloon
                      borderColor="#2E86C1"
                      backgroundColor="red"
                      borderWidth={2}
                      width={70}
                      height={70}
                      borderRadius={20}
                      triangleSize={10}
                      triangleDirection="right"
                      triangleOffset="50%"
                      onPress={() => console.log("press")}
                    >
                      <Text>Details menus </Text>
                    </Balloon>
                  </View>
                ) : (
                  <View style={{ height: 90, width: 90 }} />
                )}
              </View>

              <View style={{ width: 50 }}>
                {stream ? (
                  <TouchableOpacity
                    style={{ alignSelf: "center" }}
                    onPress={() => {
                      setPurpl(false);
                      setStream(false);
                      setYell(true);
                      setBlue(true);
                    }}
                  >
                    <Record height={100} width={100} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{ alignSelf: "center" }}
                    onPress={() => {
                      //setStream(!stream);
                      setGre(true);
                      setBlue(false);
                      setYell(false);
                      setStream(false);

                      //setRec(true);
                    }}
                  >
                    <StopRecord height={100} width={100} />
                  </TouchableOpacity>
                )}
                <View
                  style={{
                    justifyContent: "flex-end",
                    backgroundColor: "orange",
                    marginLeft: 230,
                  }}
                >
                  <View style={{ height: 100 }} />
                </View>
                <ActionButton
                  buttonColor="white"
                  btnOutRange="white"
                  onPress={() => {
                    setRe(false);
                    setShowModal(true);
                  }}
                >
                  <ActionButton.Item
                    buttonColor="white"
                    title="sample info"
                    onPress={() => {
                      setShowModal(true);
                      console.log("lupa do actionButt");
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
                      console.log("grafico do actionButt");
                    }}
                  >
                    <Image
                      source={require("../src/pngs/graph.png")}
                      style={{ width: 20, height: 20 }}
                    />
                  </ActionButton.Item>
                </ActionButton>
                <View
                  style={{
                    backgroundColor: "red",
                    justifyContent: "flex-end",
                  }}
                ></View>
              </View>

              {blu ? (
                <View style={{ height: 90, width: 90 }}>
                  <Balloon
                    borderColor="#2E86C1"
                    backgroundColor="blue"
                    borderWidth={2}
                    width={70}
                    height={80}
                    borderRadius={20}
                    triangleSize={10}
                    triangleDirection="left"
                    triangleOffset="25%"
                    onPress={() => console.log("press")}
                  >
                    <Text>Press to STOP.</Text>
                  </Balloon>
                </View>
              ) : (
                <View style={{ height: 90, width: 90 }} />
              )}
            </View>
          </View>

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
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 150,
    backgroundColor: "#140078",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#8559da",
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    elevation: 6,
  },
  text: {
    color: "white",
    fontWeight: "600",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Help;
