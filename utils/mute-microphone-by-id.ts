export function muteMicrophoneByID(id: number) {
  new Deno.Command("pamixer", {
    args: [
      "--source",
      id.toString(),
      "-t",
    ],
  }).spawn();
}
