import appShadow from "@src/utils/appShadow";
import colors from "@src/utils/colors";
import screenDimensions from "@src/utils/screenDimensions";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { StyleSheet } from "react-native";
const { base } = screenDimensions();

const RangeListsBackground: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { BG1, BG2, BG3, CONTRAST_A } = colors;

  return (
    <LinearGradient
      colors={[BG1, BG2, BG3]}
      locations={[0, 0.5, 1]}
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 1, y: 1 }}
      style={{
        opacity: 0.9,
        flex: 1,
        borderRadius: 10 * base,
        ...appShadow(CONTRAST_A),
        overflow: "hidden",
        ...StyleSheet.absoluteFillObject,
      }}
    >
      {children}
    </LinearGradient>
  );
};

export default RangeListsBackground;
