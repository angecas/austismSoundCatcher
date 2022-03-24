import React, { useState, useEffect, useRef } from "react";
import { CommonActions } from "@react-navigation/native";
import { StyleSheet, Text, View, Button } from "react-native";

const DetailsScreen = ({ navigation, route }) => {
  const { previsionLabel } = route.params;

  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{ name: "Home" }],
  });

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Text>previsionLabel: {JSON.stringify(previsionLabel)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push("DetailsScreen", {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button
        title="Go to Home"
        onPress={() => navigation.dispatch(resetAction)}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default DetailsScreen;
