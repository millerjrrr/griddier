import {
  appShadow,
  typography,
} from "@/presentation/theme";
import colors from "@/presentation/theme/colors";
import { Image, Linking, Text, View } from "react-native";
import AppModal from "../../appModals/AppModal";
import { ModalButton } from "../../appModals/ModalButtons";
import getAppDimensions from "@/presentation/theme/appDimensions";
const myPic = require("@assets/images/myPic.jpg");

const { base } = getAppDimensions();

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ModalProps> = ({
  visible,
  onClose,
}) => {
  return (
    <AppModal visible={visible}>
      <Text style={typography.modalTitle}>Contact</Text>
      <Text style={typography.modalText}>
        Hi, I'm Jacob
      </Text>
      <View
        style={{
          borderRadius: 100 * base,
          ...appShadow("lg", colors.C2),
          margin: 8 * base,
        }}
      >
        <Image
          source={myPic}
          resizeMode="contain"
          style={{
            width: 100 * base,
            height: 100 * base,
            borderRadius: 100 * base,
            borderWidth: 2 * base,
            borderColor: colors.C1,
          }}
        />
      </View>
      <Text style={typography.modalText}>
        {
          "and this is Griddier. I created this app to help students of the game memorize preflop ranges - perfectly! Visit our website to get in touch."
        }
      </Text>
      <ModalButton
        text="Visit Website"
        onPress={() =>
          Linking.openURL("https://griddier.com")
        }
        scale={1}
      />
      <ModalButton text="Close" onPress={onClose} />
    </AppModal>
  );
};

export default ContactModal;
