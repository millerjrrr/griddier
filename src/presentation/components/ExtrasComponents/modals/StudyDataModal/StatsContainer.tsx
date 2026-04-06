import { View, StyleSheet } from "react-native";
import { appShadow } from "@/presentation/theme";
import colors from "@/presentation/theme/colors";
import StatsIcon from "./StatsIcon";
import formatTime from "@/utils/formatTime";
import { useGetUserRangeData } from "@/presentation/hooks/useGetUserRangeData";

const StatsContainer = ({ size = 22 }) => {
  const { data } = useGetUserRangeData();

  const { C2, BG4 } = colors;

  const timeDrilling = data
    .map((entry) => entry.timeDrilling)
    .reduce((a, b) => a + b, 0);

  const unlocked = data.length;

  const drillsCompleted = data
    .map((entry) => entry.drilled)
    .reduce((a, b) => a + b, 0);

  const handsPlayed = data
    .map((entry) =>
      !entry.handsPlayed ? 0 : entry.handsPlayed,
    )
    .reduce((a, b) => a + b, 0);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: BG4,
          ...appShadow(),
        },
      ]}
    >
      <View style={styles.rowContainer}>
        <StatsIcon
          name="clock-outline"
          text={formatTime(timeDrilling)}
          size={size}
        />
        <StatsIcon
          name="basket-fill"
          text={unlocked}
          size={size}
        />
      </View>
      <View style={styles.rowContainer}>
        <StatsIcon
          name="grid-large"
          text={drillsCompleted}
          size={size}
        />
        <StatsIcon
          name="foot-print"
          text={handsPlayed}
          size={size}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    width: "100%",
  },
  rowContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
});

export default StatsContainer;
