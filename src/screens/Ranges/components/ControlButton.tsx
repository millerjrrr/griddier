import colors from "@src/utils/colors";
import appShadow from "@src/utils/appShadow";
import { AppTouchable } from "@src/componentes/AppPressables";
import { ReactNode } from "react";

const ControlButton: React.FC<{
  children: ReactNode;
  onPress: () => void;
}> = ({ children, onPress }) => {
  return (
    <AppTouchable
      style={{
        backgroundColor: colors.PRIMARY,
        borderRadius: 5,
        padding: 2,
        marginHorizontal: 5,
        marginTop: 4,
        ...appShadow(colors.CONTRAST),
      }}
      onPress={onPress}
    >
      {children}
    </AppTouchable>
  );
};

export default ControlButton;
