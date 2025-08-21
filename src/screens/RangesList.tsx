import RangeModal from "@src/componentes/RangeModal";
import FadeBackgroundView from "@src/componentes/FadeBackgroundView";
import RangeCard from "@src/componentes/RangeCard";
import { selectUserDataState } from "@src/store/userData";
import { DataEntry } from "@src/types";
import { useState } from "react";
import { FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ResetDataCard from "@src/componentes/ResetDataCard(Dev)";
import BGContainer from "@src/componentes/BGContainer";
import colors from "@src/utils/colors";
import { setFeedback } from "@src/store/trainer";
import DeleteModal from "@src/componentes/DeleteModal";

const RangesList = () => {
  const { dataEntries } = useSelector(selectUserDataState);
  const dispatch = useDispatch();

  const [selectedEntry, setSelectedEntry] =
    useState<DataEntry | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] =
    useState(false);

  const openModal = (entry: DataEntry) => {
    dispatch(setFeedback(false));
    setSelectedEntry(entry);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedEntry(null);
    setModalVisible(false);
  };

  const openDeleteModal = (entry: DataEntry) => {
    setSelectedEntry(entry);
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setSelectedEntry(null);
    setDeleteModalVisible(false);
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
        {process.env.NODE_ENV === "development" && (
          <ResetDataCard />
        )}
        <RangeModal
          visible={modalVisible}
          dataEntry={selectedEntry}
          onClose={closeModal}
        />
        <DeleteModal
          visible={deleteModalVisible}
          dataEntry={selectedEntry}
          onClose={closeDeleteModal}
        />
        <FadeBackgroundView height={20} />
        <FlatList
          data={dataEntries}
          extraData={dataEntries}
          renderItem={({ item }) => {
            // must be called item for FlatList to work
            return (
              <RangeCard
                dataEntry={item}
                selectFunction={() => openModal(item)}
                showDeleteModal={() =>
                  openDeleteModal(item)
                }
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
          color={colors.TERTIARY as `#{string}`}
        />
      </View>
    </BGContainer>
  );
};

export default RangesList;
