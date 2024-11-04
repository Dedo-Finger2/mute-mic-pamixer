export async function muteMicrophoneByID(id: number) {
  const command = new Deno.Command("pamixer", {
    args: [
      "--source",
      id.toString(),
      "-t",
    ],
  });
  const childProcess = command.spawn();
  await childProcess.status;
}
