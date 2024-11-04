import { transformReadableStreamIntoUintArray } from "./transform-readable-stream-into-uint-array.ts";

export async function getAudioSouRcesFromPamixer(): Promise<Uint8Array> {
  const listSourcesCommand = new Deno.Command("pamixer", {
    args: [
      "--list-sources",
    ],
    stdout: "piped",
    stderr: "piped",
  });
  const listSourcesCommandChildProcess = listSourcesCommand.spawn();
  const listSourcesStreamReader = listSourcesCommandChildProcess.stdout
    .getReader();
  const listSourcesUint8ArrayChunks =
    await transformReadableStreamIntoUintArray(
      listSourcesStreamReader,
    );
  listSourcesCommandChildProcess.stderr.cancel();
  return listSourcesUint8ArrayChunks;
}
