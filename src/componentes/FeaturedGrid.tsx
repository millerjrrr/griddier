import { GridData } from "@assets/data/GridData";
import store from "@src/store";
import { GridName, PokerHand } from "@src/types";
import colors from "@src/utils/colors";
import { handsArray } from "@src/utils/handsArrayLogic";
import screenDimensions from "@src/utils/screenDimensions";
import { Text, View } from "react-native";
import { AppPressable } from "./AppPressables";
import { useDispatch } from "react-redux";
import { updateDataEntry } from "@src/store/userData";
import { ModalButton } from "./Modals/ModalButtons";
import { FeaturedGridText } from "./AppText";
const { base } = screenDimensions();
const { C1, C2, BG2, BG3, BLUE } = colors;

const FeaturedCell: React.FC<{
  featured: boolean;
  hand: PokerHand;
  toggleFeatured: (hand: PokerHand) => void;
}> = ({ featured, hand, toggleFeatured }) => {
  return (
    <AppPressable
      style={{
        height: 30 * base,
        aspectRatio: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: featured ? BG2 : BG3,
        borderRadius: 3,
        borderWidth: 0.5,
        borderColor: C1,
      }}
      onPress={() => toggleFeatured(hand)}
    >
      <FeaturedGridText>{hand}</FeaturedGridText>
    </AppPressable>
  );
};

const FeaturedGrid: React.FC<{
  gridName: GridName;
  toggleEdit: () => void;
}> = ({ gridName, toggleEdit }) => {
  const state = store.getState();
  const dataEntry = state.userData.dataEntries.find(
    (e) => e.gridName === gridName
  );
  const dispatch = useDispatch();

  const featuredHandsArray =
    dataEntry?.featuredHandsArray ||
    GridData[gridName]?.featured ||
    handsArray;

  const toggleFeatured = (hand: PokerHand) => {
    dispatch(
      updateDataEntry({
        gridName,
        featuredHandsArray: featuredHandsArray.includes(
          hand
        )
          ? featuredHandsArray.filter((a) => a !== hand)
          : [hand, ...featuredHandsArray],
      })
    );
  };

  const resetToDefault = () => {
    dispatch(
      updateDataEntry({
        gridName,
        featuredHandsArray:
          GridData[gridName]?.featured || handsArray,
      })
    );
  };

  return (
    <View style={{ alignItems: "center", width: "100%" }}>
      {[...Array(13)].map((_, rowIdx) => (
        <View key={rowIdx} style={{ flexDirection: "row" }}>
          {[...Array(13)].map((_, colIdx) => {
            const i = rowIdx * 13 + colIdx;
            return (
              <FeaturedCell
                key={i}
                hand={handsArray[i]}
                featured={featuredHandsArray.includes(
                  handsArray[i]
                )}
                toggleFeatured={toggleFeatured}
              />
            );
          })}
        </View>
      ))}
      <ModalButton
        text="Reset"
        onPress={resetToDefault}
        scale={1}
        color={BG2}
        shadow={C2}
      />
      <ModalButton
        text="Close"
        onPress={toggleEdit}
        scale={0.7}
        color={BLUE}
        shadow={C2}
      />
    </View>
  );
};

export default FeaturedGrid;
