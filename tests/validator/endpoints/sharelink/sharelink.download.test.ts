import { expect, test, describe } from "bun:test";
import { CloudkyAPI, Error, type StandardResponse } from "../../../../src/cloudky-api";

const server = "http://localhost:8085";
const link = "skfbzp0knsYev4Q";
const password = "dtxKQd8ERspwejsABdB4";

describe("sharelink download", () => {
	test("invalid server", async () => {
		const res: Blob | StandardResponse = await CloudkyAPI.downloadFromShareLink("invalid server", link, password);
		if (res instanceof Blob) {
			expect(false).toBe(true);
			return;
		}
		expect(res.error).toBe(Error.SERVER_UNREACHABLE);
	});

	test("invalid sharelink", async () => {
		const res: Blob | StandardResponse = await CloudkyAPI.downloadFromShareLink(server, "h7D9KcS3", password);
		if (res instanceof Blob) {
			expect(false).toBe(true);
			return;
		}
		expect(res.error).toBe(Error.INVALID_SHARE_LINK);
	});

	test("invalid password", async () => {
		const res: Blob | StandardResponse = await CloudkyAPI.downloadFromShareLink(server, link, "test");
		if (res instanceof Blob) {
			expect(false).toBe(true);
			return;
		}
		expect(res.error).toBe(Error.INVALID_PASSWORD);
	});
});
