import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";

const PrevisionTable = ({ previsionResults }) => {
  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 250,
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
