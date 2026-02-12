import appShadow from "@src/utils/appShadow";
import colors from "@src/utils/colors";
import screenDimensions from "@src/utils/screenDimensions";
import { Image, Linking, View } from "react-native";
import { AppTouchable } from "../AppPressables";
import { ModalText } from "../AppText";
import AppModal from "./AppModal";
import { ModalButton } from "./ModalButtons";
const QRcode = require("@assets/img/QRcode.png");

const { base } = screenDimensions();

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

const QRModal: React.FC<ModalProps> = ({
  visible,
  onClose,
}) => {
  return (
    <AppModal visible={visible}>
      <ModalText
        style={{
          fontStyle: "italic",
          fontWeight: "bold",
          color: colors.BG2,
        }}
      >
        GRIDDIER.COM
      </ModalText>
      <AppTouchable
        onPress={() =>
          Linking.openURL("https://griddier.com")
        }
        style={{
          borderRadius: 100 * base,
          ...appShadow(colors.C2, 20 * base),
          margin: 8 * base,
          position: "relative",
          marginBottom: 40 * base,
        }}
      >
        <Image
          source={QRcode}
          resizeMode="contain"
          style={{
            width: 300 * base,
            height: 300 * base,
          }}
          tintColor={colors.BG2}
        />
      </AppTouchable>
      <ModalButton
        text="Close"
        onPress={onClose}
        shadow={colors.C1}
      />
    </AppModal>
  );
};

export default QRModal;
