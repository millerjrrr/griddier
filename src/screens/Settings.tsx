import SettingsCard from "@src/componentes/SettingsCard";
import { Text, View } from "react-native";

const Settings = () => {
  const importUserData = () =>
    console.log("Import user data");
  const exportUserData = () =>
    console.log("Export user data");
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        width: "100%",
        paddingVertical: 40,
      }}
    >
      <SettingsCard
        onPress={importUserData}
        title={"Import user data"}
      />
      <SettingsCard
        onPress={exportUserData}
        title={"Export user data"}
      />
    </View>
  );
};

export default Settings;
