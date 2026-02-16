import { FontAwesome } from "@expo/vector-icons";
import useRemoveHandFromReviews from "@src/hooks/useRemoveHandFromReviews";
import {
  selectTrainerState,
  setShowRemoveModal,
} from "@src/store/trainer";
import colors from "@src/utils/colors";
import screenDimensions from "@src/utils/screenDimensions";
import React from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { ModalText, ModalTitle } from "../AppText";
import AppModal from "./AppModal";
import { CloseButton, ModalButton } from "./ModalButtons";
import useTestCompleted from "@src/hooks/useTestCompleted";

const { base, tbase } = screenDimensions();

const RemoveModal = ({ visible }: { visible: boolean }) => {
  const { gridName, filteredHandsArray, index } =
    useSelector(selectTrainerState);

  const removeHandFromReviews = useRemoveHandFromReviews();
  const dispatch = useDispatch();
  const testCompleted = useTestCompleted();

  const onClose = () => {
    dispatch(setShowRemoveModal(false));
  };

  const handWillNoLongerBeReviewedMsg = () =>
    Toast.show({
      type: "success",
      text1: "Removed",
      text2: `This hand will no longer be reviewed`,
      visibilityTime: 2000,
      text1Style: { fontSize: 20 * tbase },
      text2Style: { fontSize: 17 * tbase },
    });

  const removeHand = () => {
    if (filteredHandsArray.length <= 3)
      Toast.show({
        type: "error",
        text1: "Denied",
        text2: `Cannot have less than 3 hands for review!`,
        visibilityTime: 2000,
        text1Style: { fontSize: 20 * tbase },
        text2Style: { fontSize: 17 * tbase },
      });
    else if (index + 1 === filteredHandsArray.length) {
      onClose();
      testCompleted();
      removeHandFromReviews(
        gridName,
        filteredHandsArray[index],
      );
      handWillNoLongerBeReviewedMsg();
    } else {
      removeHandFromReviews(
        gridName,
        filteredHandsArray[index],
      );
      onClose();
      handWillNoLongerBeReviewedMsg();
    }
  };

  return (
    <AppModal visible={visible}>
      <View style={{ width: "100%", alignItems: "center" }}>
        <ModalTitle
          style={{
            fontSize: 120 * tbase,
          }}
        >
          {filteredHandsArray[index]}
        </ModalTitle>
        <FontAwesome
          name="trash"
          size={60 * tbase}
          color={colors.C2}
        />
        <ModalText
          style={{
            fontSize: 18 * tbase,
            textAlign: "center",
            paddingVertical: 15 * base,
          }}
        >
          Is this hand too easy? Want to stop reviewing it?
          Press "Remove" to remove it from your learning
          data.
        </ModalText>
      </View>
      <ModalButton text="Remove" onPress={removeHand} />
      <CloseButton onClose={onClose} />
    </AppModal>
  );
};

export default RemoveModal;
