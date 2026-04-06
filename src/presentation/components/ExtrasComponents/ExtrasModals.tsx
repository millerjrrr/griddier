import AboutModal from "@/presentation/components/ExtrasComponents/modals/AboutModal";
import ContactModal from "@/presentation/components/ExtrasComponents/modals/ContactModal";
import MethodologyModal from "@/presentation/components/ExtrasComponents/modals/MethodologyModal";
import QRModal from "@/presentation/components/ExtrasComponents/modals/QRModal";
import StudyDataModal from "@/presentation/components/ExtrasComponents/modals/StudyDataModal";
import { ExtrasModalName } from "@/presentation/screens/Extras/types";

type ExtrasModalsProps = {
  activeModal: ExtrasModalName;
  onClose: () => void;
};

const ExtrasModals = ({
  activeModal,
  onClose,
}: ExtrasModalsProps) => {
  return (
    <>
      <AboutModal
        visible={activeModal === "About"}
        onClose={onClose}
      />
      <ContactModal
        visible={activeModal === "Contact"}
        onClose={onClose}
      />
      <MethodologyModal
        visible={activeModal === "Methodology"}
        onClose={onClose}
      />
      <StudyDataModal
        visible={activeModal === "Your Study Data"}
        onClose={onClose}
      />
      <QRModal
        visible={activeModal === "Share"}
        onClose={onClose}
      />
    </>
  );
};

export default ExtrasModals;
