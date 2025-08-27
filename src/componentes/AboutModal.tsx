import appShadow from "@src/utils/appShadow";
import colors from "@src/utils/colors";
const icon = require("@assets/icon.png");
import {
  Image,
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";
import { AppPressable } from "./AppPressables";
import screenDimensions from "@src/utils/screenDimensions";

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
            borderRadius: 12,
            padding: 15,
            width: 0.9 * screenDimensions().width,
            backgroundColor: colors.PRIMARY,
            alignItems: "center",
            ...appShadow(colors.CONTRAST),
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 35,
              color: colors.CONTRAST,
              paddingBottom: 5,
              textAlign: "center",
            }}
          >
            About
          </Text>
          <View
            style={{
              borderRadius: 15,
              ...appShadow(colors.CONTRAST, 20),
            }}
          >
            <Image
              source={icon}
              resizeMode="contain"
              style={{
                width: 100,
                height: 100,
                borderRadius: 15,
                margin: 8,
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 25,
              color: colors.CONTRAST,
              paddingBottom: 5,
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
              marginTop: 20,
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 8,
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
