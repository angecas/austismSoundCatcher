import AnimatedEllipsis from "react-native-animated-ellipsis";

import { Text, View } from "react-native";

export default function IsWarming({ isWarming }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <Text style={{ fontSize: 16, margin: 3 }}>{isWarming}</Text>
      <AnimatedEllipsis style={{ margin: 2 }} />
    </View>
  );
}
