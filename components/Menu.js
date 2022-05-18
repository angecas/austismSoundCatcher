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
      animationOutTiming={750}
      isVisible={isVisible}
      useNativeDriver={true}
      onBackButtonPress={toggle}
      style={{ alignItems: "center", flex: 1 }}
    >
      <View
        style={{
          backgroundColor: "white",
          height: windowHeight / 2.3,
          width: windowWidth / 1.5,
          borderRadius: 40,
          elevation: 80,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            margin: 5,
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "700",
              marginLeft: windowWidth / 5,
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
                width: 30,
                height: 30,
                margin: 15,
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            margin: 20,
            elevation: 100,
          }}
        >
          <View
            style={{
              alignContent: "center",
              alignItems: "center",
              borderBottomColor: "#0E7FE5",
              borderBottomWidth: 1,
              marginTop: 5,
              marginBottom: 5,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(screenName);
                toggle();
                console.log("help");
              }}
              style={{ flexDirection: "row" }}
            >
              <Image
                style={{
                  height: 25,
                  width: 25,
                  marginRight: 10,
                }}
                source={require("../src/pngs/help.png")}
              ></Image>
              <Text style={{ fontSize: 18, marginLeft: 10 }}>Help</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignContent: "center",
              alignItems: "center",
              borderBottomColor: "#0E7FE5",
              borderBottomWidth: 1,
              marginTop: 5,
              marginBottom: 5,
            }}
          >
            <TouchableOpacity
              onPress={() => console.log("help")}
              style={{ flexDirection: "row" }}
            >
              <Image
                style={{
                  height: 25,
                  width: 25,
                  marginRight: 10,
                }}
                source={require("../src/pngs/help.png")}
              ></Image>
              <Text style={{ fontSize: 18, marginLeft: 10 }}>Help</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignContent: "center",
              alignItems: "center",
              borderBottomColor: "#0E7FE5",
              borderBottomWidth: 1,
              marginTop: 5,
              marginBottom: 5,
            }}
          >
            <TouchableOpacity
              onPress={() => console.log("help")}
              style={{ flexDirection: "row" }}
            >
              <Image
                style={{
                  height: 25,
                  width: 25,
                  marginRight: 10,
                }}
                source={require("../src/pngs/help.png")}
              ></Image>
              <Text style={{ fontSize: 18, marginLeft: 10 }}>Help</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Menu;
