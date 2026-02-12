import AboutModal from "@src/componentes/Modals/AboutModal";
import ContactModal from "@src/componentes/Modals/ContactModal";
import MethodologyModal from "@src/componentes/Modals/MethodologyModal";
import QRModal from "@src/componentes/Modals/QRModal";
import StudyDataModal from "@src/componentes/Modals/StudyDataModal";
import SettingsCard, {
  ToggleQuickReviewCard,
} from "@src/componentes/SettingsCard";
import { selectUserDataState } from "@src/store/userData";
import { MODAL_NAMES } from "@src/types";
import { exportUserDataAsCsv } from "@src/utils/exportUserData";
import { importUserDataFromCsv } from "@src/utils/importUserData";
import * as FileSystem from "expo-file-system/legacy";
import { useState } from "react";
import { Platform, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const Extras = () => {
  const { dataEntries } = useSelector(selectUserDataState);
  const dispatch = useDispatch();

  const importUserData = () => {
    importUserDataFromCsv(dispatch);
  };

  const [modalShowing, setModalShowing] = useState("");

  const exportUserData = () =>
    exportUserDataAsCsv(dataEntries);

  const resetUserData = async () => {
    if (Platform.OS === "web") {
      try {
        localStorage.clear();
        window.location.reload();
      } catch (err) {
        console.error(
          "❌ Failed to clear localStorage:",
          err,
        );
      }
    } else {
      const path =
        FileSystem.documentDirectory + "AsyncStorage.json";
      try {
        await FileSystem.writeAsStringAsync(path, "{}");
        console.log(
          "🧹 Cleared file-backed AsyncStorage.json (native)",
        );
      } catch (err) {
        console.error(
          "❌ Failed to clear file-backed AsyncStorage:",
          err,
        );
      }
    }
  };

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
        {MODAL_NAMES.map((name) => (
          <SettingsCard
            key={name}
            onPress={() => setModalShowing(name)}
            title={name}
          />
        ))}
        <SettingsCard
          onPress={exportUserData}
          title={"Export user data"}
        />
        <SettingsCard
          onPress={importUserData}
          title={"Import user data"}
        />
        <ToggleQuickReviewCard />
        {process.env.NODE_ENV === "development" && (
          <SettingsCard
            onPress={resetUserData}
            title={"⚠️ Reset User Data"}
          />
        )}
      </View>
      <AboutModal
        visible={modalShowing === "About"}
        onClose={() => setModalShowing("")}
      />
      <ContactModal
        visible={modalShowing === "Contact"}
        onClose={() => setModalShowing("")}
      />
      <MethodologyModal
        visible={modalShowing === "Methodology"}
        onClose={() => setModalShowing("")}
      />
      <StudyDataModal
        visible={modalShowing === "Your Study Data"}
        onClose={() => setModalShowing("")}
      />
      <QRModal
        visible={modalShowing === "Share"}
        onClose={() => setModalShowing("")}
      />
    </View>
  );
};

export default Extras;
