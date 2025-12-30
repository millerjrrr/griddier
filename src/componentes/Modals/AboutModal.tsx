import colors from "@src/utils/colors";

import { ModalText, ModalTitle } from "../AppText";
import AppIcon from "./AppIcon";
import AppModal from "./AppModal";
import { ModalButton } from "./ModalButtons";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<ModalProps> = ({
  visible,
  onClose,
}) => {
  return (
    <AppModal visible={visible}>
      <ModalTitle>About</ModalTitle>
      <AppIcon shadowColor={colors.CONTRAST_B} />
      <ModalText>
        Griddier is an app designed to make range
        memorization easy. It uses advanced, systematic,
        structured spaced repetition. Practicing just 15
        minutes a day is enough to memorize 100s of preflop
        grids perfectly.
      </ModalText>

      <ModalButton
        text="Close"
        onPress={onClose}
        shadow={colors.CONTRAST_A}
      />
    </AppModal>
  );
};

export default AboutModal;
