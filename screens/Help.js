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
  Dimensions,
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

const Help = ({ navigation, route }) => {
  // Needed in order to use .show()
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const bottomSheet = useRef();
  const [on, setOn] = React.useState(false);
  const [sample, setSample] = React.useState(0);
  const [stream, setStream] = React.useState(true);
  const [load, setLoad] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [prev, setPrev] = React.useState("");

  const [stop, setStop] = React.useState(false);
  const [showModal, setShowModal] = useState(false);
  const [MenuPop, setMenuPop] = useState(false);

  const [purpl, setPurpl] = useState(true);
  const [blu, setBlue] = useState(false);
  const [gre, setGre] = useState(false);
  const [rede, setRe] = useState(false);
  const [yell, setYell] = useState(false);
  const [act, setAct] = useState(false);

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
              borderWidth: 1,
              borderColor: "#0e7fe5",
              backgroundColor: "white",
              paddingHorizontal: 18,
              paddingVertical: 18,
              borderRadius: 50,
              alignItems: "center",
              height: windowHeight / 2,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "700", color: "#0e7fe5" }}>
              Tool Instructions
            </Text>
            <ScrollView
              style={{
                width: "100%",
              }}
            >
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <Image
                  source={require("../src/pngs/lupa.png")}
                  style={{ width: 20, height: 20, marginRight: 10 }}
                />

                <Text style={{ textAlign: "justify", fontStyle: "italic" }}>
                  Sample Inspector
                </Text>
              </View>
              <View>
                <Text style={{ textAlign: "justify" }}>
                  This tool allows to inspect each sample information regarding
                  its classification while receiving it.
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  //justifyContent: "center",
                }}
              >
                <Image
                  source={require("../src/pngs/graph.png")}
                  style={{ width: 20, height: 20, marginRight: 10 }}
                />
                <Text style={{ fontStyle: "italic" }}>Statistics screen</Text>
              </View>
              <View>
                <Text style={{ textAlign: "justify" }}>
                  This tool directs to another screen where statistic
                  information about all the collected samples is presented.
                </Text>
              </View>

              <Text
                style={{
                  textAlign: "justify",
                  textAlign: "center",
                  fontWeight: "700",
                  marginTop: 10,
                }}
              >
                Note:
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: "contain",
                  }}
                  source={require("../src/pngs/info2.png")}
                />
                <View
                  style={{
                    backgroundColor: "#f2f4f7",
                    width: "90%",
                  }}
                >
                  <Text style={{ textAlign: "justify" }}>
                    This icone exists in both of referred tools and gives
                    information regarding the results interpretation.
                  </Text>
                </View>
              </View>
            </ScrollView>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  setPurpl(true);
                  setBlue(false);
                  setGre(!false);
                  setRe(false);
                  setYell(false);
                  setAct(false);

                  setShowModal(false);
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderTopColor: "black",
                  }}
                >
                  <Image
                    source={require("../src/pngs/again.png")}
                    style={{ width: 30, height: 30, margin: 5 }}
                  />
                  <Text>Stay</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  //setPurpl(true);
                  //setBlue(false);
                  //setGre(false);
                  //setRe(false);
                  //setYell(false);
                  //setAct(false);
                  //setShowModal(false);
                  navigation.navigate("Home");
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderTopColor: "black",
                  }}
                >
                  <Image
                    source={require("../src/pngs/finished.png")}
                    style={{ width: 30, height: 30, margin: 5 }}
                  />
                  <Text>Done</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const MenuModal = () => {
    return (
      <Modal transparent visible={MenuPop}>
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
              borderWidth: 1,
              borderColor: "#0e7fe5",
              backgroundColor: "white",
              paddingHorizontal: 18,
              paddingVertical: 18,
              borderRadius: 50,
              alignItems: "center",
              height: windowHeight / 2,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "700", color: "#0e7fe5" }}>
              Menu Instructions
            </Text>
            <ScrollView
              style={{
                width: "100%",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  //justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    alignContent: "center",
                    alignItems: "center",
                    marginTop: 5,
                    marginBottom: 5,
                    flexDirection: "row",
                    backgroundColor: "#0E7FE5",
                    borderRadius: 20,
                  }}
                >
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                      marginRight: 5,
                      marginLeft: 5,
                    }}
                    source={require("../src/pngs/fromdevice.png")}
                  />
                </View>

                <Text
                  style={{ fontStyle: "italic", marginRight: 5, marginLeft: 5 }}
                >
                  From device
                </Text>
              </View>
              <View>
                <Text style={{ textAlign: "justify" }}>
                  Pressing this button, redirects to a Sound Classifier of your
                  local audio files.
                </Text>
              </View>

              <View
                style={{
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 5,
                  marginBottom: 5,
                  flexDirection: "row",
                }}
              >
                <View style={{ backgroundColor: "#0E7FE5", borderRadius: 20 }}>
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                      marginRight: 5,
                      marginLeft: 5,
                    }}
                    source={require("../src/pngs/show.png")}
                  />
                </View>
                <Text> {" >>> "} </Text>
                <View style={{ backgroundColor: "#0E7FE5", borderRadius: 20 }}>
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                      marginRight: 5,
                      marginLeft: 5,
                    }}
                    source={require("../src/pngs/class.png")}
                  />
                </View>
                <Text> {" >>> "} </Text>
                <Image
                  style={{
                    height: 20,
                    width: 20,
                    marginRight: 5,
                    marginLeft: 5,
                  }}
                  source={require("../src/pngs/lupa.png")}
                />
              </View>

              <View
                style={{
                  width: "90%",
                }}
              >
                <Text style={{ textAlign: "justify" }}>
                  To classify sounds from the device, , first press to browse
                  and select an audio file, then press to classify, and,
                  finally, to see the details of the classification, press the
                  magnifying glass.
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  //justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    alignContent: "center",
                    alignItems: "center",
                    marginTop: 5,
                    marginBottom: 5,
                    flexDirection: "row",
                    backgroundColor: "#0E7FE5",
                    borderRadius: 20,
                  }}
                >
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                      marginRight: 5,
                      marginLeft: 5,
                    }}
                    source={require("../src/pngs/eng.png")}
                  />
                </View>

                <Text
                  style={{ fontStyle: "italic", marginRight: 5, marginLeft: 5 }}
                >
                  PT/ENG
                </Text>
              </View>
              <View
                style={{
                  width: "90%",
                }}
              >
                <Text style={{ textAlign: "justify" }}>
                  Change app language.
                </Text>
              </View>
            </ScrollView>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  setPurpl(true);
                  setBlue(false);
                  setGre(!false);
                  setRe(false);
                  setYell(false);
                  setAct(false);

                  setMenuPop(false);
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderTopColor: "black",
                  }}
                >
                  <Image
                    source={require("../src/pngs/again.png")}
                    style={{ width: 30, height: 30, margin: 5 }}
                  />
                  <Text>Stay</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  //setPurpl(true);
                  //setBlue(false);
                  //setGre(false);
                  //setRe(false);
                  //setYell(false);
                  //setAct(false);
                  //setShowModal(false);
                  navigation.navigate("Home");
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderTopColor: "black",
                  }}
                >
                  <Image
                    source={require("../src/pngs/finished.png")}
                    style={{ width: 30, height: 30, margin: 5 }}
                  />
                  <Text>Done</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  useEffect(() => {
    setTimeout(() => {
      showToast();
    }, 0);
    if (stop) {
      console.log("parar");
    }
  }, []);

  const startTimer = () => {
    console.log("startTimer pressed");
  };

  const onRefresh = () => {
    console.log("fast refresh");
    setPurpl(false);
    setBlue(false);
    setYell(false);
    setShowModal(false);
    setGre(false);
    setRe(true);
    setAct(true);
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <MenuModal />
      <View
        style={{
          width: "100%",
          justifyContent: "center",

          height: 40,
          borderBottomWidth: 1,
          borderBottomColor: "#efefef",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setMenuPop(true);
          }}
        >
          <Image
            source={require("../src/pngs/menu.png")}
            style={{
              width: 25,
              height: 25,
              margin: 5,
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            //esta view a 80 pode dar problemas
            textAlign: "center",
            fontWeight: "600",
            fontSize: 20,
            alignSelf: "center",
            flex: 1,
          }}
        >
          Classification
        </Text>
      </View>
      <ModalPop />

      {true ? (
        <View style={{ height: 70, width: 80 }}>
          <Balloon
            borderColor="#0e7fe5"
            backgroundColor="white"
            borderWidth={3}
            width={80}
            height={70}
            borderRadius={20}
            triangleSize={10}
            triangleDirection="top"
            triangleOffset="45%"
            onPress={() => console.log("press")}
          >
            <Text style={{ textAlign: "center" }}>Options Menu</Text>
          </Balloon>
        </View>
      ) : (
        <View
          style={{ backgroundColor: "green", width: 80, height: 70 }}
        ></View>
      )}

      <View style={{ justifyContent: "flex-end", flex: 1 }}>
        <View
          style={{
            flex: 0.4,
            alignSelf: "center",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <NewMic height={120} width={120} />

          {yell ? (
            <View style={{ height: 90, width: 100 }}>
              <Balloon
                borderColor="#0e7fe5"
                backgroundColor="white"
                borderWidth={3}
                width={100}
                height={90}
                borderRadius={20}
                triangleSize={10}
                triangleDirection="top"
                triangleOffset="45%"
                onPress={() => console.log("press")}
              >
                <Text style={{ textAlign: "center" }}>
                  Microphone starts capturing sound.
                </Text>
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
              borderColor="#0e7fe5"
              backgroundColor="white"
              borderWidth={3}
              width={300}
              height={40}
              borderRadius={20}
              triangleSize={10}
              triangleDirection="bottom"
              triangleOffset="45%"
              onPress={() => console.log("press")}
            >
              <Text style={{ textAlign: "center" }}>
                Drag the blue edge down to refresh.
              </Text>
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
                      borderColor="#0e7fe5"
                      backgroundColor="white"
                      borderWidth={2}
                      width={70}
                      height={60}
                      borderRadius={20}
                      triangleSize={10}
                      triangleDirection="right"
                      triangleOffset="45%"
                      onPress={() => console.log("press")}
                    >
                      <Text style={{ textAlign: "justify" }}>
                        Press to start.
                      </Text>
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
                      borderColor="#0e7fe5"
                      backgroundColor="white"
                      borderWidth={2}
                      width={70}
                      height={60}
                      borderRadius={20}
                      triangleSize={10}
                      triangleDirection="right"
                      triangleOffset="50%"
                      onPress={() => console.log("press")}
                    >
                      <Text style={{ textAlign: "justify" }}>
                        Details menus{" "}
                      </Text>
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
                      setStream(!stream);
                      setYell(true);
                      setBlue(true);
                      setShowModal(false);
                      setGre(!gre);
                      setRe(true);
                    }}
                  >
                    <Record height={100} width={100} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{ alignSelf: "center" }}
                    onPress={() => {
                      //setStream(!stream);

                      setShowModal(false);

                      setPurpl(true);
                      setGre(!gre);
                      setBlue(false);
                      setYell(false);
                      setStream(!stream);
                      setRe(false);

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
                    setShowModal(true);
                    if (act) {
                      setRe(false);
                      setShowModal(true);

                      setPurpl(false);
                      setBlue(false);
                      setGre(false);
                      setYell(false);
                    }
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
                    elevation: 90,
                  }}
                ></View>
              </View>

              {blu ? (
                <View style={{ height: 90, width: 90 }}>
                  <Balloon
                    borderColor="#0e7fe5"
                    backgroundColor="white"
                    borderWidth={2}
                    width={70}
                    height={80}
                    borderRadius={20}
                    triangleSize={10}
                    triangleDirection="left"
                    triangleOffset="25%"
                    onPress={() => console.log("press")}
                  >
                    <Text style={{ textAlign: "justify" }}>Press to STOP.</Text>
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
