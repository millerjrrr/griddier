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
import { AppPressable } from "../AppPressables";
import screenDimensions from "@src/utils/screenDimensions";
import {
  Container,
  ModalSmallText,
  ModalText,
  ModalTitle,
  Overlay,
} from "./ModalComponents";
import { ModalButton } from "./ModalButtons";

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
      <Overlay>
        <Container color={colors.PRIMARY}>
          <ModalTitle>Methodology</ModalTitle>
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
            <ModalSmallText>
              Range memorization isn't about blindly
              following ranges but about having a good
              understanding about what we should be doing in
              theory so that we can deviate precisely in
              practice.
            </ModalSmallText>
            <ModalSmallText>
              Griddier provides a roadmap to range mastery!
            </ModalSmallText>

            <ModalSmallText>
              Ranges are carefully designed and prioritized
              in order of importance.
            </ModalSmallText>
            <ModalSmallText
              style={{
                fontSize: 25 * base,
                width: "100%",
                color: colors.CONTRAST,
                paddingBottom: 5 * base,
              }}
            >
              1. Opening Ranges
            </ModalSmallText>
            <ModalSmallText>
              Playing standard mid-stakes sizes for
              100-1kNL. In SB we play raise or fold.
            </ModalSmallText>
            <ModalSmallText
              style={{
                fontSize: 25 * base,
                width: "100%",
                color: colors.CONTRAST,
                paddingBottom: 5 * base,
              }}
            >
              2. SB 3bet
            </ModalSmallText>
            <ModalSmallText>
              Starting out, I recommend using SB 3bet ranges
              from BB aswell, its a reasonable starting
              point. We'll learn BB 3betting later as its
              quite nuanced. At any rate, squeezing looks
              very much the same SB and BB and vs fish it is
              a good exploit to 3bet a slightly tighter SB
              3betting range from BB. Its an important intro
              to linear 3betting OOP.
            </ModalSmallText>

            <ModalSmallText
              style={{
                fontSize: 25 * base,
                width: "100%",
                color: colors.CONTRAST,
                paddingBottom: 5 * base,
              }}
            >
              3. HJ,CO 3bet
            </ModalSmallText>
            <ModalSmallText>
              Next logical step, linear 3bettig IP. We don't
              play flats here.
            </ModalSmallText>

            <ModalSmallText
              style={{
                fontSize: 25 * base,
                width: "100%",
                color: colors.CONTRAST,
                paddingBottom: 5 * base,
              }}
            >
              4. And so on...
            </ModalSmallText>
            <ModalSmallText>
              I intend to update this at a later date but
              suffice it to say, the progression continues
              logically
            </ModalSmallText>
          </ScrollView>
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

export default MethodologyModal;
