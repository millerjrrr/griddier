import {
  appShadow,
  typography,
} from "@/presentation/theme";
import colors from "@/presentation/theme/colors";
import { Image, Linking, Text, View } from "react-native";
import { AppTouchable } from "../../AppPressables";
import AppModal from "../../appModals/AppModal";
import { ModalButton } from "../../appModals/ModalButtons";
import getAppDimensions from "@/presentation/theme/appDimensions";
const QRcode = require("@assets/images/QRcode.png");

const { base } = getAppDimensions();

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
      <Text
        style={[
          typography.modalTitle,
          {
            fontStyle: "italic",
            fontWeight: "bold",
            color: colors.BG2,
          },
        ]}
      >
        GRIDDIER.COM
      </Text>
      <AppTouchable
        onPress={() =>
          Linking.openURL("https://griddier.com")
        }
        style={{
          borderRadius: 100 * base,
          ...appShadow("xl", colors.C2),
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
      <ModalButton text="Close" onPress={onClose} />
    </AppModal>
  );
};

export default QRModal;
