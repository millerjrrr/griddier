import colors from "@/presentation/theme/colors";
import returnFrequencyArray from "@/utils/returnFrequencyArray";
import {
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import AppModal from "@/presentation/components/appModals/AppModal";
import LevelHistogram from "./LevelHistogram";
import StatsContainer from "./StatsContainer";
import { ModalButton } from "./../../../appModals/ModalButtons";
import getAppDimensions from "@/presentation/theme/appDimensions";
import { typography } from "@/presentation/theme";
import { useGetUserRangeData } from "@/presentation/hooks/useGetUserRangeData";

const { appWidth } = getAppDimensions();

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

const StudyDataModal: React.FC<ModalProps> = ({
  visible,
  onClose,
}) => {
  const { data } = useGetUserRangeData();
  const dataEntries = Object.values(data);
  const levelsArray = dataEntries.map(
    (entry) => entry.level,
  );
  const frequencies = returnFrequencyArray(levelsArray);
  const showHist = frequencies.length > 2;

  return (
    <AppModal visible={visible}>
      <Text style={typography.modalTitle}>
        Your Study Data
      </Text>
      <ScrollView
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={Platform.OS !== "web"}
      >
        <View style={{ width: "100%", padding: 15 }}>
          {showHist ? (
            <LevelHistogram
              levelsArray={levelsArray}
              histHeight={appWidth * 0.7}
            />
          ) : (
            <View style={{ paddingBottom: 15 }}>
              <Text style={typography.modalTitle}>
                After you have done a bit of study you can
                track your progress here
              </Text>
            </View>
          )}
          <StatsContainer />
        </View>
      </ScrollView>

      <ModalButton text="Close" onPress={onClose} />
    </AppModal>
  );
};

export default StudyDataModal;
