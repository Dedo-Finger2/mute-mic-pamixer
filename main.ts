const comand = new Deno.Command("pamixer", {
  args: [
    "--list-sources",
  ],
  stdout: "piped",
  stderr: "piped",
});

const virutalMicSourceString =
  '"audiorelay-virtual-mic-sink" "Running" "Virtual-Mic"';

const exec = comand.spawn();

const reader = exec.stdout.getReader();
const chunks = [];

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  chunks.push(value);
}

const allChunks = new Uint8Array(
  chunks.reduce((accumulator, chunk) => accumulator + chunk.length, 0),
);

let position = 0;

for (const chunk of chunks) {
  allChunks.set(chunk, position);
  position += chunk.length;
}

const textOutput = new TextDecoder().decode(allChunks);
const everySourceFound = textOutput.split("\n");

const virtualMicLine = everySourceFound.find((source) =>
  source.includes(virutalMicSourceString)
);
const virtualMicID = Number(virtualMicLine?.split(" ")[0].trim());

new Deno.Command("pamixer", {
  args: [
    "--source",
    virtualMicID.toString(),
    "-t",
  ],
}).spawn();
