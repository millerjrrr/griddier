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
  onPress = () =>
    console.log("AppPressable with undefined onPress"),
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
> = ({
  onPress = () =>
    console.log("AppTouchable with undefined onPress"),
  children,
  ...rest
}) => {
  const playSound = usePlaySound();

  const handlePress = (event: any) => {
    playSound();
    if (onPress) onPress(event);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
};
