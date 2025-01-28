import { expect, test, describe } from "bun:test";
import { Blake2b, CloudkyAPI, Error, type StandardResponse } from "../../../../src/cloudky-api";
import { StorageType } from "../../../../src/types";

const server = "http://localhost:8085";
const username = "test";
const token = Blake2b.hash("P@ssword123");
const destination = "test/HelloWorld.txt";

describe("file upload", () => {
	test("invalid server", async () => {
		const res = await CloudkyAPI.generateUploadFileLink("invalid server", username, token, destination);
		if (typeof res === "string") {
			expect(false).toBe(true);
			return;
		}
		expect(res.error).toBe(Error.SERVER_UNREACHABLE);
	});

	test("invalid username", async () => {
		const res = await CloudkyAPI.generateUploadFileLink(server, "test.test123", token, destination);
		if (typeof res === "string") {
			expect(false).toBe(true);
			return;
		}
		expect(res.error).toBe(Error.INVALID_USERNAME_FORMAT);
	});

	test("invalid token", async () => {
		const res = await CloudkyAPI.generateUploadFileLink(server, username, "test", destination);
		if (typeof res === "string") {
			expect(false).toBe(true);
			return;
		}
		expect(res.error).toBe(Error.INVALID_TOKEN);
	});

	test("invalid destination", async () => {
		const res = await CloudkyAPI.generateUploadFileLink(server, username, token, "../test.png");
		if (typeof res === "string") {
			expect(false).toBe(true);
			return;
		}
		expect(res.error).toBe(Error.INVALID_FILE_NAME);
	});
});
