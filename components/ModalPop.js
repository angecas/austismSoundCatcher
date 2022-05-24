import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, Text, Image, Dimensions } from "react-native";
import Modal from "react-native-modal";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const ModalPop = () => {
  const { t, i18n } = useTranslation();

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
            {t("ToolInstructions")}
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
                {t("SampleInspector")}
              </Text>
            </View>
            <View>
              <Text style={{ textAlign: "justify" }}>
                {t("SampleInspectorDetail")}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              <Image
                source={require("../src/pngs/graph.png")}
                style={{ width: 20, height: 20, marginRight: 10 }}
              />
              <Text style={{ fontStyle: "italic" }}>
                {t("StatisticsScreen")}
              </Text>
            </View>
            <View>
              <Text style={{ textAlign: "justify" }}>
                {t("StatisticsScreenDetail")}
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
              {t("Note")}
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
                <Text style={{ textAlign: "justify" }}>{t("NoteDetail")}</Text>
              </View>
            </View>
          </ScrollView>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                setStartBal(true);
                setStopBal(false);
                setDragBal(false);
                setDetaiMen(false);
                setMicBal(false);
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
                <Text>{t("stay")}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
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
                <Text>{t("Understood")}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalPop;
