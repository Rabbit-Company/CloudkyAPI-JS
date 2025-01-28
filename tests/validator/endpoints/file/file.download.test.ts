import { expect, test, describe } from "bun:test";
import { Blake2b, CloudkyAPI, Error, type StandardResponse } from "../../../../src/cloudky-api";

const server = "http://localhost:8085";
const username = "test";
const token = Blake2b.hash("P@ssword123");
const file = "cats/cat.png";

describe("file download", () => {
	test("invalid server", async () => {
		const res: string | StandardResponse = await CloudkyAPI.generateFileDownloadLink("invalid server", username, token, file);
		if (typeof res === "string") {
			expect(false).toBe(true);
			return;
		}
		expect(res.error).toBe(Error.SERVER_UNREACHABLE);
	});

	test("invalid username", async () => {
		const res: string | StandardResponse = await CloudkyAPI.generateFileDownloadLink(server, "test.test123", token, file);
		if (typeof res === "string") {
			expect(false).toBe(true);
			return;
		}
		expect(res.error).toBe(Error.INVALID_USERNAME_FORMAT);
	});

	test("invalid token", async () => {
		const res: string | StandardResponse = await CloudkyAPI.generateFileDownloadLink(server, username, "test", file);
		if (typeof res === "string") {
			expect(false).toBe(true);
			return;
		}
		expect(res.error).toBe(Error.INVALID_TOKEN);
	});

	test("invalid file name", async () => {
		const res: string | StandardResponse = await CloudkyAPI.generateFileDownloadLink(server, username, token, "../test.png");
		if (typeof res === "string") {
			expect(false).toBe(true);
			return;
		}
		expect(res.error).toBe(Error.INVALID_FILE_NAME);
	});
});
