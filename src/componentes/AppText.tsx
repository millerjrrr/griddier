import colors from "@src/utils/colors";
import screenDimensions from "@src/utils/screenDimensions";
import { ReactNode } from "react";
import { Text, TextStyle } from "react-native";
import styled from "styled-components";
const { base } = screenDimensions();
const { WHITE } = colors;

export const WhiteTextBold: React.FC<{
  s: number;
  children: ReactNode;
}> = ({ s, children }) => {
  return (
    <Text
      style={{
        fontSize: s * base,
        color: WHITE,
        fontWeight: "bold",
        textAlign: "center",
      }}
    >
      {children}
    </Text>
  );
};

export const InfoText = styled(Text)`
  padding-left: ${5 * base}px;
  font-size: ${12 * base}px;
  margin-top: ${5 * base}px;
  margin-right: ${10 * base}px;
`;

export const InstructionText = styled(Text)`
  padding-top: ${15 * base}px;
  font-size: ${18 * base}px;
  font-weight: bold;
  text-align: center;
`;
