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
  const listSourcesChunks = [];
  while (true) {
    const { done, value } = await listSourcesStreamReader.read();
    if (done) break;
    listSourcesChunks.push(value);
  }
  const listSourcesUint8ArrayChunks = new Uint8Array(
    listSourcesChunks.reduce(
      (accumulator, chunk) => accumulator + chunk.length,
      0,
    ),
  );
  let chunkPosition = 0;
  for (const chunk of listSourcesChunks) {
    listSourcesUint8ArrayChunks.set(chunk, chunkPosition);
    chunkPosition += chunk.length;
  }
  return listSourcesUint8ArrayChunks;
}
