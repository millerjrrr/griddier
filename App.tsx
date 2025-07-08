import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import store, { persistor } from "./src/store";
import RootNavigator from "./src/navigation/RootNavigator";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
        <StatusBar style="auto" />
      </PersistGate>
    </Provider>
  );
}
