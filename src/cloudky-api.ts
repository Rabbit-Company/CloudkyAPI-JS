import Errors, { Error } from "./errors";
import type { StandardResponse, AccountTokenResponse } from "./types";
import Validate from "./validate";

namespace CloudkyAPI {
	export async function createAccount(server: string, username: string, email: string, password: string, type: number): Promise<StandardResponse> {
		if (!Validate.url(server)) return Errors.getJson(Error.SERVER_UNREACHABLE);
		if (!Validate.username(username)) return Errors.getJson(Error.INVALID_USERNAME_FORMAT);
		if (!Validate.email(email)) return Errors.getJson(Error.INVALID_EMAIL);
		if (!Validate.password(password)) return Errors.getJson(Error.PASSWORD_NOT_HASHED);
		if (!Validate.accountType(type)) return Errors.getJson(Error.INVALID_ACCOUNT_TYPE);

		try {
			const data = {
				username: username,
				email: email,
				password: password,
				type: type,
			};

			const result = await fetch(server + "/v1/account/create", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			const response: StandardResponse = await result.json();
			if (Validate.response(response)) return response;

			return Errors.getJson(Error.UNKNOWN_ERROR);
		} catch (err) {
			if (err instanceof SyntaxError) return Errors.getJson(Error.INVALID_RESPONSE_FORMAT);
			return Errors.getJson(Error.SERVER_UNREACHABLE);
		}
	}

	export async function getToken(server: string, username: string, password: string, otp: string): Promise<AccountTokenResponse> {
		if (!Validate.url(server)) return Errors.getJson(Error.SERVER_UNREACHABLE);
		if (!Validate.username(username)) return Errors.getJson(Error.INVALID_USERNAME_FORMAT);
		if (!Validate.password(password)) return Errors.getJson(Error.PASSWORD_NOT_HASHED);
		if (!Validate.otp(otp)) return Errors.getJson(Error.INVALID_OTP);

		try {
			const data = {
				otp: otp,
			};

			const result = await fetch(server + "/v1/account/token", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Basic ${btoa(username + ":" + password)}`,
				},
				body: JSON.stringify(data),
			});

			const response: AccountTokenResponse = await result.json();
			if (Validate.response(response)) return response;

			return Errors.getJson(Error.UNKNOWN_ERROR);
		} catch (err) {
			if (err instanceof SyntaxError) return Errors.getJson(Error.INVALID_RESPONSE_FORMAT);
			return Errors.getJson(Error.SERVER_UNREACHABLE);
		}
	}

	export async function getAccountData(server: string, username: string, token: string): Promise<any> {
		if (!Validate.url(server)) throw "url_invalid";
		if (!Validate.username(username)) throw "12";
		if (!Validate.token(token)) throw "25";

		try {
			let headers = new Headers();
			headers.append("Authorization", "Basic " + btoa(username + ":" + token));

			const result = await fetch(server + "/v1/account/data", {
				method: "GET",
				headers: headers,
			});

			if (result.status !== 200 && result.status !== 429) {
				throw "server_unreachable";
			}

			return await result.json();
		} catch {
			throw "server_unreachable";
		}
	}

	export async function getFileList(server: string, username: string, token: string): Promise<any> {
		if (!Validate.url(server)) throw "url_invalid";
		if (!Validate.username(username)) throw "12";
		if (!Validate.token(token)) throw "25";

		try {
			let headers = new Headers();
			headers.append("Authorization", "Basic " + btoa(username + ":" + token));

			const result = await fetch(server + "/v1/file/list", {
				method: "GET",
				headers: headers,
			});

			if (result.status !== 200 && result.status !== 429) {
				throw "server_unreachable";
			}

			return await result.json();
		} catch {
			throw "server_unreachable";
		}
	}

	export async function deleteFiles(server: string, username: string, token: string, paths: string[]): Promise<any> {
		if (!Validate.url(server)) throw "url_invalid";
		if (!Validate.username(username)) throw "12";
		if (!Validate.token(token)) throw "25";

		try {
			let headers = new Headers();
			headers.append("Authorization", "Basic " + btoa(username + ":" + token));

			const data = {
				paths: paths,
			};

			const result = await fetch(server + "/v1/file/delete", {
				method: "POST",
				headers: headers,
				body: JSON.stringify(data),
			});

			if (result.status !== 200 && result.status !== 429) {
				throw "server_unreachable";
			}

			return await result.json();
		} catch {
			throw "server_unreachable";
		}
	}

	export async function downloadFile(server: string, username: string, token: string, path: string): Promise<Blob> {
		if (!Validate.url(server)) throw "url_invalid";
		if (!Validate.username(username)) throw "12";
		if (!Validate.token(token)) throw "25";

		try {
			let headers = new Headers();
			headers.append("Authorization", "Basic " + btoa(username + ":" + token));

			const data = {
				path: path,
			};

			const result = await fetch(server + "/v1/file/download", {
				method: "POST",
				headers: headers,
				body: JSON.stringify(data),
			});

			if (result.status !== 200 && result.status !== 429) {
				throw "server_unreachable";
			}

			return await result.blob();
		} catch {
			throw "server_unreachable";
		}
	}
}

export default CloudkyAPI;
