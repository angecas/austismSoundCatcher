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

const ModalPop = ({ visible }) => {
  const [showModal, setShowModal] = useState(true);
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
          <Text style={{ textAlign: "justify" }}>
            In this screen, a tour across the functionalities of this classifier
            is made.
          </Text>
          <TouchableOpacity onPress={() => setShowModal(false)}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
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

  useEffect(() => {
    {
      /*}
    setTimeout(() => {
      setRec(true);
    }, 0);
    if (stop) {
      console.log("parar");
    }

*/
    }
  });

  const startTimer = () => {
    console.log("startTimer pressed");
  };

  const onRefresh = () => {
    console.log("fast refresh");
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
        {fastRef ? (
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
        ) : (
          <></>
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
            {stop ? (
              <Balloon
                borderColor="#2E86C1"
                backgroundColor="#D6EAF8"
                borderWidth={2}
                borderRadius={20}
                triangleSize={15}
                triangleOffset="45%"
              >
                <Text>To stop the capture, press this button.</Text>
              </Balloon>
            ) : null}

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
            ) : null}

            {stream ? (
              <TouchableOpacity
                onPress={() => {
                  setRec(false);
                  setStop(true);
                  setStream(!stream);
                }}
              >
                <Record height={100} width={100} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  //setStream(!stream);
                  setStop(false);
                  setFastRef(true);

                  //setRec(true);
                }}
              >
                <StopRecord height={110} width={110} />
              </TouchableOpacity>
            )}
          </View>

          <View
            style={{
              alignSelf: "flex-end",
              marginBottom: 15,
            }}
          >
            <Balloon
              borderColor="#2E86C1"
              backgroundColor="#D6EAF8"
              borderWidth={2}
              width={60}
              borderRadius={20}
              triangleSize={10}
              triangleDirection="left"
              triangleOffset="45%"
              onPress={() => console.log("press")}
            >
              <Text>merda</Text>
            </Balloon>
          </View>

          <ActionButton buttonColor="white" btnOutRange="white">
            <ActionButton.Item
              buttonColor="white"
              title="sample info"
              onPress={() => {
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
