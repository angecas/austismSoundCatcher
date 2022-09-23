import React, { useRef } from "react";
import PrevisionTable from "../components/PrevisionTable";

import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";

const Example = ({ navigation }) => {
  // Needed in order to use .show()
  const bottomSheet = useRef();

  return (
    <SafeAreaView style={styles.container}>
      <BottomSheet hasDraggableIcon ref={bottomSheet} height={600}>
        <View>
          <Text> oiiii</Text>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <PrevisionTable previsionResults="" sample=""></PrevisionTable>
          </View>
        </View>
      </BottomSheet>
      <TouchableOpacity
        style={styles.button}
        onPress={() => bottomSheet.current.show()}
      >
        <Text style={styles.text}>Open modal</Text>
      </TouchableOpacity>
    </SafeAreaView>
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

export default Example;
