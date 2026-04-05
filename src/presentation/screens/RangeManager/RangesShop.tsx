import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import {
  FlatList,
  Platform,
  Text,
  View,
} from "react-native";
import { typography } from "../../theme";
import RangeCard from "../../components/RangeCard";
import { useGetPokerRanges } from "../../hooks/useGetPokerRanges";
import { upsertUserRangeDataEntryUseCase } from "@/container";
import { toLevel } from "@/domain/value-objects/Level";
import { toNonNegativeInteger } from "@/domain/value-objects/NonNegativeInteger";
import { StrictDateString } from "@/domain/value-objects/StrictDateString";
import RangeListsBackground from "@/presentation/components/RangeManagerComponents/RangeListsBackground";
import RangeListControls from "@/presentation/components/RangeManagerComponents/RangeListControls";
import BackNavigationButton from "@/presentation/components/BackNavigationButton";

const RangesShop = () => {
  const { data } = useGetPokerRanges();

  const ListContent = (
    <FlatList
      data={data}
      renderItem={({ item }) => {
        // must be called item for FlatList to work
        return (
          <RangeCard
            title={item.title}
            selectFunction={async () => {
              const today =
                "2026-04-05" as StrictDateString;

              const entry = {
                id: item.id,
                title: item.title,
                dueDate: today,
                level: toLevel(0),
                drilled: toNonNegativeInteger(0),
                timeDrilling: toNonNegativeInteger(0),
                handsPlayed: toNonNegativeInteger(0),
                lastStudied: today,
                individualHandDrillingData: {},
                featuredHandsArray: [],
              };

              await upsertUserRangeDataEntryUseCase.execute(
                entry,
              );

              console.log(
                item.id,
                item.title,
                "added to store",
              );

              console.log(entry);
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
      <BackNavigationButton />
      <RangeListControls noPlus />
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
              No ranges to display for this filter
            </Text>
          </View>
        )}
      </View>
    </RangeListsBackground>
  );
};

export default RangesShop;
