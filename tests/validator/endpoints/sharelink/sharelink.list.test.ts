import { expect, test, describe } from "bun:test";
import CloudkyAPI from "../../../../src/cloudky-api";
import Blake2b from "@rabbit-company/blake2b";
import type { ShareLinkListResponse } from "../../../../src/types";
import { Error } from "../../../../src/errors";

const server = "http://localhost:8085";
const username = "test";
const token = Blake2b.hash("P@ssword123");

describe("sharelink list", () => {
	test("invalid server", async () => {
		const res: ShareLinkListResponse = await CloudkyAPI.shareLinkList("invalid server", username, token);
		expect(res.error).toBe(Error.SERVER_UNREACHABLE);
	});

	test("invalid username", async () => {
		const res: ShareLinkListResponse = await CloudkyAPI.shareLinkList(server, "test.test123", token);
		expect(res.error).toBe(Error.INVALID_USERNAME_FORMAT);
	});

	test("invalid token", async () => {
		const res: ShareLinkListResponse = await CloudkyAPI.shareLinkList(server, username, "test");
		expect(res.error).toBe(Error.INVALID_TOKEN);
	});
});