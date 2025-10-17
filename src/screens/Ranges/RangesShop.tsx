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
import screenDimensions from "@src/utils/screenDimensions";
import BackNavigationButton from "@src/componentes/BackNavigationButton";
import RangeListControls from "./components/RangeListControls";
import { WhiteTextBold } from "@src/componentes/AppText";
import { SpotDescriptionMap } from "@assets/data/SpotDescriptionMap";
const { base } = screenDimensions();

const RangesShop = () => {
  const { dataEntries } = useSelector(selectUserDataState);
  const filter = useSelector(selectFilter);
  let data = dataEntries.filter(
    (entry) => entry.dueDate === ""
  );

  if (filter.activated && filter.pos !== "")
    data = data.filter(
      (entry) =>
        SpotDescriptionMap[entry.gridName]?.hero ===
        filter.pos
    );

  if (filter.activated && filter.action !== "")
    data = data.filter(
      (entry) =>
        SpotDescriptionMap[entry.gridName]?.vsAction ===
        filter.action
    );

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
    <BGContainer>
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
              No ranges to display for this filter
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

export default RangesShop;
