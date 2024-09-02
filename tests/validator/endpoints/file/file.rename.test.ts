import { expect, test, describe } from "bun:test";
import { Blake2b, CloudkyAPI, Error, type StandardResponse } from "../../../../src/cloudky-api";

const server = "http://localhost:8085";
const username = "test";
const token = Blake2b.hash("P@ssword123");
const file = "cats/cat.png";
const destination = "cats/cat2.png";

describe("file rename", () => {
	test("invalid server", async () => {
		const res: StandardResponse = await CloudkyAPI.renameFile("invalid server", username, token, file, destination);
		expect(res.error).toBe(Error.SERVER_UNREACHABLE);
	});

	test("invalid username", async () => {
		const res: StandardResponse = await CloudkyAPI.renameFile(server, "test.test123", token, file, destination);
		expect(res.error).toBe(Error.INVALID_USERNAME_FORMAT);
	});

	test("invalid token", async () => {
		const res: StandardResponse = await CloudkyAPI.renameFile(server, username, "test", file, destination);
		expect(res.error).toBe(Error.INVALID_TOKEN);
	});

	test("invalid file name", async () => {
		const res: StandardResponse = await CloudkyAPI.renameFile(server, username, token, "../test.png", destination);
		expect(res.error).toBe(Error.INVALID_FILE_NAME);
	});

	test("invalid destination name", async () => {
		const res: StandardResponse = await CloudkyAPI.renameFile(server, username, token, file, "../test");
		expect(res.error).toBe(Error.INVALID_FILE_NAME);
	});
});
