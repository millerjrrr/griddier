import { Image, Platform, StyleSheet } from "react-native";
import { AppPressable } from "../AppPressables";
import { WhiteTextBold } from "../AppText";
import appShadow from "@src/utils/appShadow";
import screenDimensions from "@src/utils/screenDimensions";
import colors from "@src/utils/colors";
import Toast from "react-native-toast-message";
import { useEffect } from "react";
import usePlaySound from "@src/hooks/usePlaySound";
const lockIcon = require("@assets/img/lock.png");
const { base } = screenDimensions();
const { BLUE, PRIMARY, SECONDARY } = colors;

interface ModalButtonProps {
  text: string;
  onPress: () => void;
  scale?: number;
  color?: `#${string}`;
  locked?: boolean;
  shadow?: `#${string}`;
  shortcutKey?: string;
}

export const ModalButton: React.FC<ModalButtonProps> = ({
  text,
  onPress,
  scale = 0.9,
  color = SECONDARY,
  locked,
  shadow = PRIMARY,
  shortcutKey,
}) => {
  const hasShortcut =
    Platform.OS === "web" && !!shortcutKey;
  const onPressFunction = locked
    ? () =>
        Toast.show({
          type: "success",
          text1: "Locked",
          text2: "Complete previous levels!",
          visibilityTime: 2000,
          text1Style: { fontSize: 20 * base },
          text2Style: { fontSize: 17 * base },
        })
    : onPress;

  const playSound = usePlaySound();

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
        onPressFunction?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [shortcutKey, onPressFunction]);

  return (
    <AppPressable
      style={{
        alignItems: "center",
        borderRadius: 8 * base,
        marginTop: 10 * base,
        ...appShadow(shadow),
        paddingVertical: 12 * base * scale,
        backgroundColor: color,
        width: "100%",
      }}
      onPress={onPressFunction}
    >
      {locked ? (
        <Image
          source={lockIcon}
          resizeMode="contain"
          style={{
            height: 21 * base * scale,
            width: 21 * base * scale,
          }}
        />
      ) : (
        <WhiteTextBold s={20 * scale}>
          {text}
          {hasShortcut &&
            ` [${
              shortcutKey === " "
                ? "Space"
                : shortcutKey.toUpperCase()
            }]`}
        </WhiteTextBold>
      )}
    </AppPressable>
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
