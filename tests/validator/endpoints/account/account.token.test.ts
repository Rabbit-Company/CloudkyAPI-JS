import { expect, test, describe } from "bun:test";
import { CloudkyAPI, Error, type AccountTokenResponse } from "../../../../src/cloudky-api";

const server = "http://localhost:8085";
const username = "test";
const password = "dtxKQd8ERspwejsABdB4";
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
		const res: AccountTokenResponse = await CloudkyAPI.getToken(server, username, "Password123", otp);
		expect(res.error).toBe(Error.PASSWORD_TOO_WEAK);
	});

	test("invalid otp", async () => {
		const res: AccountTokenResponse = await CloudkyAPI.getToken(server, username, password, "5423567");
		expect(res.error).toBe(Error.INVALID_OTP);
	});
});
