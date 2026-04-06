import SettingsCard from "@/presentation/components/ExtrasComponents/SettingsCard";
import { View } from "react-native";
import { EXTRAS_MODAL_NAMES } from "./constants";
import { ExtrasModalName } from "./types";

type ExtrasViewProps = {
  onOpenModal: (modal: ExtrasModalName) => void;
  onExportUserData: () => void;
  onImportUserData: () => void;
  onResetUserData: () => void;
  showResetCard: boolean;
};

const ExtrasView = ({
  onOpenModal,
  onExportUserData,
  onImportUserData,
  onResetUserData,
  showResetCard,
}: ExtrasViewProps) => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          width: "100%",
          paddingVertical: 40,
        }}
      >
        {EXTRAS_MODAL_NAMES.map((name) => (
          <SettingsCard
            key={name}
            onPress={() => onOpenModal(name)}
            title={name}
          />
        ))}

        <SettingsCard
          onPress={onExportUserData}
          title="Export user data"
        />

        <SettingsCard
          onPress={onImportUserData}
          title="Import user data"
        />

        {showResetCard && (
          <SettingsCard
            onPress={onResetUserData}
            title="Reset User Data ⚠️"
          />
        )}
      </View>
    </View>
  );
};

export default ExtrasView;
