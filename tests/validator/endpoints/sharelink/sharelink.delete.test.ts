import { expect, test, describe } from "bun:test";
import CloudkyAPI from "../../../../src/cloudky-api";
import Blake2b from "@rabbit-company/blake2b";
import type { StandardResponse } from "../../../../src/types";
import { Error } from "../../../../src/errors";

const server = "http://localhost:8085";
const username = "test";
const token = Blake2b.hash("P@ssword123");
const link = "OXyoefGEI1VepwJ";

describe("sharelink delete", () => {
	test("invalid server", async () => {
		const res: StandardResponse = await CloudkyAPI.shareLinkDelete("invalid server", username, token, link);
		expect(res.error).toBe(Error.SERVER_UNREACHABLE);
	});

	test("invalid username", async () => {
		const res: StandardResponse = await CloudkyAPI.shareLinkDelete(server, "test.test123", token, link);
		expect(res.error).toBe(Error.INVALID_USERNAME_FORMAT);
	});

	test("invalid token", async () => {
		const res: StandardResponse = await CloudkyAPI.shareLinkDelete(server, username, "test", link);
		expect(res.error).toBe(Error.INVALID_TOKEN);
	});

	test("invalid share link", async () => {
		const res: StandardResponse = await CloudkyAPI.shareLinkDelete(server, username, token, "h8fsnal");
		expect(res.error).toBe(Error.INVALID_SHARE_LINK);
	});
});
