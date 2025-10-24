import RangeModal from "@src/componentes/Modals/RangeModal";
import FadeBackgroundView from "@src/componentes/FadeBackgroundView";
import RangeCard from "@src/componentes/RangeCard";
import { selectUserDataState } from "@src/store/userData";
import { DataEntry } from "@src/types";
import { useState } from "react";
import { FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BGContainer from "@src/componentes/BGContainer";
import colors from "@src/utils/colors";
import {
  selectFilter,
  setFeedback,
} from "@src/store/trainer";
import DeleteModal from "@src/componentes/Modals/DeleteModal";
import screenDimensions from "@src/utils/screenDimensions";
import RangeListControls from "./components/RangeListControls";
import { WhiteTextBold } from "@src/componentes/AppText";
import { SpotDescriptionMap } from "@assets/data/SpotDescriptionMap";
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
      const spot = SpotDescriptionMap[entry.gridName];
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
    <BGContainer>
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
        <FadeBackgroundView height={20 * base} />
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
        <FadeBackgroundView
          height={30 * base}
          position={"bottom"}
          color={colors.TERTIARY as `#${string}`}
        />
      </View>
    </BGContainer>
  );
};

export default MyRanges;
