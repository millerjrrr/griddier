import { WhiteTextBold } from "@src/componentes/AppText";
import FadeBackgroundView from "@src/componentes/FadeBackgroundView";
import DeleteModal from "@src/componentes/Modals/DeleteModal";
import RangeModal from "@src/componentes/Modals/RangeModal";
import RangeCard from "@src/componentes/RangeCard";
import {
  selectFilter,
  setFeedback,
} from "@src/store/trainer";
import { selectUserDataState } from "@src/store/userData";
import { DataEntry } from "@src/types";
import colors from "@src/utils/colors";
import { getRange } from "@src/utils/getRange";
import screenDimensions from "@src/utils/screenDimensions";
import { useState } from "react";
import { FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RangeListControls from "./components/RangeListControls";
const { base } = screenDimensions();

const MyRanges = () => {
  const { dataEntries } = useSelector(selectUserDataState);
  const filter = useSelector(selectFilter);
  let data = dataEntries.filter(
    (entry) => entry.dueDate !== ""
  );

  const showStackSize = !data.every(
    (entry) =>
      entry.gridName.slice(0, 3) ===
      data[0].gridName.slice(0, 3)
  );

  if (filter.activated) {
    data = data.filter((entry) => {
      const spot = getRange(entry.gridName).spotDescription;
      if (!spot) return false;

      return (
        (filter.pos === "" || spot.hero === filter.pos) &&
        (filter.action === "" ||
          spot.vsAction === filter.action) &&
        (filter.stack === "" ||
          spot.stacks === filter.stack)
      );
    });
  }

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
    <View style={{ flex: 1 }}>
      <RangeListControls />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
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
        {data.length > 0 ? (
          <FlatList
            data={data}
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
                  showStackSize={showStackSize}
                />
              );
            }}
            keyExtractor={(item) => item.gridName}
            style={{
              flex: 1,
              width: "100%",
              paddingVertical: 20 * base,
              paddingHorizontal: 15 * base,
              backgroundColor: "transparent",
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: filter.activated
                ? 160 * base
                : 50 * base,
              paddingBottom: 80 * base,
            }}
          />
        ) : (
          <View style={{ flex: 1, paddingTop: 50 * base }}>
            <WhiteTextBold s={24 * base}>
              No ranges to display
            </WhiteTextBold>
          </View>
        )}
      </View>
    </View>
  );
};

export default MyRanges;
