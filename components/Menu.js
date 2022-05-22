import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, Text, Image, Dimensions } from "react-native";
import Modal from "react-native-modal";
import { useNavigation, NavigationContainer } from "@react-navigation/native";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const Menu = ({ isVisible, toggle, screenName }) => {
  const navigation = useNavigation();

  const [menuState, setMenuState] = useState(false);

  const ToggleMenu = () => {
    setMenuState(!menuState);
    console.log(menuState);
  };

  const modalizeRef = useRef(null);
  function onOpen() {
    modalizeRef.current?.open();
  }

  const onClose = () => {
    modalizeRef.current?.close();
  };

  return (
    <Modal
      animationIn="slideInLeft"
      animationOut="slideOutRight"
      animationInTiming={500}
      animationOutTiming={550}
      isVisible={isVisible}
      useNativeDriver={true}
      onBackButtonPress={toggle}
      style={{ alignItems: "center", flex: 1 }}
    >
      <View
        style={{
          backgroundColor: "white",
          paddingHorizontal: 18,
          paddingVertical: 18,
          //height: windowHeight / 2.7,
          //width: windowWidth / 1.5,
          borderRadius: 40,
          elevation: 80,
          borderColor: "#0e7fe5",
          borderWidth: 1,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderBottomColor: "#0e7fe5",
            borderBottomWidth: 2,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "700",
              marginLeft: windowWidth / 5,
              color: "#0e7fe5",
              marginRight: 30,
            }}
          >
            Menu
          </Text>
          <TouchableOpacity
            onPress={toggle}
            style={{
              flexDirection: "row-reverse",
            }}
          >
            <Image
              source={require("../src/pngs/closex.png")}
              style={{
                width: 35,
                height: 35,
              }}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={async () => {
            navigation.navigate("FromDevice");
            toggle();
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
            ></Image>
            <Text style={{ fontSize: 18, marginLeft: 10, color: "white" }}>
              From device
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            console.log("traduzir!!!!");
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
            ></Image>
            <Text style={{ fontSize: 18, marginLeft: 10, color: "white" }}>
              PT
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate(screenName);
            toggle();
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
              source={require("../src/pngs/help.png")}
            ></Image>
            <Text style={{ fontSize: 18, marginLeft: 10, color: "white" }}>
              Help
            </Text>
          </View>
        </TouchableOpacity>

        {/*

        <TouchableOpacity
          onPress={() => {
            console.log("historicooo");
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
              source={require("../src/pngs/hist.png")}
            ></Image>
            <Text style={{ fontSize: 18, marginLeft: 10, color: "white" }}>
              Historic
            </Text>
          </View>
        </TouchableOpacity>
            */}
      </View>
    </Modal>
  );
};

export default Menu;
