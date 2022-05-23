import AnimatedEllipsis from "react-native-animated-ellipsis";
import { useTranslation } from "react-i18next";

import { Text, View } from "react-native";
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from "react-native-indicators";

export default function Classifying() {
  const { t, i18n } = useTranslation();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {i18n.language === "en" ? (
        <Text
          style={{
            fontSize: 16,
            margin: 3,
          }}
        >
          Classifying
        </Text>
      ) : (
        <Text
          style={{
            fontSize: 16,
            margin: 3,
          }}
        >
          A classificar
        </Text>
      )}
      <View style={{ marginTop: 6 }}>
        <DotIndicator color="black" size={4} />
      </View>
    </View>
  );
}
