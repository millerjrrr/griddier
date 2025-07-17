import colors from "@src/utils/colors";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { ColorValue, ViewStyle } from "react-native";

interface FadeBackgroundViewProps {
  color?: `#${string}`; // enforce hex format
  position?: "top" | "bottom";
  height?: number;
  style?: ViewStyle;
  children?: ReactNode;
}

const applyAlpha = (
  hex: string,
  alphaHex: string
): string => {
  if (
    hex.startsWith("#") &&
    (hex.length === 7 || hex.length === 9)
  ) {
    return hex.slice(0, 7) + alphaHex;
  }
  console.warn(
    `Invalid hex color "${hex}". Returning as-is.`
  );
  return hex;
};

const FadeBackgroundView: React.FC<
  FadeBackgroundViewProps
> = ({
  color = colors.PRIMARY,
  position = "top",
  height,
  style,
  children,
}) => {
  const gradientColors: [
    ColorValue,
    ColorValue,
    ...ColorValue[]
  ] =
    position === "top"
      ? [
          color,
          applyAlpha(color, "E6"),
          applyAlpha(color, "80"),
          applyAlpha(color, "00"),
        ]
      : [
          applyAlpha(color, "00"),
          applyAlpha(color, "80"),
          applyAlpha(color, "E6"),
          color,
        ];

  return (
    <LinearGradient
      colors={gradientColors}
      style={{
        position: "absolute",
        width: "100%",
        height,
        alignItems: "center",
        zIndex: 20,
        ...(position === "top"
          ? { top: 0 }
          : { bottom: 0 }),
        ...style,
      }}
    >
      {children}
    </LinearGradient>
  );
};

export default FadeBackgroundView;
