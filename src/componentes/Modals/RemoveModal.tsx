import { FontAwesome } from "@expo/vector-icons";
import useRemoveHandFromReviews from "@src/hooks/useRemoveHandFromReviews";
import {
  selectTrainerState,
  setShowRemoveModal,
} from "@src/store/trainer";
import appShadow from "@src/utils/appShadow";
import colors from "@src/utils/colors";
import screenDimensions from "@src/utils/screenDimensions";
import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
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
    <Modal
      visible={visible}
      transparent
      animationType="slide"
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.content,
            { backgroundColor: colors.BG4 },
          ]}
        >
          <View
            style={{ width: "100%", alignItems: "center" }}
          >
            <Text
              style={{
                fontSize: 150 * base,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {filteredHandsArray[index]}
            </Text>
            <FontAwesome
              name="trash"
              size={50 * base}
              color={colors.CONTRAST_B}
            />
            <Text
              style={{
                fontSize: 18 * base,
                textAlign: "center",
                paddingVertical: 15 * base,
              }}
            >
              Is this hand too easy? Want to stop reviewing
              it? Press "Remove" to remove it from your
              learning data.
            </Text>
          </View>
          <ModalButton text="Remove" onPress={removeHand} />
          <CloseButton onClose={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 10 * base,
    borderRadius: 12 * base,
    width: "95%",
  },
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10 * base,
  },
});

export default RemoveModal;
