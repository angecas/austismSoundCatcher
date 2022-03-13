import React from "react";
import { View, StyleSheet, Text } from "react-native";
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
              }}
            >
              First Prediction
            </Text>
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
              }}
            >
              Second Prediction
            </Text>
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
              }}
            >
              Third Prediction
            </Text>
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
