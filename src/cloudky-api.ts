import Errors, { Error } from "./errors";
import type { StandardResponse, AccountTokenResponse, AccountDataResponse, FileListResponse, ShareLinkListResponse } from "./types";
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

	export async function renameFile(server: string, username: string, token: string, path: string, destination: string): Promise<StandardResponse> {
		if (!Validate.url(server)) return Errors.getJson(Error.SERVER_UNREACHABLE);
		if (!Validate.username(username)) return Errors.getJson(Error.INVALID_USERNAME_FORMAT);
		if (!Validate.token(token)) return Errors.getJson(Error.INVALID_TOKEN);
		if (!Validate.userFilePathName(path)) return Errors.getJson(Error.INVALID_FILE_NAME);
		if (!Validate.userFilePathName(destination)) return Errors.getJson(Error.INVALID_FILE_NAME);

		try {
			const data = {
				path: path,
				destination: destination,
			};

			const result = await fetch(server + "/v1/file/rename", {
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

	export async function uploadFile(server: string, username: string, token: string, destination: string, fileContent: Blob): Promise<StandardResponse> {
		if (!Validate.url(server)) return Errors.getJson(Error.SERVER_UNREACHABLE);
		if (!Validate.username(username)) return Errors.getJson(Error.INVALID_USERNAME_FORMAT);
		if (!Validate.token(token)) return Errors.getJson(Error.INVALID_TOKEN);
		if (!Validate.userFilePathName(destination)) return Errors.getJson(Error.INVALID_FILE_NAME);
		if (fileContent.size === 0) return Errors.getJson(Error.INVALID_FILE);
		if (fileContent.size > 53_687_091_200) return Errors.getJson(Error.MAX_FILE_SIZE_EXCEEDED);

		try {
			const formData = new FormData();
			formData.append("file", fileContent, destination);

			const result = await fetch(server + "/v1/file/upload", {
				method: "PUT",
				headers: {
					Authorization: `Basic ${btoa(username + ":" + token)}`,
				},
				body: formData,
			});

			const response: StandardResponse = await result.json();
			if (Validate.response(response)) return response;

			return Errors.getJson(Error.UNKNOWN_ERROR);
		} catch (err) {
			if (err instanceof SyntaxError) return Errors.getJson(Error.INVALID_RESPONSE_FORMAT);
			return Errors.getJson(Error.SERVER_UNREACHABLE);
		}
	}

	export async function shareLinkCreate(
		server: string,
		username: string,
		token: string,
		path: string,
		password: string | null,
		expiration: bigint | number | null
	): Promise<StandardResponse> {
		if (!Validate.url(server)) return Errors.getJson(Error.SERVER_UNREACHABLE);
		if (!Validate.username(username)) return Errors.getJson(Error.INVALID_USERNAME_FORMAT);
		if (!Validate.token(token)) return Errors.getJson(Error.INVALID_TOKEN);
		if (!Validate.userFilePathName(path)) return Errors.getJson(Error.INVALID_FILE_NAME);
		if (password !== null && !Validate.password(password)) return Errors.getJson(Error.PASSWORD_NOT_HASHED);
		if (expiration !== null && !Validate.expiration(expiration)) return Errors.getJson(Error.INVALID_EXPIRATION_TIMESTAMP);

		try {
			const data = {
				path: path,
				password: password,
				expiration: expiration,
			};

			const result = await fetch(server + "/v1/sharelink/create", {
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

	export async function shareLinkDelete(server: string, username: string, token: string, link: string): Promise<StandardResponse> {
		if (!Validate.url(server)) return Errors.getJson(Error.SERVER_UNREACHABLE);
		if (!Validate.username(username)) return Errors.getJson(Error.INVALID_USERNAME_FORMAT);
		if (!Validate.token(token)) return Errors.getJson(Error.INVALID_TOKEN);
		if (!Validate.sharelink(link)) return Errors.getJson(Error.INVALID_SHARE_LINK);

		try {
			const data = {
				link: link,
			};

			const result = await fetch(server + "/v1/sharelink/delete", {
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

	export async function shareLinkList(server: string, username: string, token: string): Promise<ShareLinkListResponse> {
		if (!Validate.url(server)) return Errors.getJson(Error.SERVER_UNREACHABLE);
		if (!Validate.username(username)) return Errors.getJson(Error.INVALID_USERNAME_FORMAT);
		if (!Validate.token(token)) return Errors.getJson(Error.INVALID_TOKEN);

		try {
			const result = await fetch(server + "/v1/sharelink/list", {
				method: "GET",
				headers: {
					Authorization: `Basic ${btoa(username + ":" + token)}`,
				},
			});

			const response: ShareLinkListResponse = await result.json();
			if (Validate.response(response)) return response;

			return Errors.getJson(Error.UNKNOWN_ERROR);
		} catch (err) {
			if (err instanceof SyntaxError) return Errors.getJson(Error.INVALID_RESPONSE_FORMAT);
			return Errors.getJson(Error.SERVER_UNREACHABLE);
		}
	}
}

export default CloudkyAPI;
