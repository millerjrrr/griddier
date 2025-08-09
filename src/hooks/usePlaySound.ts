import { Audio, InterruptionModeIOS } from "expo-av";

const pop = require("assets/sounds/pop.wav");

type PlaySoundCallback = () => void;

const usePlaySound = () => {
  const playSound = async (
    file: number | { uri: string } = pop, // Can be require(...) or a URI object
    callback?: PlaySoundCallback
  ): Promise<void> => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true, // Forces audio even in silent mode
        staysActiveInBackground: true,
        interruptionModeIOS: InterruptionModeIOS.DoNotMix,
        shouldDuckAndroid: false,
        playThroughEarpieceAndroid: false,
      });

      const { sound } = await Audio.Sound.createAsync(file);
      const status = await sound.getStatusAsync();

      const duration =
        (status.isLoaded && status.durationMillis
          ? status.durationMillis
          : 0) + 200;

      setTimeout(async () => {
        await sound.unloadAsync();
        if (callback) callback();
      }, duration);

      await sound.playAsync();
    } catch (error) {
      console.log("Error playing sound:", error);
    }
  };

  return playSound;
};

export default usePlaySound;
