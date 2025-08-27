import { useEffect } from "react";
import usePlaySound from "./usePlaySound";

type KeyMap = Record<string, () => void>;

export const useKeyboardShortcuts = (keyMap: KeyMap) => {
  const playSound = usePlaySound();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (keyMap[key]) {
        e.preventDefault(); // prevent default browser behavior
        keyMap[key]();
        playSound();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [keyMap]);
};
