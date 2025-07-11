import RangeModal from "@src/componentes/RangeModal";
import FadeBackgroundView from "@src/componentes/FadeBackgroundView";
import RangeCard from "@src/componentes/RangeCard";
import { selectUserDataState } from "@src/store/userData";
import { DataEntry } from "@src/types";
import { useState } from "react";
import { FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import sort from "@src/utils/sortDataEntries";
import ResetDataCard from "@src/componentes/ResetDataCard(Dev)";

const RangesList = () => {
  const { dataEntries } = useSelector(selectUserDataState);

  const sortedDataEntries = sort(dataEntries);
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
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingVertical: 40,
      }}
    >
      <ResetDataCard />
      <RangeModal
        visible={modalVisible}
        dataEntry={selectedEntry}
        onClose={closeModal}
      />
      <FadeBackgroundView height={20} style={{ top: 40 }} />
      <FlatList
        data={sortedDataEntries}
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
        }}
        showsVerticalScrollIndicator={false}
      />
      <FadeBackgroundView
        height={20}
        position={"bottom"}
        style={{ bottom: 40 }}
      />
    </View>
  );
};

export default RangesList;
