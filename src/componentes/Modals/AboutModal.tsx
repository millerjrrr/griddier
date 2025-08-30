import appShadow from "@src/utils/appShadow";
import colors from "@src/utils/colors";
const icon = require("@assets/icon.png");
import { Image, Modal, View } from "react-native";
import screenDimensions from "@src/utils/screenDimensions";
import { Container, Overlay } from "./ModalComponents";
import { ModalButton } from "./ModalButtons";
import { ModalText, ModalTitle } from "../AppText";

const { base } = screenDimensions();

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
      <Overlay>
        <Container color={colors.PRIMARY}>
          <ModalTitle>About</ModalTitle>
          <View
            style={{
              borderRadius: 15 * base,
              ...appShadow(colors.CONTRAST, 20 * base),
              margin: 8 * base,
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
          <ModalText>
            Griddier is an app designed to make range
            memorization easy. It uses advanced, systematic,
            structured spaced repetition. Practicing just 15
            minutes a day is enough to memorize 100s of
            preflop grids perfectly.
          </ModalText>

          <ModalButton
            text="Close"
            onPress={onClose}
            shadow={colors.CONTRAST}
          />
        </Container>
      </Overlay>
    </Modal>
  );
};

export default AboutModal;
