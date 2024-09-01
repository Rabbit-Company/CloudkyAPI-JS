import Errors, { Error } from "./errors";
import type { StandardResponse, AccountTokenResponse, AccountDataResponse, FileListResponse } from "./types";
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

	export async function getAccountData(server: string, username: string, token: string): Promise<AccountDataResponse> {
		if (!Validate.url(server)) return Errors.getJson(Error.SERVER_UNREACHABLE);
		if (!Validate.username(username)) return Errors.getJson(Error.INVALID_USERNAME_FORMAT);
		if (!Validate.token(token)) return Errors.getJson(Error.INVALID_TOKEN);

		try {
			const result = await fetch(server + "/v1/account/data", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Basic ${btoa(username + ":" + token)}`,
				},
			});

			const response: AccountTokenResponse = await result.json();
			if (Validate.response(response)) return response;

			return Errors.getJson(Error.UNKNOWN_ERROR);
		} catch (err) {
			if (err instanceof SyntaxError) return Errors.getJson(Error.INVALID_RESPONSE_FORMAT);
			return Errors.getJson(Error.SERVER_UNREACHABLE);
		}
	}

	export async function deleteAccount(server: string, username: string, token: string): Promise<StandardResponse> {
		if (!Validate.url(server)) return Errors.getJson(Error.SERVER_UNREACHABLE);
		if (!Validate.username(username)) return Errors.getJson(Error.INVALID_USERNAME_FORMAT);
		if (!Validate.token(token)) return Errors.getJson(Error.INVALID_TOKEN);

		try {
			const result = await fetch(server + "/v1/account/delete", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Basic ${btoa(username + ":" + token)}`,
				},
			});

			const response: StandardResponse = await result.json();
			if (Validate.response(response)) return response;

			return Errors.getJson(Error.UNKNOWN_ERROR);
		} catch (err) {
			if (err instanceof SyntaxError) return Errors.getJson(Error.INVALID_RESPONSE_FORMAT);
			return Errors.getJson(Error.SERVER_UNREACHABLE);
		}
	}

	export async function getFileList(server: string, username: string, token: string): Promise<FileListResponse> {
		if (!Validate.url(server)) return Errors.getJson(Error.SERVER_UNREACHABLE);
		if (!Validate.username(username)) return Errors.getJson(Error.INVALID_USERNAME_FORMAT);
		if (!Validate.token(token)) return Errors.getJson(Error.INVALID_TOKEN);

		try {
			const result = await fetch(server + "/v1/file/list", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Basic ${btoa(username + ":" + token)}`,
				},
			});

			const response: FileListResponse = await result.json();
			if (Validate.response(response)) return response;

			return Errors.getJson(Error.UNKNOWN_ERROR);
		} catch (err) {
			if (err instanceof SyntaxError) return Errors.getJson(Error.INVALID_RESPONSE_FORMAT);
			return Errors.getJson(Error.SERVER_UNREACHABLE);
		}
	}

	export async function deleteFiles(server: string, username: string, token: string, paths: string[]): Promise<StandardResponse> {
		if (!Validate.url(server)) return Errors.getJson(Error.SERVER_UNREACHABLE);
		if (!Validate.username(username)) return Errors.getJson(Error.INVALID_USERNAME_FORMAT);
		if (!Validate.token(token)) return Errors.getJson(Error.INVALID_TOKEN);
		if (!Validate.userFilePathNames(paths)) return Errors.getJson(Error.INVALID_FILE_NAME);

		try {
			const data = {
				paths: paths,
			};

			const result = await fetch(server + "/v1/file/delete", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Basic ${btoa(username + ":" + token)}`,
				},
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

	export async function downloadFile(server: string, username: string, token: string, path: string): Promise<Blob | StandardResponse> {
		if (!Validate.url(server)) return Errors.getJson(Error.SERVER_UNREACHABLE);
		if (!Validate.username(username)) return Errors.getJson(Error.INVALID_USERNAME_FORMAT);
		if (!Validate.token(token)) return Errors.getJson(Error.INVALID_TOKEN);
		if (!Validate.userFilePathName(path)) return Errors.getJson(Error.INVALID_FILE_NAME);

		try {
			const data = {
				path: path,
			};

			const result = await fetch(server + "/v1/file/download", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Basic ${btoa(username + ":" + token)}`,
				},
				body: JSON.stringify(data),
			});

			if (result.status !== 200) {
				const response: StandardResponse = await result.json();
				if (Validate.response(response)) return response;
				return Errors.getJson(Error.UNKNOWN_ERROR);
			}

			return await result.blob();
		} catch (err) {
			if (err instanceof SyntaxError) return Errors.getJson(Error.INVALID_RESPONSE_FORMAT);
			return Errors.getJson(Error.SERVER_UNREACHABLE);
		}
	}

	export async function moveFiles(server: string, username: string, token: string, files: string[], destination: string): Promise<StandardResponse> {
		if (!Validate.url(server)) return Errors.getJson(Error.SERVER_UNREACHABLE);
		if (!Validate.username(username)) return Errors.getJson(Error.INVALID_USERNAME_FORMAT);
		if (!Validate.token(token)) return Errors.getJson(Error.INVALID_TOKEN);
		if (!Validate.userFilePathNames(files)) return Errors.getJson(Error.INVALID_FILE_NAME);
		if (!Validate.userFilePathName(destination)) return Errors.getJson(Error.INVALID_FILE_NAME);

		try {
			const data = {
				files: files,
				destination: destination,
			};

			const result = await fetch(server + "/v1/file/move", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Basic ${btoa(username + ":" + token)}`,
				},
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
}

export default CloudkyAPI;
