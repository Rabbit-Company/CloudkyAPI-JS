import { expect, test, describe } from "bun:test";
import CloudkyAPI from "../../../../src/cloudky-api";
import Blake2b from "@rabbit-company/blake2b";
import type { AccountTokenResponse } from "../../../../src/types";
import { Error } from "../../../../src/errors";

const server = "http://localhost:8085";
const username = "test";
const password = Blake2b.hash("P@ssword123");
const otp = "";

describe("account token", () => {
	test("invalid server", async () => {
		const res: AccountTokenResponse = await CloudkyAPI.getToken("invalid server", username, password, otp);
		expect(res.error).toBe(Error.SERVER_UNREACHABLE);
	});

	test("invalid username", async () => {
		const res: AccountTokenResponse = await CloudkyAPI.getToken(server, "test.test123", password, otp);
		expect(res.error).toBe(Error.INVALID_USERNAME_FORMAT);
	});

	test("invalid password", async () => {
		const res: AccountTokenResponse = await CloudkyAPI.getToken(server, username, "P@ssword123", otp);
		expect(res.error).toBe(Error.PASSWORD_NOT_HASHED);
	});

	test("invalid otp", async () => {
		const res: AccountTokenResponse = await CloudkyAPI.getToken(server, username, password, "5423567");
		expect(res.error).toBe(Error.INVALID_OTP);
	});
});
