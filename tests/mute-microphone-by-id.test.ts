import { assertEquals } from "@std/assert";
import { muteMicrophoneByID } from "../utils/mute-microphone-by-id.ts";
import { getMicrophoneIDByName } from "../utils/get-microphone-id-by-name.ts";
import { getAudioSouRcesFromPamixer } from "../utils/get-audio-sources-from-pamixer.ts";
import { transformReadableStreamIntoUintArray } from "../utils/transform-readable-stream-into-uint-array.ts";

async function getIfMicrophoneIsMuted(microphoneID: number): Promise<string> {
  const getMuteCommand = new Deno.Command("pamixer", {
    args: ["--source", microphoneID.toString(), "--get-mute"],
    stdout: "piped",
  });
  const muteMicrophoneChildProcess = getMuteCommand.spawn();
  const isMicrophoneMuted = new TextDecoder().decode(
    await transformReadableStreamIntoUintArray(
      muteMicrophoneChildProcess.stdout.getReader(),
    ),
  );
  await muteMicrophoneChildProcess.status;
  return isMicrophoneMuted.trim();
}

Deno.test("It should toggle mute on microphone by it's ID", async () => {
  const chunks = await getAudioSouRcesFromPamixer();
  const microphoneID = getMicrophoneIDByName(
    chunks,
    '"audiorelay-virtual-mic-sink" "Running" "Virtual-Mic"',
  );
  const isMicrophoneMuted = await getIfMicrophoneIsMuted(microphoneID);
  if (isMicrophoneMuted === "true") {
    const isMicrophoneMuted = await getIfMicrophoneIsMuted(microphoneID);
    await muteMicrophoneByID(microphoneID);
    assertEquals(isMicrophoneMuted, "true");
  } else {
    const isMicrophoneMuted = await getIfMicrophoneIsMuted(microphoneID);
    await muteMicrophoneByID(microphoneID);
    assertEquals(isMicrophoneMuted, "false");
  }
});
