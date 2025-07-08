import { StatusBar } from "expo-status-bar";
import Trainer from "./src/componentes/trainer";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import store from "./src/store";
import Grid from "./src/componentes/Grid/Grid";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Trainer />
        {/* <Grid /> */}
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
