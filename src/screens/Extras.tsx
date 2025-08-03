import AboutModal from "@src/componentes/AboutModal";
import BGContainer from "@src/componentes/BGContainer";
import ContactModal from "@src/componentes/ContactModal";
import SettingsCard from "@src/componentes/SettingsCard";
import { selectUserDataState } from "@src/store/userData";
import { exportUserDataAsCsv } from "@src/utils/exportUserData";
import { importUserDataFromCsv } from "@src/utils/importUserData";
import { useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const Extras = () => {
  const { dataEntries } = useSelector(selectUserDataState);
  const dispatch = useDispatch();

  const importUserData = () => {
    importUserDataFromCsv(dispatch);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);

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
        <SettingsCard
          onPress={() => setModalVisible(true)}
          title={"About"}
        />
        <SettingsCard
          onPress={() => setModal2Visible(true)}
          title={"Contact"}
        />
      </View>
      <AboutModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      <ContactModal
        visible={modal2Visible}
        onClose={() => setModal2Visible(false)}
      />
    </BGContainer>
  );
};

export default Extras;
