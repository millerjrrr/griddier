import { resetUserDataUseCase } from "@/container";
import { useGetUserRangeData } from "@/presentation/hooks/useGetUserRangeData";
import { useState } from "react";
import { ExtrasModalName } from "./types";

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
    console.log("working on it. coming soon");
  };

  const handleImportUserData = async () => {
    console.log("working on it. coming soon");
    await reload();
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
