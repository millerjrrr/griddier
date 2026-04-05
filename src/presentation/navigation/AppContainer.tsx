import LoadingScreen from "../screens/LoadingScreen";
import RootNavigator from "./RootNavigator";

const AppContainer = () => {
  const appLoading = false;
  // will implement later

  return appLoading ? <LoadingScreen /> : <RootNavigator />;
};

export default AppContainer;
