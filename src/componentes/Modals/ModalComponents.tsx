import screenDimensions from "@src/utils/screenDimensions";
import { ReactNode } from "react";
import { Text, TextProps, View } from "react-native";
import { DataEntry } from "@src/types";
import LevelStars from "../LevelStars";
import styled from "styled-components";
import colors from "@src/utils/colors";
const { base, width } = screenDimensions();

export const Overlay: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </View>
  );
};

export const Container: React.FC<{
  color: `#${string}`;
  children: ReactNode;
}> = ({ color, children }) => {
  return (
    <View
      style={{
        padding: 10 * base,
        borderRadius: 12 * base,
        width: width * 0.9,
        backgroundColor: color,
        alignItems: "center",
      }}
    >
      {children}
    </View>
  );
};

export const RangeModalTitle: React.FC<{
  dataEntry: DataEntry;
}> = ({ dataEntry }) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize:
            dataEntry.gridName.length < 35 * base
              ? 25 * base
              : 20 * base,
          paddingBottom: 5 * base,
        }}
      >
        {dataEntry.gridName}
      </Text>
      {dataEntry.level > 0 && (
        <LevelStars stars={dataEntry.level} />
      )}
    </View>
  );
};

export const ModalTitle = styled(Text)`
  font-weight: bold;
  font-size: ${35 * base};
  color: ${colors.CONTRAST};
  padding-bottom: ${5 * base};
  text-align: center;
`;

export const ModalText = styled(Text)`
  font-size: ${25 * base};
  color: ${colors.CONTRAST};
  padding-bottom: ${5 * base};
  text-align: center;
`;

export const ModalSmallText = styled(Text)`
  font-size: ${20 * base};
  color: ${colors.CONTRAST};
  padding-bottom: ${15 * base};
`;
