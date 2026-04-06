import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import {
  FlatList,
  Platform,
  Text,
  View,
} from "react-native";
import { typography } from "../../theme";
import { useGetUserRangeData } from "../../hooks/useGetUserRangeData";
import RangeListControls from "@/presentation/components/RangeManagerComponents/RangeListControls";
import UserRangeDataCard from "@/presentation/components/RangeManagerComponents/UserRangeDataCard";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useRangesFilter } from "@/presentation/hooks/useRangesFilter";
import getAppDimensions from "@/presentation/theme/appDimensions";
const { base } = getAppDimensions();

const MyRanges = () => {
  const { data, reload } = useGetUserRangeData();

  const {
    filter,
    setFilter,
    clearFilter,
    filteredPokerRangeIds,
  } = useRangesFilter(data.map((range) => range.id));

  const filteredData = data.filter((range) =>
    filteredPokerRangeIds.includes(range.id),
  );

  useFocusEffect(
    useCallback(() => {
      reload();
    }, []),
  );

  const paddingTop = (filter.activated ? 160 : 50) * base;

  const ListContent = (
    <FlatList
      data={filteredData}
      renderItem={({ item }) => {
        return (
          <UserRangeDataCard
            dataEntry={item}
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
        paddingVertical: 20 * base,
        paddingHorizontal: 15 * base,
        backgroundColor: "transparent",
      }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop,
        paddingBottom: 80 * base,
      }}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <RangeListControls
        filter={filter}
        setFilter={setFilter}
        clearFilter={clearFilter}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {filteredData.length > 0 ? (
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
          <View
            style={{ flex: 1, paddingTop: paddingTop + 30 }}
          >
            <Text style={typography.title}>
              No user ranges yet
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default MyRanges;
