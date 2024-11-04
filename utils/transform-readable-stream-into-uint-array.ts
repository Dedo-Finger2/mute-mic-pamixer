export async function transformReadableStreamIntoUintArray(
  reader: ReadableStreamDefaultReader<Uint8Array>,
): Promise<Uint8Array> {
  const chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  const uint8ArrayChunks = new Uint8Array(
    chunks.reduce(
      (accumulator, chunk) => accumulator + chunk.length,
      0,
    ),
  );
  let chunkPosition = 0;
  for (const chunk of chunks) {
    uint8ArrayChunks.set(chunk, chunkPosition);
    chunkPosition += chunk.length;
  }
  return uint8ArrayChunks;
}
