import colors from "@/presentation/theme/colors";
import {
  appShadow,
  radius,
  spacing,
} from "@/presentation/theme";
import { ReactNode } from "react";
import getAppDimensions from "@/presentation/theme/appDimensions";
import { AppTouchable } from "../AppPressables";

const { base } = getAppDimensions();

const ControlButton: React.FC<{
  children: ReactNode;
  onPress: () => void;
}> = ({ children, onPress }) => {
  return (
    <AppTouchable
      style={{
        backgroundColor: colors.BG1,
        borderRadius: radius.sm,
        padding: spacing.xxs,
        marginHorizontal: spacing.xs,
        marginTop: spacing.xs,
        ...appShadow(),
      }}
      onPress={onPress}
    >
      {children}
    </AppTouchable>
  );
};

export default ControlButton;
