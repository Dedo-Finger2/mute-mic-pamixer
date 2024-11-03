import { muteMicrophoneByID } from "./utils/mute-microphone-by-id.ts";
import { getMicrophoneIDByName } from "./utils/get-microphone-id-by-name.ts";
import { getAudioSouRcesFromPamixer } from "./utils/get-audio-souRces-from-pamixer.ts";

const virutalMicSourceString =
  '"audiorelay-virtual-mic-sink" "Running" "Virtual-Mic"';

const audioSources = await getAudioSouRcesFromPamixer();
const microphoneID = getMicrophoneIDByName(
  audioSources,
  virutalMicSourceString,
);
muteMicrophoneByID(microphoneID);
