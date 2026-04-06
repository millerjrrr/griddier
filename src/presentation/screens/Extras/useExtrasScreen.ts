import {
  getAllUserRangeDataUseCase,
  resetUserDataUseCase,
} from "@/container";
import { useEffect, useState } from "react";
import { ExtrasModalName } from "./types";

export const useExtrasScreen = () => {
  const [activeModal, setActiveModal] =
    useState<ExtrasModalName>(null);

  const [dataEntries, setDataEntries] = useState([]);

  const openModal = (modal: ExtrasModalName) =>
    setActiveModal(modal);

  const closeModal = () => setActiveModal(null);

  const loadUserData = async () => {
    const entries =
      await getAllUserRangeDataUseCase.execute();
    setDataEntries(entries);
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const handleExportUserData = async () => {
    console.log("working on it. coming soon");
  };

  const handleImportUserData = async () => {
    console.log("working on it. coming soon");
    await loadUserData();
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
  };
};
