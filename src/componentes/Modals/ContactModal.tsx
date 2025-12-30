import appShadow from "@src/utils/appShadow";
import colors from "@src/utils/colors";
import screenDimensions from "@src/utils/screenDimensions";
import { Image, View } from "react-native";
import { ModalText, ModalTitle } from "../AppText";
import AppModal from "./AppModal";
import { ModalButton } from "./ModalButtons";
const myPic = require("@assets/img/myPic.jpg");

const { base } = screenDimensions();

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
      <ModalTitle>Contact</ModalTitle>
      <ModalText>Hi, I'm Jacob</ModalText>
      <View
        style={{
          borderRadius: 100 * base,
          ...appShadow(colors.CONTRAST_B, 20 * base),
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
            borderColor: colors.CONTRAST_A,
          }}
        />
      </View>
      <ModalText>
        and this is Griddier. I created this app to help
        students of the game memorize preflop ranges -
        perfectly! If you would like to get in touch:
      </ModalText>
      <ModalText>
        {"jacob@griddier.com \n +353 86 089 7326"}
      </ModalText>
      <ModalButton
        text="Close"
        onPress={onClose}
        shadow={colors.CONTRAST_A}
      />
    </AppModal>
  );
};

export default ContactModal;
