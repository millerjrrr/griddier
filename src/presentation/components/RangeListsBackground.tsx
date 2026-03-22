import { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { appShadow } from "../theme";
import colors from "../theme/colors";

const RangeListsBackground: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { BG1, BG2, BG3 } = colors;

  return (
    <LinearGradient
      colors={[BG1, BG2, BG3]}
      locations={[0, 0.5, 1]}
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 1, y: 1 }}
      style={{
        opacity: 0.9,
        flex: 1,
        borderRadius: 10,
        ...appShadow(),
        overflow: "hidden",
        ...StyleSheet.absoluteFillObject,
      }}
    >
      {children}
    </LinearGradient>
  );
};

export default RangeListsBackground;
