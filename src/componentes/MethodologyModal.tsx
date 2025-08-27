import appShadow from "@src/utils/appShadow";
import colors from "@src/utils/colors";
const icon = require("@assets/icon.png");
import {
  Image,
  Modal,
  ScrollView,
  Text,
  View,
} from "react-native";
import { AppPressable } from "./AppPressables";
import screenDimensions from "@src/utils/screenDimensions";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

const MethodologyModal: React.FC<ModalProps> = ({
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
            height: 0.9 * screenDimensions().height,
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
            Methodology
          </Text>
          <View
            style={{
              borderRadius: 15,
              ...appShadow(colors.CONTRAST, 20),
            }}
          >
            <Image
              source={icon}
              resizeMode="contain"
              style={{
                width: 100,
                height: 100,
                borderRadius: 15,
                margin: 8,
              }}
            />
          </View>
          <ScrollView
            style={{ height: "50%", width: "95%" }}
          >
            <Text
              style={{
                fontSize: 20,
                color: colors.CONTRAST,
                paddingBottom: 15,
              }}
            >
              Range memorization isn't about blindly
              following ranges but about having a good
              understanding about what we should be doing in
              theory so that we can deviate precisely in
              practice.
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: colors.CONTRAST,
                paddingBottom: 15,
              }}
            >
              Griddier provides a roadmap to range mastery!
            </Text>

            <Text
              style={{
                fontSize: 20,
                color: colors.CONTRAST,
                paddingBottom: 15,
              }}
            >
              Ranges are carefully designed and prioritized
              in order of importance.
            </Text>
            <Text
              style={{
                fontSize: 25,
                width: "100%",
                color: colors.CONTRAST,
                paddingBottom: 5,
              }}
            >
              1. Opening Ranges
            </Text>
            <Text
              style={{
                fontSize: 20,
                width: "100%",
                color: colors.CONTRAST,
                paddingBottom: 15,
              }}
            >
              Playing standard mid-stakes sizes for
              100-1kNL. In SB we play raise or fold.
            </Text>
            <Text
              style={{
                fontSize: 25,
                width: "100%",
                color: colors.CONTRAST,
                paddingBottom: 5,
              }}
            >
              2. SB 3bet
            </Text>
            <Text
              style={{
                fontSize: 20,
                width: "100%",
                color: colors.CONTRAST,
                paddingBottom: 15,
              }}
            >
              Starting out, I recommend using SB 3bet ranges
              from BB aswell, its a reasonable starting
              point. We'll learn BB 3betting later as its
              quite nuanced. At any rate, squeezing looks
              very much the same SB and BB and vs fish it is
              a good exploit to 3bet a slightly tighter SB
              3betting range from BB. Its an important intro
              to linear 3betting OOP.
            </Text>

            <Text
              style={{
                fontSize: 25,
                width: "100%",
                color: colors.CONTRAST,
                paddingBottom: 5,
              }}
            >
              3. HJ,CO 3bet
            </Text>
            <Text
              style={{
                fontSize: 20,
                width: "100%",
                color: colors.CONTRAST,
                paddingBottom: 15,
              }}
            >
              Next logical step, linear 3bettig IP. We don't
              play flats here.
            </Text>

            <Text
              style={{
                fontSize: 25,
                width: "100%",
                color: colors.CONTRAST,
                paddingBottom: 5,
              }}
            >
              4. And so on...
            </Text>
            <Text
              style={{
                fontSize: 20,
                width: "100%",
                color: colors.CONTRAST,
                paddingBottom: 15,
              }}
            >
              I intend to update this at a later date but
              suffice it to say, the progression continues
              logically
            </Text>
          </ScrollView>
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

export default MethodologyModal;
