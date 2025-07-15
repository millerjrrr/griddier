import RangeModal from "@src/componentes/RangeModal";
import FadeBackgroundView from "@src/componentes/FadeBackgroundView";
import RangeCard from "@src/componentes/RangeCard";
import { selectUserDataState } from "@src/store/userData";
import { DataEntry } from "@src/types";
import { useState } from "react";
import { FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import ResetDataCard from "@src/componentes/ResetDataCard(Dev)";
import BGContainer from "@src/componentes/BGContainer";

const RangesList = () => {
  const { dataEntries } = useSelector(selectUserDataState);

  const [selectedEntry, setSelectedEntry] =
    useState<DataEntry | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (entry: DataEntry) => {
    setSelectedEntry(entry);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedEntry(null);
    setModalVisible(false);
  };

  return (
    <BGContainer>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {/* <ResetDataCard /> */}
        <RangeModal
          visible={modalVisible}
          dataEntry={selectedEntry}
          onClose={closeModal}
        />
        <FadeBackgroundView height={20} />
        <FlatList
          data={dataEntries}
          renderItem={({ item }) => {
            // must be called item for FlatList to work
            return (
              <RangeCard
                dataEntry={item}
                selectFunction={() => openModal(item)}
              />
            );
          }}
          keyExtractor={(item) => item.gridName}
          style={{
            flex: 1,
            width: "100%",
            paddingVertical: 20,
            paddingHorizontal: 15,
            backgroundColor: "transparent",
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
        <FadeBackgroundView
          height={30}
          position={"bottom"}
          color={"#ffffff"}
        />
      </View>
    </BGContainer>
  );
};

export default RangesList;
