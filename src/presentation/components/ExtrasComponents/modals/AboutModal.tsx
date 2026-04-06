import colors from "@/presentation/theme/colors";
import AppIcon from "../../branding/AppIcon";
import AppModal from "../../appModals/AppModal";
import { ModalButton } from "../../appModals/ModalButtons";
import { Text } from "react-native";
import { typography } from "@/presentation/theme";

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
      <Text style={typography.modalTitle}>About</Text>
      <AppIcon shadowColor={colors.C2} />
      <Text style={typography.modalText}>
        Griddier is an app designed to make range
        memorization easy. It uses advanced, systematic,
        structured spaced repetition. Practicing just 15
        minutes a day is enough to memorize 100s of preflop
        grids perfectly.
      </Text>

      <ModalButton text="Close" onPress={onClose} />
    </AppModal>
  );
};

export default AboutModal;
