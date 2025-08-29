import appShadow from "@src/utils/appShadow";
import colors from "@src/utils/colors";
const icon = require("@assets/icon.png");
import { Image, Modal, Text, View } from "react-native";
import { AppPressable } from "./AppPressables";
import screenDimensions from "@src/utils/screenDimensions";

const { width, base } = screenDimensions();

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<ModalProps> = ({
  visible,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "transparent",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            borderRadius: 12 * base,
            padding: 15 * base,
            width: 0.9 * width,
            backgroundColor: colors.PRIMARY,
            alignItems: "center",
            ...appShadow(colors.CONTRAST),
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 35 * base,
              color: colors.CONTRAST,
              paddingBottom: 5 * base,
              textAlign: "center",
            }}
          >
            About
          </Text>
          <View
            style={{
              borderRadius: 15 * base,
              ...appShadow(colors.CONTRAST, 20 * base),
            }}
          >
            <Image
              source={icon}
              resizeMode="contain"
              style={{
                width: 100 * base,
                height: 100 * base,
                borderRadius: 15 * base,
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 25 * base,
              color: colors.CONTRAST,
              paddingBottom: 5 * base,
              textAlign: "center",
            }}
          >
            Griddier is an app designed to make range
            memorization easy. It uses advanced, systematic,
            structured spaced repetition. Practicing just 15
            minutes a day is enough to memorize 100s of
            preflop grids perfectly.
          </Text>

          <AppPressable
            onPress={onClose}
            style={{
              backgroundColor: colors.SECONDARY,
              marginTop: 20 * base,
              paddingVertical: 12 * base,
              paddingHorizontal: 20 * base,
              borderRadius: 8 * base,
              width: "100%",
              ...appShadow(colors.CONTRAST),
            }}
          >
            <Text
              style={{
                color: colors.CONTRAST,
                textAlign: "center",
              }}
            >
              Close
            </Text>
          </AppPressable>
        </View>
      </View>
    </Modal>
  );
};

export default AboutModal;
