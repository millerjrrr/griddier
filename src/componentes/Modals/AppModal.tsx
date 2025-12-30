import { Modal } from "react-native";
import { Container, Overlay } from "./ModalComponents";
import colors from "@src/utils/colors";
import { ReactNode } from "react";

const AppModal = ({
  backgroundColor = colors.BG4,
  visible,
  children,
}: {
  backgroundColor?: `#${string}`;
  visible: boolean;
  children: ReactNode;
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
    >
      <Overlay>
        <Container color={backgroundColor}>
          {children}
        </Container>
      </Overlay>
    </Modal>
  );
};

export default AppModal;
