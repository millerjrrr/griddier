import appShadow from "@src/utils/appShadow";
import colors from "@src/utils/colors";
const myPic = require("@assets/img/myPic.jpg");

import { Image, Modal, Text, View } from "react-native";
import { AppPressable } from "./AppPressables";
import screenDimensions from "@src/utils/screenDimensions";

const { base, width } = screenDimensions();

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
            width: 0.9 * width,
            backgroundColor: colors.PRIMARY,
            alignItems: "center",
            ...appShadow(colors.CONTRAST),
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 35 * base,
              color: colors.CONTRAST,
              paddingBottom: 5 * base,
              textAlign: "center",
            }}
          >
            Contact
          </Text>
          <Text
            style={{
              fontSize: 25 * base,
              color: colors.CONTRAST,
              paddingBottom: 5 * base,
              textAlign: "center",
            }}
          >
            Hi, I'm Jacob
          </Text>
          <View
            style={{
              borderRadius: 100 * base,
              ...appShadow(colors.CONTRAST, 20 * base),
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
          <Text
            style={{
              fontSize: 25 * base,
              color: colors.CONTRAST,
              paddingBottom: 15 * base,
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
              fontSize: 25 * base,
              color: colors.CONTRAST,
              paddingBottom: 5 * base,
              textAlign: "center",
            }}
          >
            {"jacob@link-king.com \n +353 86 089 7326"}
          </Text>

          <AppPressable
            onPress={onClose}
            style={{
              backgroundColor: colors.SECONDARY,
              marginTop: 20 * base,
              paddingVertical: 12 * base,
              paddingHorizontal: 20 * base,
              borderRadius: 8 * base,
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
