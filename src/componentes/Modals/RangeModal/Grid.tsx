import { OrderedKey } from "@assets/data/OrderedKeys";
import { RangeIdMap } from "@assets/data/RangeIdMap";
import { RangeImages } from "@assets/data/rangeImageMap";
import appShadow from "@src/utils/appShadow";
import screenDimensions from "@src/utils/screenDimensions";
import React from "react";
import { Image, View } from "react-native";
import { GridName } from "../../../types";

interface GridProps {
  name: GridName;
}

const { width } = screenDimensions();

const Grid: React.FC<GridProps> = ({ name }) => {
  const source =
    RangeImages[RangeIdMap[name as OrderedKey]];

  return (
    <View
      style={{
        ...appShadow("#000000"),
        justifyContent: "center",
        alignItems: "center",
        width: 0.85 * width,
      }}
    >
      <Image
        source={source}
        style={{
          width: 0.85 * width,
          height: 0.85 * width,
          opacity: 0.95,
        }}
        resizeMode="contain"
      />
    </View>
  );
};

export default Grid;
