import RangeModal from "@src/componentes/Modals/RangeModal";
import FadeBackgroundView from "@src/componentes/FadeBackgroundView";
import RangeCard from "@src/componentes/RangeCard";
import { selectUserDataState } from "@src/store/userData";
import {
  DataEntry,
  RangesStackParamsList,
} from "@src/types";
import { useState } from "react";
import { FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BGContainer from "@src/componentes/BGContainer";
import colors from "@src/utils/colors";
import {
  selectFilter,
  setFeedback,
  updateFilter,
} from "@src/store/trainer";
import screenDimensions from "@src/utils/screenDimensions";
import BackNavigationButton from "@src/componentes/BackNavigationButton";
import FilterButton from "./components/FilterButton";
import FilterOptions from "./components/FilterOptions";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
const { base } = screenDimensions();

const RangesShop = () => {
  const { dataEntries } = useSelector(selectUserDataState);
  const filter = useSelector(selectFilter);
  let data = dataEntries.filter(
    (entry) => entry.dueDate === ""
  );

  if (filter.activated && filter.pos !== "")
    data = data.filter(
      (entry) => entry.gridName.slice(0, 2) === filter.pos
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

  const navigation =
    useNavigation<
      StackNavigationProp<RangesStackParamsList>
    >();

  const closeModal = () => {
    navigation.goBack();
    dispatch(updateFilter({ activated: false }));
    setSelectedEntry(null);
    setModalVisible(false);
  };

  return (
    <BGContainer>
      <BackNavigationButton />
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.PRIMARY,
          paddingBottom: 5,
        }}
      >
        <FilterButton />
        {filter.activated && <FilterOptions />}
      </View>
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
