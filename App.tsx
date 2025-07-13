import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import store, { persistor } from "./src/store";
import RootNavigator from "./src/navigation/RootNavigator";
import { PersistGate } from "redux-persist/integration/react";
import Toast from "react-native-toast-message";
import { View } from "react-native";
import BGContainer from "./src/componentes/BGContainer";

export default function App() {
  return (
    <BGContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={{ height: 25 }} />
          <RootNavigator />
          <Toast />
          <StatusBar style="auto" />
        </PersistGate>
      </Provider>
    </BGContainer>
  );
}
