import {
  appShadow,
  typography,
} from "@/presentation/theme";
import {
  Image,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

import AppModal from "../../appModals/AppModal";
import { ModalButton } from "../../appModals/ModalButtons";
import getAppDimensions from "@/presentation/theme/appDimensions";
import colors from "@/presentation/theme/colors";
const icon = require("assets/icon.png");
const { appHeight, appWidth, base, textBase } =
  getAppDimensions();

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

const MethodologyModal: React.FC<ModalProps> = ({
  visible,
  onClose,
}) => {
  return (
    <AppModal visible={visible}>
      <Text style={typography.modalTitle}>Methodology</Text>
      <View
        style={{
          borderRadius: 15 * base,
          ...appShadow("md", colors.C2),
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
        style={
          Platform.OS === "web"
            ? {
                height: 0.5 * appHeight,
                width: 0.8 * appWidth,
              }
            : {
                height: "50%",
                width: "95%",
              }
        }
      >
        <Text style={typography.modalTextLeft}>
          Range memorization isn't about blindly following
          ranges but about having a good understanding about
          what we should be doing in theory so that we can
          deviate precisely in practice.
        </Text>
        <Text style={typography.modalTextLeft}>
          Griddier provides a roadmap to range mastery!
        </Text>

        <Text style={typography.modalTextLeft}>
          Ranges are carefully designed and prioritized in
          order of importance.
        </Text>
        <Text style={[typography.modalTextLeft]}>
          1. Opening Ranges
        </Text>
        <Text style={typography.modalSmallText}>
          Playing standard mid-stakes sizes for 100-1kNL. In
          SB we play raise or fold.
        </Text>
        <Text
          style={[
            typography.modalSmallText,
            {
              fontSize: 25 * textBase,
              width: "100%",
              paddingBottom: 5 * base,
            },
          ]}
        >
          2. SB 3bet
        </Text>
        <Text style={typography.modalSmallText}>
          Starting out, I recommend using SB 3bet ranges
          from BB aswell, its a reasonable starting point.
          We'll learn BB 3betting later as its quite
          nuanced. At any rate, squeezing looks very much
          the same SB and BB and vs fish it is a good
          exploit to 3bet a slightly tighter SB 3betting
          range from BB. Its an important intro to linear
          3betting OOP.
        </Text>

        <Text
          style={[
            typography.modalSmallText,
            {
              fontSize: 25 * textBase,
              width: "100%",
              paddingBottom: 5 * base,
            },
          ]}
        >
          3. HJ,CO 3bet
        </Text>
        <Text style={typography.modalSmallText}>
          Next logical step, linear 3bettig IP. We don't
          play flats here.
        </Text>

        <Text
          style={[
            typography.modalSmallText,
            {
              fontSize: 25 * textBase,
              width: "100%",
              paddingBottom: 5 * base,
            },
          ]}
        >
          4. And so on...
        </Text>
        <Text style={typography.modalSmallText}>
          I intend to update this at a later date but
          suffice it to say, the progression continues
          logically
        </Text>
      </ScrollView>
      <ModalButton text="Close" onPress={onClose} />
    </AppModal>
  );
};

export default MethodologyModal;
