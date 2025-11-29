import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import store, { persistor } from "./src/store";
import { PersistGate } from "redux-persist/integration/react";
import Toast from "react-native-toast-message";
import { AppState, Platform, View } from "react-native";
import BGContainer from "./src/componentes/BGContainer";
import AdaptiveAppContainer from "./src/componentes/AdaptiveAppContainer";
import { useEffect, useRef, useState } from "react";
import AppContainer from "./src/navigation/AppContainer";
import screenDimensions from "./src/utils/screenDimensions";
const { base } = screenDimensions();

export default function App() {
  // Force app to reload when focused
  const [appKey, setAppKey] = useState(0);
  const appState = useRef(AppState.currentState);
  useEffect(() => {
    const sub = AppState.addEventListener(
      "change",
      (next) => {
        if (
          appState.current.match(/inactive|background/) &&
          next === "active"
        ) {
          // Increment key to force remount
          setAppKey((k) => k + 1);
        }
        appState.current = next;
      }
    );
    return () => sub.remove();
  }, []);

  return (
    <AdaptiveAppContainer key={appKey}>
      <BGContainer>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {Platform.OS !== "web" && (
              <View style={{ height: 30 * base }} />
            )}
            <AppContainer />
            <Toast />
            <StatusBar
              style="light"
              translucent
              backgroundColor="#00000000"
            />
          </PersistGate>
        </Provider>
      </BGContainer>
    </AdaptiveAppContainer>
  );
}
