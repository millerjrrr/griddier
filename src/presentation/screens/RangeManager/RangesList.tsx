import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import {
  FlatList,
  Platform,
  Text,
  View,
} from "react-native";
import RangeListsBackground from "../../components/RangeListsBackground";
import { typography } from "../../theme";
import RangeCard from "../../components/RangeCard";
import { useGetUserRangeData } from "../../hooks/useGetUserRangeData";

const RangesList = () => {
  const { data } = useGetUserRangeData();

  const ListContent = (
    <FlatList
      data={data}
      renderItem={({ item }) => {
        return (
          <RangeCard
            title={item.title}
            selectFunction={() => {
              console.log(
                item.id,
                item.title,
                "selected from user range list",
              );
            }}
          />
        );
      }}
      keyExtractor={(item) => String(item.id)}
      style={{
        flex: 1,
        width: "100%",
        paddingVertical: 20,
        paddingHorizontal: 15,
        backgroundColor: "transparent",
      }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: 50,
        paddingBottom: 80,
      }}
    />
  );

  return (
    <RangeListsBackground>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {data.length > 0 ? (
          Platform.OS === "web" ? (
            ListContent
          ) : (
            <MaskedView
              style={{ flex: 1 }}
              maskElement={
                <LinearGradient
                  colors={[
                    "transparent",
                    "black",
                    "black",
                    "transparent",
                  ]}
                  locations={[0, 0.15, 0.95, 1]}
                  style={{ flex: 1 }}
                />
              }
            >
              {ListContent}
            </MaskedView>
          )
        ) : (
          <View style={{ flex: 1, paddingTop: 50 }}>
            <Text style={typography.title}>
              No user ranges yet
            </Text>
          </View>
        )}
      </View>
    </RangeListsBackground>
  );
};

export default RangesList;
