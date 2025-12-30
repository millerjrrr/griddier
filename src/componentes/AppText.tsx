import colors from "@src/utils/colors";
import screenDimensions from "@src/utils/screenDimensions";
import { ReactNode } from "react";
import { Text } from "react-native";
import styled from "styled-components/native"; // <-- IMPORTANT
const { base } = screenDimensions();
const { CONTRAST_A } = colors;

export const WhiteTextBold: React.FC<{
  s: number;
  color?: `#${string}`;
  children: ReactNode;
}> = ({ s, color, children }) => {
  return (
    <Text
      style={{
        fontSize: s * base,
        color: color || CONTRAST_A,
        fontWeight: "bold",
        textAlign: "center",
      }}
    >
      {children}
    </Text>
  );
};

export const InfoText = styled.Text`
  padding-left: ${5 * base}px;
  font-size: ${12 * base}px;
  margin-top: ${5 * base}px;
  margin-right: ${10 * base}px;
`;

export const InstructionText = styled.Text`
  padding-top: ${15 * base}px;
  font-size: ${18 * base}px;
  font-weight: bold;
  text-align: center;
`;

export const ModalTitle = styled.Text`
  font-weight: bold;
  font-size: ${35 * base}px;
  color: ${colors.CONTRAST_B};
  padding-bottom: ${5 * base}px;
  text-align: center;
`;

export const ModalText = styled.Text`
  font-size: ${25 * base}px;
  color: ${colors.CONTRAST_B};
  padding: ${8 * base}px;
  text-align: center;
`;

export const ModalSmallText = styled.Text`
  font-size: ${20 * base}px;
  color: ${colors.CONTRAST_B};
  padding-bottom: ${15 * base}px;
`;

export const BetTag = styled.Text`
  font-size: ${20 * base}px;
  color: ${colors.CONTRAST_A};
  padding-right: ${5 * base}px;
`;
