import AdaptiveAppContainer from "@/presentation/components/layout/AdaptiveAppContainer";
import BGContainer from "@/presentation/components/layout/BGContainer";
import AppContainer from "@/presentation/navigation/AppContainer";
import getAppDimensions from "@/presentation/theme/appDimensions";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
const { base } = getAppDimensions();

export default function App() {
  return (
    <AdaptiveAppContainer>
      <BGContainer>
        <View
          style={{
            height: 30 * base,
          }}
        />
        <AppContainer />
        <StatusBar
          style="light"
          translucent
          backgroundColor="#00000000"
        />
      </BGContainer>
    </AdaptiveAppContainer>
  );
}
