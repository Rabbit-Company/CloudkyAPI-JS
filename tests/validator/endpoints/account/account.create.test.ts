import { expect, test, describe } from "bun:test";
import { CloudkyAPI, Error, type StandardResponse } from "../../../../src/cloudky-api";

const server = "http://localhost:8085";
const username = "test";
const email = "test@test.com";
const password = "dtxKQd8ERspwejsABdB4";

describe("account create", () => {
	test("invalid server", async () => {
		const res: StandardResponse = await CloudkyAPI.createAccount("invalid server", username, email, password, 1);
		expect(res.error).toBe(Error.SERVER_UNREACHABLE);
	});

	test("invalid username", async () => {
		const res: StandardResponse = await CloudkyAPI.createAccount(server, "test.test123", email, password, 1);
		expect(res.error).toBe(Error.INVALID_USERNAME_FORMAT);
	});

	test("invalid email", async () => {
		const res: StandardResponse = await CloudkyAPI.createAccount(server, username, "test@.com", password, 1);
		expect(res.error).toBe(Error.INVALID_EMAIL);
	});

	test("invalid password", async () => {
		const res: StandardResponse = await CloudkyAPI.createAccount(server, username, email, "Password123", 1);
		expect(res.error).toBe(Error.PASSWORD_TOO_WEAK);
	});

	test("invalid account type", async () => {
		const res: StandardResponse = await CloudkyAPI.createAccount(server, username, email, password, -1);
		expect(res.error).toBe(Error.INVALID_ACCOUNT_TYPE);
	});
});
