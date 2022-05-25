import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { useTranslation } from "react-i18next";

const PrevisionTable = ({ previsionResults, sample, showSample }) => {
  const { t, i18n } = useTranslation();

  let toastText =
    t("firstPrediction") +
    previsionResults.firstPrevisionPercent +
    " " +
    t(previsionResults.firstPrevisionLabel);

  let toastTextI =
    t("secondPrediction") +
    previsionResults.secondPrevisionPercent +
    " " +
    t(previsionResults.secondPrevisionLabel);

  let toastTextII =
    t("thirdPrediction") +
    previsionResults.thirdPrevisionPercent +
    " " +
    t(previsionResults.thirdPrevisionLabel);

  const toastConfig = {
    tomatoToast: ({ text1 }) => (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0e7fe5",
          borderColor: "#0e7fe5",
          elevation: 14,
          borderWidth: 2,
          borderRadius: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              alignSelf: "flex-start",
              height: 25,
              width: 25,
              marginRight: 5,
            }}
            source={require("../src/pngs/info3.png")}
          ></Image>
          <Text
            style={{ fontWeight: "700", color: "white", textAlign: "center" }}
          >
            {t("SampleInfo")}{" "}
          </Text>
        </View>
        <View
          style={{
            height: 70,
            width: "100%",
            backgroundColor: "white",
            borderRadius: 8,
            borderWidth: 2,
            elevation: 14,
            borderColor: "#0e7fe5",
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ margin: 12, textAlign: "justify" }}> {text1} </Text>
        </View>
      </View>
    ),
  };

  const showToast = () => {
    Toast.show({
      type: "tomatoToast",
      text1: toastText,
    });
  };

  const showToastII = () => {
    Toast.show({
      type: "tomatoToast",
      text1: toastTextI,
    });
  };

  const showToastIII = () => {
    Toast.show({
      type: "tomatoToast",
      text1: toastTextII,
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={{ flexDirection: "row", marginBottom: 6, alignSelf: "center" }}
      >
        {showSample ? (
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 14,
                letterSpacing: 1,
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                marginLeft: 25,
                marginBottom: 10,
              }}
            >
              {t("Sample")}:
            </Text>
            <Text style={{ marginLeft: 5, fontSize: 16, marginBottom: 10 }}>
              {sample}
            </Text>
          </View>
        ) : null}
      </View>
      <Grid>
        <Col size={6}>
          <Row style={styles.cell}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 13,
                letterSpacing: 1,
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                marginLeft: 25,
              }}
            >
              {t("FirstPrediction")}
            </Text>
            <TouchableOpacity
              style={{
                justifyContent: "flex-end",
                flexDirection: "row-reverse",
                marginTop: 45,
                marginLeft: 14,
              }}
              onPress={showToast}
            >
              <Image
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: "contain",
                }}
                source={require("../src/pngs/info2.png")}
              />
            </TouchableOpacity>
          </Row>
          <Row style={styles.cell}>
            <Text>{t(previsionResults.firstPrevisionLabel)}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text>{t(previsionResults.firstPrevisionPercent)}</Text>
          </Row>
        </Col>
        <Col size={6}>
          <Row style={styles.cell}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 13,
                letterSpacing: 1,
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                marginLeft: 20,
              }}
            >
              {t("SecondPrediction")}
            </Text>
            <TouchableOpacity
              style={{
                justifyContent: "flex-end",
                flexDirection: "row-reverse",
                marginTop: 45,
                marginLeft: 14,
              }}
              onPress={showToastII}
            >
              <Image
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: "contain",
                }}
                source={require("../src/pngs/info2.png")}
              />
            </TouchableOpacity>
          </Row>
          <Row style={styles.cell}>
            <Text>{t(previsionResults.secondPrevisionLabel)}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text>{previsionResults.secondPrevisionPercent}</Text>
          </Row>
        </Col>
        <Col size={6}>
          <Row style={styles.cell}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 13,
                letterSpacing: 1,
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                marginLeft: 20,
              }}
            >
              {t("ThirdPrediction")}
            </Text>
            <TouchableOpacity
              style={{
                justifyContent: "flex-end",
                flexDirection: "row-reverse",
                marginTop: 45,
                marginLeft: 14,
              }}
              onPress={showToastIII}
            >
              <Image
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: "contain",
                }}
                source={require("../src/pngs/info2.png")}
              />
            </TouchableOpacity>
          </Row>
          <Row style={styles.cell}>
            <Text>{t(previsionResults.thirdPrevisionLabel)}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text>{previsionResults.thirdPrevisionPercent}</Text>
          </Row>
        </Col>
      </Grid>
      <View
        style={{
          flexDirection: "row",
          marginTop: 6,
          alignSelf: "center",
        }}
      >
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: 1,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              marginRight: 5,
              marginTop: 10,
            }}
          >
            {t("SampleOverallClass")}
          </Text>
          <Text
            style={{
              marginLeft: 5,
              fontSize: 16,
              marginTop: 10,
            }}
          >
            {t(previsionResults.previsionLabel)}
          </Text>
        </View>
      </View>
      <Toast config={toastConfig} position="bottom" bottomOffset={1} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    padding: 5,
    paddingTop: 30,
  },
  cell: {
    borderWidth: 1,
    borderColor: "#cbd4d8",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PrevisionTable;
