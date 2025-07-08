import RangeCard from "@src/componentes/RangeCard";
import { selectUserDataState } from "@src/store/userData";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";

const RangesList = () => {
  const { dataEntries } = useSelector(selectUserDataState);

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingHorizontal: 15,
      }}
    >
      <RangeCard dataEntry={dataEntries[0]} />
    </ScrollView>
  );
};

export default RangesList;
