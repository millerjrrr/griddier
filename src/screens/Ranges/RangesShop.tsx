import { OrderedKeys } from "@assets/data/OrderedKeys";
import { WhiteTextBold } from "@src/componentes/AppText";
import BackNavigationButton from "@src/componentes/BackNavigationButton";
import FadeBackgroundView from "@src/componentes/FadeBackgroundView";
import RangeModal from "@src/componentes/Modals/RangeModal";
import RangeCard from "@src/componentes/RangeCard";
import {
  selectFilter,
  setFeedback,
} from "@src/store/trainer";
import { selectUserDataState } from "@src/store/userData";
import { DataEntry, GridName } from "@src/types";
import colors from "@src/utils/colors";
import { getRange } from "@src/utils/getRange";
import screenDimensions from "@src/utils/screenDimensions";
import { useState } from "react";
import { FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RangeListControls from "./components/RangeListControls";
import RangeListsBackground from "./components/RangeListsBackground";
const { base } = screenDimensions();

const RangesShop = () => {
  const { dataEntries } = useSelector(selectUserDataState);
  const filter = useSelector(selectFilter);
  const existingGridNames = new Set(
    dataEntries
      .filter((entry) => entry.dueDate !== "")
      .map((entry) => entry.gridName)
  );

  const individualHandDrillingData = {};

  let data: DataEntry[] = OrderedKeys.filter(
    (gridName) =>
      !existingGridNames.has(gridName as GridName)
  ).map((gridName) => ({
    gridName,
    dueDate: "",
    level: 0,
    drilled: 0,
    timeDrilling: 0,
    handsPlayed: 0,
    lastStudied: "",
    priority: OrderedKeys.indexOf(gridName) + 1,
    individualHandDrillingData,
  }));

  data = [
    ...data,
    ...dataEntries.filter((entry) => entry.dueDate === ""),
  ];

  if (filter.activated) {
    data = data.filter((entry) => {
      const spot = getRange(
        entry.gridName
      )?.spotDescription;
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

  const openModal = (entry: DataEntry) => {
    dispatch(setFeedback(false));
    setSelectedEntry(entry);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedEntry(null);
    setModalVisible(false);
  };

  return (
    <RangeListsBackground>
      <BackNavigationButton />
      <RangeListControls noPlus />
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
                  showStackSize
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
              No ranges to display for this filter
            </WhiteTextBold>
          </View>
        )}
        <FadeBackgroundView
          height={30 * base}
          position={"bottom"}
          color={colors.BG3 as `#${string}`}
        />
      </View>
    </RangeListsBackground>
  );
};

export default RangesShop;
