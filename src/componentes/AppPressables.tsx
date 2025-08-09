// components/SoundButton.tsx
import React from "react";
import {
  Pressable,
  PressableProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import usePlaySound from "../hooks/usePlaySound";

export const AppPressable: React.FC<PressableProps> = ({
  onPress,
  children,
  ...rest
}) => {
  const playSound = usePlaySound();

  const handlePress = (event: any) => {
    playSound();
    if (onPress) onPress(event);
  };

  return (
    <Pressable onPress={handlePress} {...rest}>
      {children}
    </Pressable>
  );
};

export const AppTouchable: React.FC<
  TouchableOpacityProps
> = ({ onPress, children, ...rest }) => {
  const playSound = usePlaySound();

  const handlePress = (event: any) => {
    playSound();
    if (onPress) onPress(event);
  };

  return (
    <TouchableOpacity onPress={handlePress} {...rest}>
      {children}
    </TouchableOpacity>
  );
};
