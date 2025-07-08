import FadeBackgroundView from "@src/componentes/FadeBackgroundView";
import RangeCard from "@src/componentes/RangeCard";
import { selectUserDataState } from "@src/store/userData";
import { FlatList, View } from "react-native";
import { useSelector } from "react-redux";

const RangesList = () => {
  const { dataEntries } = useSelector(selectUserDataState);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingVertical: 40,
      }}
    >
      <FadeBackgroundView height={20} style={{ top: 40 }} />
      <FlatList
        data={dataEntries}
        renderItem={({ item }) => {
          // must be called item for FlatList to work
          return <RangeCard dataEntry={item} />;
        }}
        keyExtractor={(item) => item.gridName}
        style={{
          flex: 1,
          width: "100%",
          paddingVertical: 20,
          paddingHorizontal: 15,
        }}
        showsVerticalScrollIndicator={false}
      />
      <FadeBackgroundView
        height={20}
        position={"bottom"}
        style={{ bottom: 40 }}
      />
    </View>
  );
};

export default RangesList;
