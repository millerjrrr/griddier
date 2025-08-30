import appShadow from "@src/utils/appShadow";
import colors from "@src/utils/colors";
const myPic = require("@assets/img/myPic.jpg");
import { Image, Modal, View } from "react-native";
import screenDimensions from "@src/utils/screenDimensions";
import { Container, Overlay } from "./ModalComponents";
import { ModalButton } from "./ModalButtons";
import { ModalText, ModalTitle } from "../AppText";

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
    <Modal
      visible={visible}
      transparent
      animationType="slide"
    >
      <Overlay>
        <Container color={colors.PRIMARY}>
          <ModalTitle>Contact</ModalTitle>
          <ModalText>Hi, I'm Jacob</ModalText>
          <View
            style={{
              borderRadius: 100 * base,
              ...appShadow(colors.CONTRAST, 20 * base),
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
                borderColor: colors.CONTRAST,
              }}
            />
          </View>
          <ModalText>
            and this is Griddier. I created this app for me.
            Originally, I was using sheets to memorize
            preflop ranges. It worked very well but this is
            a little cleaner and a little nicer. I am
            currently seeking a partner to help me market
            this product
          </ModalText>
          <ModalText>
            {"jacob@link-king.com \n +353 86 089 7326"}
          </ModalText>
          <ModalButton
            text="Close"
            onPress={onClose}
            shadow={colors.CONTRAST}
          />
        </Container>
      </Overlay>
    </Modal>
  );
};

export default ContactModal;
