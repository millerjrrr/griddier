import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { AppState, View } from "react-native";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AdaptiveAppContainer from "./src/componentes/AdaptiveAppContainer";
import BGContainer from "./src/componentes/BGContainer";
import AppContainer from "./src/navigation/AppContainer";
import store, { persistor } from "./src/store";
import screenDimensions from "./src/utils/screenDimensions";
const { base } = screenDimensions();

// Final app version before re-write

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
      },
    );
    return () => sub.remove();
  }, []);

  return (
    <AdaptiveAppContainer key={appKey}>
      <BGContainer>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <View
              style={{
                height: 30 * base,
              }}
            />
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
