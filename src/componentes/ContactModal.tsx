import appShadow from "@src/utils/appShadow";
import colors from "@src/utils/colors";
const myPic = require("@assets/img/myPic.jpg");

import { Image, Modal, Text, View } from "react-native";
import { AppPressable } from "./AppPressables";
import screenDimensions from "@src/utils/screenDimensions";

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
      <View
        style={{
          flex: 1,
          backgroundColor: "transparent",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            borderRadius: 12,
            padding: 15,
            width: 0.9 * screenDimensions().width,
            backgroundColor: colors.PRIMARY,
            alignItems: "center",
            ...appShadow(colors.CONTRAST),
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 35,
              color: colors.CONTRAST,
              paddingBottom: 5,
              textAlign: "center",
            }}
          >
            Contact
          </Text>
          <Text
            style={{
              fontSize: 25,
              color: colors.CONTRAST,
              paddingBottom: 5,
              textAlign: "center",
            }}
          >
            Hi, I'm Jacob
          </Text>
          <View
            style={{
              borderRadius: 100,
              ...appShadow(colors.CONTRAST, 20),
            }}
          >
            <Image
              source={myPic}
              resizeMode="contain"
              style={{
                width: 100,
                height: 100,
                borderRadius: 100,
                borderWidth: 2,
                borderColor: colors.CONTRAST,
                margin: 8,
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 25,
              color: colors.CONTRAST,
              paddingBottom: 15,
              textAlign: "center",
            }}
          >
            and this is Griddier. I created this app for me.
            Originally, I was using sheets to memorize
            preflop ranges. It worked very well but this is
            a little cleaner and a little nicer. I am
            currently seeking a partner to help me market
            this product
          </Text>
          <Text
            style={{
              fontSize: 25,
              color: colors.CONTRAST,
              paddingBottom: 5,
              textAlign: "center",
            }}
          >
            {"jacob@link-king.com \n +353 86 089 7326"}
          </Text>

          <AppPressable
            onPress={onClose}
            style={{
              backgroundColor: colors.SECONDARY,
              marginTop: 20,
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 8,
              width: "100%",
              ...appShadow(colors.CONTRAST),
            }}
          >
            <Text
              style={{
                color: colors.CONTRAST,
                textAlign: "center",
              }}
            >
              Close
            </Text>
          </AppPressable>
        </View>
      </View>
    </Modal>
  );
};

export default ContactModal;
