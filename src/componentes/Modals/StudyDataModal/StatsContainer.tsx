import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import appShadow from "@src/utils/appShadow";
import { selectUserDataState } from "@src/store/userData";
import colors from "@src/utils/colors";
import StatsIcon from "./StatsIcon";
import formatTime from "@src/utils/formatTime";

const StatsContainer = ({ size = 22 }) => {
  const { dataEntries } = useSelector(selectUserDataState);
  const { CONTRAST_B, BG4 } = colors;
  const timeDrilling = dataEntries
    .map((entry) => entry.timeDrilling)
    .reduce((a, b) => a + b, 0);
  const unlocked = dataEntries
    .map((entry) => (entry.dueDate === "" ? 0 : 1))
    .reduce((a: number, b: number) => a + b, 0);

  const drillsCompleted = dataEntries
    .map((entry) => entry.drilled)
    .reduce((a, b) => a + b, 0);

  const handsPlayed = dataEntries
    .map((entry) =>
      !entry.handsPlayed ? 0 : entry.handsPlayed
    )
    .reduce((a, b) => a + b, 0);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: BG4,
          ...appShadow(CONTRAST_B),
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
