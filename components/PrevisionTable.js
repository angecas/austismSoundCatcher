import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { BottomModal } from "react-native-modals";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const PrevisionTable = ({ previsionResults, sample }) => {
  let toastText =
    "In the first prediction, the sample was was classified as " +
    previsionResults.firstPrevisionPercent +
    " " +
    previsionResults.firstPrevisionLabel;

  const toastConfig = {
    tomatoToast: ({ text1 }) => (
      <View
        style={{
          height: 60,
          width: "100%",
          //backgroundColor: "#F6F1D1",
          borderRadius: 8,
          borderWidth: 2,
          elevation: 14,
          borderColor: "#40798C",
        }}
      >
        <Text> {toastText} </Text>
      </View>
    ),
  };

  const showToast = () => {
    Toast.show({
      type: "tomatoToast",
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={{ flexDirection: "row", marginBottom: 6, alignSelf: "center" }}
      >
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
          Sample:
        </Text>
        <Text>{sample}</Text>
      </View>
      <Grid>
        <Col size={25}>
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
              First Prediction
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
                  width: 30,
                  height: 25,
                  resizeMode: "contain",
                }}
                source={require("../src/icones/info.png")}
              />
            </TouchableOpacity>
          </Row>
          <Row style={styles.cell}>
            <Text>{previsionResults.firstPrevisionLabel}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text>{previsionResults.firstPrevisionPercent}</Text>
          </Row>
        </Col>
        <Col size={25}>
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
              Second Prediction
            </Text>
            <TouchableOpacity
              style={{
                justifyContent: "flex-end",
                flexDirection: "row-reverse",
                marginTop: 45,
                marginLeft: 14,
              }}
            >
              <Image
                style={{
                  width: 30,
                  height: 25,
                  resizeMode: "contain",
                }}
                source={require("../src/icones/info.png")}
              />
            </TouchableOpacity>
          </Row>
          <Row style={styles.cell}>
            <Text>{previsionResults.secondPrevisionLabel}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text>{previsionResults.secondPrevisionPercent}</Text>
          </Row>
        </Col>
        <Col size={25}>
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
              Third Prediction
            </Text>
            <TouchableOpacity
              style={{
                justifyContent: "flex-end",
                flexDirection: "row-reverse",
                marginTop: 45,
                marginLeft: 14,
              }}
            >
              <Image
                style={{
                  width: 30,
                  height: 25,
                  resizeMode: "contain",
                }}
                source={require("../src/icones/info.png")}
              />
            </TouchableOpacity>
          </Row>
          <Row style={styles.cell}>
            <Text>{previsionResults.thirdPrevisionLabel}</Text>
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
          alignSelf: "flex-start",
        }}
      >
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
          Sample Overall:
        </Text>
        <Text>{previsionResults.previsionLabel}</Text>
      </View>
      <Toast config={toastConfig} position="bottom" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 400,
    height: 290,
    padding: 5,
    paddingTop: 30,
  },
  cell: {
    borderWidth: 1,
    borderColor: "#ddd",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PrevisionTable;
