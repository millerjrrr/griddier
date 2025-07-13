import SettingsCard from "@src/componentes/SettingsCard";
import { selectUserDataState } from "@src/store/userData";
import { exportUserDataAsCsv } from "@src/utils/exportUserData";
import { importUserDataFromCsv } from "@src/utils/importUserData";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const Settings = () => {
  const { dataEntries } = useSelector(selectUserDataState);
  const dispatch = useDispatch();

  const importUserData = () => {
    importUserDataFromCsv(dispatch);
  };

  const exportUserData = () =>
    exportUserDataAsCsv(dataEntries);

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
