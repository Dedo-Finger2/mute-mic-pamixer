export function getMicrophoneIDByName(
  chunks: Uint8Array,
  microphoneName: string,
): number {
  const textOutput = new TextDecoder().decode(chunks);
  const audioSourcesSplitted = textOutput.split("\n");

  const wantedMicrophoneLine = audioSourcesSplitted.find((source) =>
    source.includes(microphoneName)
  );
  const microphoneID = Number(wantedMicrophoneLine?.split(" ")[0].trim());
  return microphoneID;
}
