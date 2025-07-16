import BGContainer from "@src/componentes/BGContainer";
import SettingsCard from "@src/componentes/SettingsCard";
import { selectUserDataState } from "@src/store/userData";
import { exportUserDataAsCsv } from "@src/utils/exportUserData";
import { importUserDataFromCsv } from "@src/utils/importUserData";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const Data = () => {
  const { dataEntries } = useSelector(selectUserDataState);
  const dispatch = useDispatch();

  const importUserData = () => {
    importUserDataFromCsv(dispatch);
  };

  const exportUserData = () =>
    exportUserDataAsCsv(dataEntries);

  return (
    <BGContainer>
      <View
        style={{
          flex: 1,
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
    </BGContainer>
  );
};

export default Data;
