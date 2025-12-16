import colors from "@src/utils/colors";
import appShadow from "@src/utils/appShadow";
import { AppTouchable } from "@src/componentes/AppPressables";
import { ReactNode } from "react";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const ControlButton: React.FC<{
  children: ReactNode;
  onPress: () => void;
}> = ({ children, onPress }) => {
  return (
    <AppTouchable
      style={{
        backgroundColor: colors.BG1,
        borderRadius: 5 * base,
        padding: 2 * base,
        marginHorizontal: 5 * base,
        marginTop: 4 * base,
        ...appShadow(colors.CONTRAST_A),
      }}
      onPress={onPress}
    >
      {children}
    </AppTouchable>
  );
};

export default ControlButton;
