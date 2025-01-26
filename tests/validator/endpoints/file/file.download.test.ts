import { expect, test, describe } from "bun:test";
import { Blake2b, CloudkyAPI, Error, type StandardResponse } from "../../../../src/cloudky-api";
import { StorageType } from "../../../../src/types";

const server = "http://localhost:8085";
const username = "test";
const token = Blake2b.hash("P@ssword123");
const storageType = StorageType.LOCAL;
const file = "cats/cat.png";

describe("file download", () => {
	test("invalid server", async () => {
		const res: string | StandardResponse = await CloudkyAPI.downloadFile("invalid server", username, token, storageType, file);
		if (typeof res === "string") {
			expect(false).toBe(true);
			return;
		}
		expect(res.error).toBe(Error.SERVER_UNREACHABLE);
	});

	test("invalid username", async () => {
		const res: string | StandardResponse = await CloudkyAPI.downloadFile(server, "test.test123", token, storageType, file);
		if (typeof res === "string") {
			expect(false).toBe(true);
			return;
		}
		expect(res.error).toBe(Error.INVALID_USERNAME_FORMAT);
	});

	test("invalid token", async () => {
		const res: string | StandardResponse = await CloudkyAPI.downloadFile(server, username, "test", storageType, file);
		if (typeof res === "string") {
			expect(false).toBe(true);
			return;
		}
		expect(res.error).toBe(Error.INVALID_TOKEN);
	});

	test("invalid file name", async () => {
		const res: string | StandardResponse = await CloudkyAPI.downloadFile(server, username, token, storageType, "../test.png");
		if (typeof res === "string") {
			expect(false).toBe(true);
			return;
		}
		expect(res.error).toBe(Error.INVALID_FILE_NAME);
	});
});
