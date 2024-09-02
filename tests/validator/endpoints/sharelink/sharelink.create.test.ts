import { expect, test, describe } from "bun:test";
import { Blake2b, CloudkyAPI, Error, type StandardResponse } from "../../../../src/cloudky-api";

const server = "http://localhost:8085";
const username = "test";
const token = Blake2b.hash("P@ssword123");
const path = "cats/cat.png";
const password = Blake2b.hash("fileP@ssword123");
const expiration = Date.now() + 1_000_000_000;

describe("sharelink create", () => {
	test("invalid server", async () => {
		const res: StandardResponse = await CloudkyAPI.createShareLink("invalid server", username, token, path, password, expiration);
		expect(res.error).toBe(Error.SERVER_UNREACHABLE);
	});

	test("invalid username", async () => {
		const res: StandardResponse = await CloudkyAPI.createShareLink(server, "test.test123", token, path, password, expiration);
		expect(res.error).toBe(Error.INVALID_USERNAME_FORMAT);
	});

	test("invalid token", async () => {
		const res: StandardResponse = await CloudkyAPI.createShareLink(server, username, "test", path, password, expiration);
		expect(res.error).toBe(Error.INVALID_TOKEN);
	});

	test("invalid file name", async () => {
		const res: StandardResponse = await CloudkyAPI.createShareLink(server, username, token, "../test.png", password, expiration);
		expect(res.error).toBe(Error.INVALID_FILE_NAME);
	});

	test("invalid file password", async () => {
		const res: StandardResponse = await CloudkyAPI.createShareLink(server, username, token, path, "fileP@ssword123", expiration);
		expect(res.error).toBe(Error.PASSWORD_NOT_HASHED);
	});

	test("invalid expiration", async () => {
		const res: StandardResponse = await CloudkyAPI.createShareLink(server, username, token, path, password, 1000);
		expect(res.error).toBe(Error.INVALID_EXPIRATION_TIMESTAMP);
	});
});
