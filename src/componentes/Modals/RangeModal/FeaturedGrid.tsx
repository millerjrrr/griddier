import { GridData } from "@assets/data/GridData";
import store from "@src/store";
import { updateDataEntry } from "@src/store/userData";
import { GridName, PokerHand } from "@src/types";
import colors from "@src/utils/colors";
import { handsArray } from "@src/utils/handsArrayLogic";
import screenDimensions from "@src/utils/screenDimensions";
import { View, ViewStyle } from "react-native";
import { useDispatch } from "react-redux";
import { AppPressable } from "../../AppPressables";
import { FeaturedGridText, ModalText } from "../../AppText";
import { ModalButton } from "../ModalButtons";
import Toast from "react-native-toast-message";
import { getRange } from "@src/utils/getRange";
const { base } = screenDimensions();
const { C1, C2, BG2, BG3, BLUE } = colors;

const FeaturedCell: React.FC<{
  featured: boolean;
  hand: PokerHand;
  toggleFeatured: (hand: PokerHand) => void;
  hidden: boolean;
}> = ({ featured, hand, toggleFeatured, hidden }) => {
  const style: ViewStyle = {
    height: 30 * base,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: featured ? BG2 : BG3,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: C1,
    opacity: hidden ? 0.3 : 1,
  };

  const props = {
    style,
    ...(!hidden && {
      onPress: () => toggleFeatured(hand),
    }),
  };

  const Container = hidden ? View : AppPressable;

  return (
    <Container {...props}>
      <FeaturedGridText>{hand}</FeaturedGridText>
    </Container>
  );
};

const FeaturedGrid: React.FC<{
  gridName: GridName;
  toggleEdit: () => void;
}> = ({ gridName, toggleEdit }) => {
  const state = store.getState();
  const dataEntry = state.userData.dataEntries.find(
    (e) => e.gridName === gridName,
  );
  const dispatch = useDispatch();

  const featuredHandsArray =
    dataEntry?.featuredHandsArray ||
    GridData[gridName]?.featured ||
    handsArray;

  const toggleFeatured = (hand: PokerHand) => {
    if (
      featuredHandsArray.length > 3 ||
      !featuredHandsArray.includes(hand)
    )
      dispatch(
        updateDataEntry({
          gridName,
          featuredHandsArray: featuredHandsArray.includes(
            hand,
          )
            ? featuredHandsArray.filter((a) => a !== hand)
            : [hand, ...featuredHandsArray],
        }),
      );
    else {
      Toast.show({
        type: "error",
        text1: "Denied",
        text2: `Cannot have less than 3 hands for review!`,
        visibilityTime: 2000,
        text1Style: { fontSize: 20 * base },
        text2Style: { fontSize: 17 * base },
      });
    }
  };

  const resetToDefault = () => {
    dispatch(
      updateDataEntry({
        gridName,
        featuredHandsArray:
          GridData[gridName]?.featured || handsArray,
      }),
    );
  };

  const range = getRange(gridName);

  const priorArray = handsArray.filter(
    (hand) => range.hands?.[hand].prior !== 0,
  );

  return (
    <View
      style={{
        alignItems: "center",
        width: "100%",
      }}
    >
      <View
        style={{
          alignItems: "center",
          width: "100%",
          paddingVertical: 20 * base,
        }}
      >
        {[...Array(13)].map((_, rowIdx) => (
          <View
            key={rowIdx}
            style={{ flexDirection: "row" }}
          >
            {[...Array(13)].map((_, colIdx) => {
              const i = rowIdx * 13 + colIdx;
              return (
                <FeaturedCell
                  key={i}
                  hand={handsArray[i]}
                  featured={featuredHandsArray.includes(
                    handsArray[i],
                  )}
                  toggleFeatured={toggleFeatured}
                  hidden={
                    !priorArray.includes(handsArray[i])
                  }
                />
              );
            })}
          </View>
        ))}
      </View>
      <ModalText>
        Use this Grid to select which hands you want to
        review
      </ModalText>
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
