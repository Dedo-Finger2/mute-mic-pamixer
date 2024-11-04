import { assertEquals } from "@std/assert";
import { getMicrophoneIDByName } from "../utils/get-microphone-id-by-name.ts";

Deno.test("It should return the ID of the given microphone", () => {
  const wantedID = 113;
  const microphoneName = '"Testing" "Another test" "Final test"';
  const chunks = new TextEncoder().encode(
    '113 "Testing" "Another test" "Final test"',
  );

  const microphoneID = getMicrophoneIDByName(chunks, microphoneName);

  assertEquals(microphoneID, wantedID);
});
