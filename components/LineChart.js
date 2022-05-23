import { LineChart } from "react-native-gifted-charts";
import React from "react";
import Toast from "react-native-toast-message";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

const LineChartPrev = ({ previsionLabel }) => {
  const { t, i18n } = useTranslation();

  let size = Object.keys(previsionLabel).length;

  const averagePredPercent = () => {
    let unknownAcum = 0;
    let positiveAcum = 0;
    let negativeAcum = 0;
    let size = Object.keys(previsionLabel).length;

    let averagePercents = [
      { value: unknownAcum, label: "unknown" },
      { value: positiveAcum, label: "positive" },
      { value: negativeAcum, label: "negative" },
    ];

    if (size !== 0) {
      for (let i = 0; i < size; i++) {
        if (previsionLabel[i].firstPrevisionLabel === "negative") {
          negativeAcum += parseFloat(previsionLabel[i].firstPrevisionPercent);
        }
        if (previsionLabel[i].secondPrevisionLabel === "negative") {
          negativeAcum += parseFloat(previsionLabel[i].secondPrevisionPercent);
        }
        if (previsionLabel[i].thirdPrevisionLabel === "negative") {
          negativeAcum += parseFloat(previsionLabel[i].thirdPrevisionPercent);
        }
        if (previsionLabel[i].firstPrevisionLabel === "unknown") {
          unknownAcum += parseFloat(previsionLabel[i].firstPrevisionPercent);
        }
        if (previsionLabel[i].secondPrevisionLabel === "unknown") {
          unknownAcum += parseFloat(previsionLabel[i].secondPrevisionPercent);
        }

        if (previsionLabel[i].thirdPrevisionLabel === "unknown") {
          unknownAcum += parseFloat(previsionLabel[i].thirdPrevisionPercent);
        }
        if (previsionLabel[i].firstPrevisionLabel === "positive") {
          positiveAcum += parseFloat(previsionLabel[i].firstPrevisionPercent);
        }
        if (previsionLabel[i].secondPrevisionLabel === "positive") {
          positiveAcum += parseFloat(previsionLabel[i].secondPrevisionPercent);
        }
        if (previsionLabel[i].thirdPrevisionLabel === "positive") {
          positiveAcum += parseFloat(previsionLabel[i].thirdPrevisionPercent);
        }
      }

      averagePercents = [
        {
          value: unknownAcum / size,
          label: t("unknown"),
          dataPointText: String(unknownAcum / size) + " %",
        },
        {
          value: positiveAcum / size,
          label: t("positive"),
          dataPointText: String(positiveAcum / size) + " %",
        },
        {
          value: negativeAcum / size,
          label: t("negative"),
          dataPointText: String(negativeAcum / size) + " %",
        },
      ];
    }

    return averagePercents;
  };

  let toastText =
    " This graph displays the average prevision percentage in every sample for each lable ";

  const showToast = () => {
    Toast.show({
      type: "tomatoToast",
      text1: toastText,
      text2: "This is some something 👋",
    });
  };

  return (
    <LineChart
      data={averagePredPercent()}
      textColor="black"
      dataPointsColor="#0e7fe5"
      textFontSize={16}
      yAxisLabelSuffix="%"
      color="#0e7fe5"
      showTextOnPress={true}
      isAnimated={true}
      spacing={80}
      pressEnabled={true}
      showDataPointOnPress={true}
    />
  );
};

export default LineChartPrev;
