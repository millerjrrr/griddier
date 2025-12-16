import { Image, Platform } from "react-native";
import { AppTouchable } from "../AppPressables";
import { WhiteTextBold } from "../AppText";
import appShadow from "@src/utils/appShadow";
import screenDimensions from "@src/utils/screenDimensions";
import colors from "@src/utils/colors";
import Toast from "react-native-toast-message";
import { useEffect } from "react";
import usePlaySound from "@src/hooks/usePlaySound";
import { GridName } from "@src/types";
import { useDispatch } from "react-redux";
import { updateDataEntry } from "@src/store/userData";
import formatDate from "@src/utils/formatDate";
const lockIcon = require("@assets/img/lock.png");
const { base } = screenDimensions();
const { BLUE, BG1, BG2 } = colors;

interface ModalButtonProps {
  text: string;
  onPress: () => void;
  scale?: number;
  color?: `#${string}`;
  locked?: boolean;
  shadow?: `#${string}`;
  shortcutKey?: string;
  gridName?: GridName;
}

export const ModalButton: React.FC<ModalButtonProps> = ({
  text,
  onPress,
  scale = 0.9,
  color = BG2,
  locked,
  shadow = BG1,
  shortcutKey,
  gridName,
}) => {
  const hasShortcut =
    Platform.OS === "web" && !!shortcutKey;
  const onPressFunction = locked
    ? () =>
        Toast.show({
          text1: "Locked: Complete previous levels",
          text2: "Press & hold to unlock",
          visibilityTime: 2500,
          text1Style: { fontSize: 20 * base },
          text2Style: { fontSize: 17 * base },
        })
    : onPress;

  const dispatch = useDispatch();
  const today = formatDate(new Date());
  const onLongPressFunction =
    locked && !!gridName
      ? () => {
          dispatch(
            updateDataEntry({ gridName, dueDate: today })
          );
        }
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
    <AppTouchable
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
      onLongPress={onLongPressFunction}
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
    </AppTouchable>
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
