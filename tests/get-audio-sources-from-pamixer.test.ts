import { assertEquals } from "@std/assert";
import { getAudioSouRcesFromPamixer } from "../utils/get-audio-sources-from-pamixer.ts";

Deno.test("It should return an array of Uint8", async () => {
  const output = await getAudioSouRcesFromPamixer();

  assertEquals(output instanceof Uint8Array, true);
  assertEquals(output.length > 0, true);
});

