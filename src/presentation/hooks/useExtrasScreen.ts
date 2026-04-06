import {
  exportUserDataUseCase,
  importUserDataUseCase,
  resetUserDataUseCase,
} from "@/container";
import { useGetUserRangeData } from "@/presentation/hooks/useGetUserRangeData";
import { useState } from "react";
import { ExtrasModalName } from "../screens/Extras/types";

export const useExtrasScreen = () => {
  const [activeModal, setActiveModal] =
    useState<ExtrasModalName>(null);

  const {
    data: dataEntries,
    loading,
    reload,
  } = useGetUserRangeData();

  const openModal = (modal: ExtrasModalName) =>
    setActiveModal(modal);

  const closeModal = () => setActiveModal(null);

  const handleExportUserData = async () => {
    try {
      await exportUserDataUseCase.execute();
    } catch (error) {
      console.error("Failed to export user data", error);
    }
  };

  const handleImportUserData = async () => {
    try {
      const success = await importUserDataUseCase.execute();

      if (!success) return;

      console.log("User data imported successfully");
      reload();
    } catch (error) {
      console.error("Import failed:", error);
    }
  };

  const handleResetUserData = async () => {
    await resetUserDataUseCase.execute();

    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return {
    activeModal,
    openModal,
    closeModal,
    handleExportUserData,
    handleImportUserData,
    handleResetUserData,
    showResetCard: process.env.NODE_ENV === "development",
    dataEntries,
    loading,
  };
};
