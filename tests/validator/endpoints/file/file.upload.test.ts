import { expect, test, describe } from "bun:test";
import CloudkyAPI from "../../../../src/cloudky-api";
import Blake2b from "@rabbit-company/blake2b";
import type { StandardResponse } from "../../../../src/types";
import { Error } from "../../../../src/errors";

const server = "http://localhost:8085";
const username = "test";
const token = Blake2b.hash("P@ssword123");
const destination = "test/HelloWorld.txt";
const fileContent = new Blob(["Hello, world! This is the file content."], { type: "text/plain" });

describe("file upload", () => {
	test("invalid server", async () => {
		const res: StandardResponse = await CloudkyAPI.uploadFile("invalid server", username, token, destination, fileContent);
		expect(res.error).toBe(Error.SERVER_UNREACHABLE);
	});

	test("invalid username", async () => {
		const res: StandardResponse = await CloudkyAPI.uploadFile(server, "test.test123", token, destination, fileContent);
		expect(res.error).toBe(Error.INVALID_USERNAME_FORMAT);
	});

	test("invalid token", async () => {
		const res: StandardResponse = await CloudkyAPI.uploadFile(server, username, "test", destination, fileContent);
		expect(res.error).toBe(Error.INVALID_TOKEN);
	});

	test("invalid destination", async () => {
		const res: StandardResponse = await CloudkyAPI.uploadFile(server, username, token, "../test.png", fileContent);
		expect(res.error).toBe(Error.INVALID_FILE_NAME);
	});

	test("invalid file content", async () => {
		const res: StandardResponse = await CloudkyAPI.uploadFile(server, username, token, destination, new Blob([], { type: "text/plain" }));
		expect(res.error).toBe(Error.INVALID_FILE);
	});
});
