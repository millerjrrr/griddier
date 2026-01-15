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

const { base } = screenDimensions();

const RemoveModal = ({ visible }: { visible: boolean }) => {
  const { gridName, filteredHandsArray, index } =
    useSelector(selectTrainerState);

  const removeHandFromReviews = useRemoveHandFromReviews();
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(setShowRemoveModal(false));
  };

  const removeHand = () => {
    removeHandFromReviews(
      gridName,
      filteredHandsArray[index]
    );

    onClose();
    Toast.show({
      type: "success",
      text1: "Removed",
      text2: `This hand will no longer be reviewed`,
      visibilityTime: 2000,
      text1Style: { fontSize: 20 * base },
      text2Style: { fontSize: 17 * base },
    });
  };

  return (
    <AppModal visible={visible}>
      <View style={{ width: "100%", alignItems: "center" }}>
        <ModalTitle
          style={{
            fontSize: 120 * base,
          }}
        >
          {filteredHandsArray[index]}
        </ModalTitle>
        <FontAwesome
          name="trash"
          size={60 * base}
          color={colors.C2}
        />
        <ModalText
          style={{
            fontSize: 18 * base,
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
