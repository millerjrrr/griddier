import RangesList from "@/presentation/screens/RangeManager/RangesList";
import RangesShop from "@/presentation/screens/RangeManager/RangesShop";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <RangesShop /> */}
      <RangesList />
      <StatusBar style="dark" />
    </View>
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
