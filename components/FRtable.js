import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";

const FRTable = () => {
  return (
    <Grid>
      <Col size={2}>
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
                width: 25,
                height: 25,
                resizeMode: "contain",
              }}
              source={require("../src/pngs/info2.png")}
            />
          </TouchableOpacity>
        </Row>
        <Row style={styles.cell}>
          <Text>oiiiiiiiiiiiiiii</Text>
        </Row>
      </Col>
      <Col size={2}>
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
                width: 25,
                height: 25,
                resizeMode: "contain",
              }}
              source={require("../src/pngs/info2.png")}
            />
          </TouchableOpacity>
        </Row>
        <Row style={styles.cell}>
          <Text>cucucucu</Text>
        </Row>
      </Col>
      <Col size={2}>
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
                width: 25,
                height: 25,
                resizeMode: "contain",
              }}
              source={require("../src/pngs/info2.png")}
            />
          </TouchableOpacity>
        </Row>
        <Row style={styles.cell}>
          <Text>ta td</Text>
        </Row>
      </Col>
    </Grid>
  );
};

const styles = StyleSheet.create({
  cell: {
    borderWidth: 1,
    height: 70,
    width: "100%",
    borderColor: "#0e7fe5",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f4f7",
  },
});

export default FRTable;
