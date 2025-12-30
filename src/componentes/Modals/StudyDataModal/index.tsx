import { selectUserDataState } from "@src/store/userData";
import colors from "@src/utils/colors";
import returnFrequencyArray from "@src/utils/returnFrequencyArray";
import screenDimensions from "@src/utils/screenDimensions";
import { Platform, ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { ModalTitle, WhiteTextBold } from "../../AppText";
import AppModal from "../AppModal";
import { ModalButton } from "../ModalButtons";
import LevelHistogram from "./LevelHistogram";
import StatsContainer from "./StatsContainer";

const { width } = screenDimensions();

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

const StudyDataModal: React.FC<ModalProps> = ({
  visible,
  onClose,
}) => {
  const { dataEntries } = useSelector(selectUserDataState);
  const levelsArray = dataEntries.map(
    (entry) => entry.level
  );
  const frequencies = returnFrequencyArray(levelsArray);
  const showHist = frequencies.length > 2;

  return (
    <AppModal visible={visible}>
      <ModalTitle>Your Study Data</ModalTitle>
      <ScrollView
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={Platform.OS !== "web"}
      >
        <View style={{ width: "100%", padding: 15 }}>
          {showHist ? (
            <LevelHistogram
              levelsArray={levelsArray}
              histHeight={width * 0.7}
            />
          ) : (
            <View style={{ paddingBottom: 15 }}>
              <WhiteTextBold s={20}>
                After you have done a bit of study you can
                track your progress here
              </WhiteTextBold>
            </View>
          )}
          <StatsContainer />
        </View>
      </ScrollView>

      <ModalButton
        text="Close"
        onPress={onClose}
        shadow={colors.CONTRAST_A}
      />
    </AppModal>
  );
};

export default StudyDataModal;
