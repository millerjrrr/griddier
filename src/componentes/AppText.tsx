import colors from "@src/utils/colors";
import screenDimensions from "@src/utils/screenDimensions";
import { ReactNode } from "react";
import { Text } from "react-native";
import styled from "styled-components/native"; // <-- IMPORTANT
const { base } = screenDimensions();
const { C1, C2, C4 } = colors;

const AppText = styled.Text.attrs({
  allowFontScaling: false,
})``;

export const WhiteTextBold: React.FC<{
  s: number;
  color?: `#${string}`;
  children: ReactNode;
}> = ({ s, color = C1, children }) => {
  return (
    <Text
      style={{
        fontSize: s * base,
        color,
        fontWeight: "bold",
        textAlign: "center",
      }}
    >
      {children}
    </Text>
  );
};

export const SettingsCardText = styled(AppText)`
  font-size: ${25 * base}px;
  color: ${C1};
`;

export const InfoText = styled(AppText)`
  padding-left: ${5 * base}px;
  font-size: ${12 * base}px;
  margin-top: ${5 * base}px;
  margin-right: ${10 * base}px;
`;

export const InstructionText = styled(AppText)`
  padding-top: ${15 * base}px;
  font-size: ${18 * base}px;
  font-weight: bold;
  text-align: center;
`;

export const ModalTitle = styled(AppText)`
  font-weight: bold;
  font-size: ${35 * base}px;
  color: ${C2};
  padding-bottom: ${5 * base}px;
  text-align: center;
`;

export const ModalText = styled(AppText)`
  font-size: ${25 * base}px;
  color: ${C2};
  padding: ${8 * base}px;
  text-align: center;
`;

export const ModalSmallText = styled(AppText)`
  font-size: ${20 * base}px;
  color: ${C2};
  padding-bottom: ${15 * base}px;
`;

export const BetTag = styled(AppText)`
  font-size: ${20 * base}px;
  color: ${C1};
  padding-right: ${5 * base}px;
`;

export const ActionButtonText = styled(AppText)`
  font-size: ${25 * base}px;
  font-weight: bold;
  color: ${C4};
  text-align: center;
`;

export const ActionButtonTextSmall = styled(AppText)`
  font-size: ${15 * base}px;
  font-weight: bold;
  color: ${C4};
  text-align: center;
`;

export const GridCellText = styled(AppText)`
  font-weight: bold;
  color: ${C2};
`;

export const GridCellSubText = styled(AppText)`
  font-size: ${10 * base}px;
  font-weight: bold;
  color: ${C4};
`;

export const FeaturedGridText = styled(AppText)`
  font-size: ${12 * base}px;
  font-weight: bold;
  color: ${C1};
`;

export const FrequencyBarText = styled(AppText)`
  font-size: ${18 * base}px;
  color: ${C2};
`;
export const FrequencyBarCombosText = styled(AppText)`
  font-size: ${10 * base}px;
  color: ${C2};
`;

export const ClockText = styled(AppText)`
  font-size: ${20 * base}px;
  padding-left: ${5 * base}px;
  color: ${C1};
`;

export const StackSizeText = styled(AppText)`
  font-size: ${15 * base}px;
  font-weight: bold;
  color: ${C1};
  text-align: center;
`;

export const RangeCardTitleText = styled(AppText)`
  font-weight: bold;
  color: ${C1};
`;
