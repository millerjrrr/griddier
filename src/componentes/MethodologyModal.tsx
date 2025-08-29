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
const { base } = screenDimensions();

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
            borderRadius: 12 * base,
            padding: 15 * base,
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
              fontSize: 35 * base,
              color: colors.CONTRAST,
              paddingBottom: 5 * base,
              textAlign: "center",
            }}
          >
            Methodology
          </Text>
          <View
            style={{
              borderRadius: 15 * base,
              ...appShadow(colors.CONTRAST, 20 * base),
            }}
          >
            <Image
              source={icon}
              resizeMode="contain"
              style={{
                width: 100 * base,
                height: 100 * base,
                borderRadius: 15 * base,
                margin: 8 * base,
              }}
            />
          </View>
          <ScrollView
            style={{ height: "50%", width: "95%" }}
          >
            <Text
              style={{
                fontSize: 20 * base,
                color: colors.CONTRAST,
                paddingBottom: 15 * base,
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
                fontSize: 20 * base,
                color: colors.CONTRAST,
                paddingBottom: 15 * base,
              }}
            >
              Griddier provides a roadmap to range mastery!
            </Text>

            <Text
              style={{
                fontSize: 20 * base,
                color: colors.CONTRAST,
                paddingBottom: 15 * base,
              }}
            >
              Ranges are carefully designed and prioritized
              in order of importance.
            </Text>
            <Text
              style={{
                fontSize: 25 * base,
                width: "100%",
                color: colors.CONTRAST,
                paddingBottom: 5 * base,
              }}
            >
              1. Opening Ranges
            </Text>
            <Text
              style={{
                fontSize: 20 * base,
                width: "100%",
                color: colors.CONTRAST,
                paddingBottom: 15 * base,
              }}
            >
              Playing standard mid-stakes sizes for
              100-1kNL. In SB we play raise or fold.
            </Text>
            <Text
              style={{
                fontSize: 25 * base,
                width: "100%",
                color: colors.CONTRAST,
                paddingBottom: 5 * base,
              }}
            >
              2. SB 3bet
            </Text>
            <Text
              style={{
                fontSize: 20 * base,
                width: "100%",
                color: colors.CONTRAST,
                paddingBottom: 15 * base,
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
                fontSize: 25 * base,
                width: "100%",
                color: colors.CONTRAST,
                paddingBottom: 5 * base,
              }}
            >
              3. HJ,CO 3bet
            </Text>
            <Text
              style={{
                fontSize: 20 * base,
                width: "100%",
                color: colors.CONTRAST,
                paddingBottom: 15 * base,
              }}
            >
              Next logical step, linear 3bettig IP. We don't
              play flats here.
            </Text>

            <Text
              style={{
                fontSize: 25 * base,
                width: "100%",
                color: colors.CONTRAST,
                paddingBottom: 5 * base,
              }}
            >
              4. And so on...
            </Text>
            <Text
              style={{
                fontSize: 20 * base,
                width: "100%",
                color: colors.CONTRAST,
                paddingBottom: 15 * base,
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

export default MethodologyModal;
