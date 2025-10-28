import LoadingScreen from "@src/componentes/LoadingScreen";
import useSetGridName from "@src/hooks/useSetGridName";
import { selectTrainerState } from "@src/store/trainer";
import { useSelector } from "react-redux";
import RootNavigator from "./RootNavigator";

const AppContainer = () => {
  const { appLoading } = useSelector(selectTrainerState);
  useSetGridName();

  return appLoading ? <LoadingScreen /> : <RootNavigator />;
};

export default AppContainer;
