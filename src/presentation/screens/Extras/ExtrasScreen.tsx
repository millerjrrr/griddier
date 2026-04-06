import ExtrasModals from "@/presentation/components/ExtrasComponents/ExtrasModals";
import ExtrasView from "./ExtrasView";
import { useExtrasScreen } from "../../hooks/useExtrasScreen";

const ExtrasScreen = () => {
  const {
    activeModal,
    openModal,
    closeModal,
    handleExportUserData,
    handleImportUserData,
    handleResetUserData,
    showResetCard,
  } = useExtrasScreen();

  return (
    <>
      <ExtrasView
        onOpenModal={openModal}
        onExportUserData={handleExportUserData}
        onImportUserData={handleImportUserData}
        onResetUserData={handleResetUserData}
        showResetCard={showResetCard}
      />
      <ExtrasModals
        activeModal={activeModal}
        onClose={closeModal}
      />
    </>
  );
};

export default ExtrasScreen;
