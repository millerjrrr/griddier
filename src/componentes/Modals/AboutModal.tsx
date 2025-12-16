import colors from "@src/utils/colors";

import { Modal } from "react-native";

import { Container, Overlay } from "./ModalComponents";
import { ModalButton } from "./ModalButtons";
import { ModalText, ModalTitle } from "../AppText";
import AppIcon from "./AppIcon";

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
        <Container color={colors.BG1}>
          <ModalTitle>About</ModalTitle>
          <AppIcon />
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
            shadow={colors.CONTRAST_A}
          />
        </Container>
      </Overlay>
    </Modal>
  );
};

export default AboutModal;
