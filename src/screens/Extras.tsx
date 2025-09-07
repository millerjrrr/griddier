import AboutModal from "@src/componentes/Modals/AboutModal";
import BGContainer from "@src/componentes/BGContainer";
import ContactModal from "@src/componentes/Modals/ContactModal";
import MethodologyModal from "@src/componentes/Modals/MethodologyModal";
import SettingsCard from "@src/componentes/SettingsCard";
import { selectUserDataState } from "@src/store/userData";
import { exportUserDataAsCsv } from "@src/utils/exportUserData";
import { importUserDataFromCsv } from "@src/utils/importUserData";
import { useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import StudyDataModal from "@src/componentes/Modals/StudyDataModal";

const Extras = () => {
  const { dataEntries } = useSelector(selectUserDataState);
  const dispatch = useDispatch();

  const importUserData = () => {
    importUserDataFromCsv(dispatch);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);
  const [modal4Visible, setModal4Visible] = useState(false);

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
          onPress={() => setModalVisible(true)}
          title={"About"}
        />
        <SettingsCard
          onPress={() => setModal2Visible(true)}
          title={"Contact"}
        />
        <SettingsCard
          onPress={() => setModal3Visible(true)}
          title={"Methodology"}
        />
        <SettingsCard
          onPress={() => setModal4Visible(true)}
          title={"Your Study Data"}
        />
        <SettingsCard
          onPress={importUserData}
          title={"Import user data"}
        />
        <SettingsCard
          onPress={exportUserData}
          title={"Export user data"}
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
      <MethodologyModal
        visible={modal3Visible}
        onClose={() => setModal3Visible(false)}
      />
      <StudyDataModal
        visible={modal4Visible}
        onClose={() => setModal4Visible(false)}
      />
    </BGContainer>
  );
};

export default Extras;
