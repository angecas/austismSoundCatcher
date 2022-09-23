import { Modalize } from "react-native-modalize";
import {
  GestureHandlerRootView,
  GestureHandlerRootHOC,
} from "react-native-gesture-handler";
import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, Text } from "react-native";

const MatrixModal = () => {
  const modalizeRef = useRef(null);
  function onOpen() {
    modalizeRef.current?.open();
  }

  const onClose = () => {
    modalizeRef.current?.close();
  };

  return (
    <Modalize ref={modalizeRef} snapPoint={180} modalHeight={200}>
      <View
        style={{
          flex: 2,
          height: 180,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={onClose}>
          <Text>Editar</Text>
        </TouchableOpacity>
      </View>
    </Modalize>
  );
};

export default MatrixModal;
