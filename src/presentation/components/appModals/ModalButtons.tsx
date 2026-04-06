import { useEffect } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AppTouchable } from "../AppPressables";
import { appShadow } from "@/presentation/theme";
import colors from "@/presentation/theme/colors";
import { typography } from "@/presentation/theme";
import getAppDimensions from "@/presentation/theme/appDimensions";
import { GridName } from "@/domain/value-objects/GridName";
const { base } = getAppDimensions();
const { BLUE, BG2 } = colors;
const Overlay = require("@assets/images/ActionButtonOverlay.png");

interface ModalButtonProps {
  text: string;
  onPress: () => void;
  scale?: number;
  color?: `#${string}`;
  locked?: boolean;
  shortcutKey?: string;
  gridName?: GridName;
}

export const ModalButton: React.FC<ModalButtonProps> = ({
  text,
  onPress,
  scale = 0.9,
  color = BG2,
  shortcutKey,
}) => {
  const hasShortcut =
    Platform.OS === "web" && !!shortcutKey;

  const playSound = () =>
    console.log("in future should play a sound here");

  // Keyboard listener on web
  useEffect(() => {
    if (!hasShortcut) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // compare the key pressed with the shortcutKey prop
      if (
        e.key.toLowerCase() === shortcutKey.toLowerCase()
      ) {
        e.preventDefault();
        playSound();
        onPress?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [shortcutKey, onPress]);

  const height = 45 * base * scale;
  const borderRadius = 8 * base;

  return (
    <View
      style={{
        borderRadius,
        width: "100%",
        marginTop: 10 * base,
        ...appShadow(),
      }}
    >
      <AppTouchable
        style={{
          alignItems: "center",
          justifyContent: "center",
          borderRadius,
          backgroundColor: color,
          width: "100%",
          height,
          overflow: "hidden",
        }}
        onPress={onPress}
      >
        <Image
          source={Overlay}
          style={{
            width: "100%",
            height,
            ...StyleSheet.absoluteFillObject,
            opacity: 0.15,
          }}
          resizeMode="cover"
        />
        <Text
          style={[
            typography.modalText,
            { color: colors.C1 },
          ]}
        >
          {text}
          {hasShortcut &&
            ` [${
              shortcutKey === " "
                ? "Space"
                : shortcutKey.toUpperCase()
            }]`}
        </Text>
      </AppTouchable>
    </View>
  );
};

export const CloseButton: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  return (
    <ModalButton
      text="Close"
      onPress={onClose}
      scale={0.75}
      color={BLUE}
      locked={false}
      shortcutKey="c"
    />
  );
};
