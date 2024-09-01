import { expect, test, describe } from "bun:test";
import CloudkyAPI from "../../../../src/cloudky-api";
import Blake2b from "@rabbit-company/blake2b";
import type { StandardResponse } from "../../../../src/types";
import { Error } from "../../../../src/errors";

const server = "http://localhost:8085";
const username = "test";
const token = Blake2b.hash("P@ssword123");
const files = ["cats/cat.png", "cars/car.png"];

describe("file delete", () => {
	test("invalid server", async () => {
		const res: StandardResponse = await CloudkyAPI.deleteFiles("invalid server", username, token, files);
		expect(res.error).toBe(Error.SERVER_UNREACHABLE);
	});

	test("invalid username", async () => {
		const res: StandardResponse = await CloudkyAPI.deleteFiles(server, "test.test123", token, files);
		expect(res.error).toBe(Error.INVALID_USERNAME_FORMAT);
	});

	test("invalid token", async () => {
		const res: StandardResponse = await CloudkyAPI.deleteFiles(server, username, "test", files);
		expect(res.error).toBe(Error.INVALID_TOKEN);
	});

	test("invalid file names", async () => {
		const res: StandardResponse = await CloudkyAPI.deleteFiles(server, username, token, ["../test.png"]);
		expect(res.error).toBe(Error.INVALID_FILE_NAME);
	});
});
