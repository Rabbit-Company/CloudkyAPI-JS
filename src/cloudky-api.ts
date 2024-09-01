import Errors, { Error } from "./errors";
import type { StandardResponse, AccountTokenResponse, AccountDataResponse, FileListResponse, ShareLinkListResponse } from "./types";
import Validate from "./validate";
import Blake2b from "@rabbit-company/blake2b";
import Argon2id from "@rabbit-company/argon2id";
import PasswordEntropy from "@rabbit-company/password-entropy";

/**
 * Class for interacting with the Cloudky API.
 *
 * This class provides functions for managing accounts, files, and shareable links
 * via HTTP requests to the Cloudky server.
 */
class CloudkyAPI {
	server: string;
	username: string;
	private password: string;
	private otp: string;
	private authHash: string = "";
	token: string = "";

	/**
	 * Creates an instance of CloudkyAPI.
	 *
	 * @constructor
	 * @param {string} server - The URL of the server to connect to.
	 * @param {string} username - The username for authentication.
	 * @param {string} password - The password for authentication.
	 * @param {string|null} otp - The one-time password (OTP) for two-factor authentication.
	 */
	constructor(server: string, username: string, password: string, otp: string) {
		this.server = server;
		this.username = username;
		this.password = password;
		this.otp = otp;
	}

	/**
	 * Validates the provided parameters for interacting with the Cloudky API.
	 *
	 * This method checks the validity of the server URL, username, password strength, and OTP.
	 * It returns an appropriate error response if any of the validations fail.
	 *
	 * @static
	 * @param {string} server - The URL of the server to connect to.
	 * @param {string} username - The username for authentication.
	 * @param {string} password - The password for authentication.
	 * @param {string|null} otp - The one-time password (OTP) for two-factor authentication.
	 * @returns {StandardResponse} The validation response indicating success or error.
	 */
	static validate(server: string, username: string, password: string, otp: string): StandardResponse {
		if (!Validate.url(server)) return Errors.getJson(Error.SERVER_UNREACHABLE);
		if (!Validate.username(username)) return Errors.getJson(Error.INVALID_USERNAME_FORMAT);
		if (PasswordEntropy.calculate(password) < 75) return Errors.getJson(Error.PASSWORD_TOO_WEAK);
		if (!Validate.otp(otp)) return Errors.getJson(Error.INVALID_OTP);

		return Errors.getJson(Error.SUCCESS);
	}

	/**
	 * Validates the current instance's properties for interacting with the Cloudky API.
	 *
	 * This method checks the validity of the server URL, username, OTP, and depending on the state,
	 * either the token, authHash, or password. It returns an appropriate error response if any of the validations fail.
	 *
	 * @returns {StandardResponse} The validation response indicating success or error.
	 */
	validate(): StandardResponse {
		if (!Validate.url(this.server)) return Errors.getJson(Error.SERVER_UNREACHABLE);
		if (!Validate.username(this.username)) return Errors.getJson(Error.INVALID_USERNAME_FORMAT);
		if (!Validate.otp(this.otp)) return Errors.getJson(Error.INVALID_OTP);

		if (this.token.length) {
			if (!Validate.token(this.token)) return Errors.getJson(Error.INVALID_TOKEN);
		} else if (this.authHash.length) {
			if (!Validate.password(this.authHash)) return Errors.getJson(Error.PASSWORD_NOT_HASHED);
		} else if (this.password.length) {
			if (PasswordEntropy.calculate(this.password) < 75) return Errors.getJson(Error.INVALID_PASSWORD);
		}

		return Errors.getJson(Error.SUCCESS);
	}

	/**
	 * Initializes the CloudkyAPI instance by generating the authentication hash.
	 * This method sets the `authHash` property based on the provided username and password,
	 * and clears the password from memory if the hash is successfully generated.
	 *
	 * @returns {Promise<boolean>} A promise that resolves to `true` if the `authHash` is successfully generated, otherwise `false`.
	 */
	async initialize(): Promise<boolean> {
		this.authHash = (await CloudkyAPI.generateAuthenticationHash(this.username, this.password)) || "";
		if (this.authHash.length) {
			this.password = "";
			return true;
		}
		return false;
	}

	/**
	 * Generates a hashed authentication string using the provided username and password.
	 * This method uses Blake2b to create a unique hash and Argon2id for further hashing
	 * to enhance security.
	 *
	 * @param {string} username - The username for authentication.
	 * @param {string} password - The password for authentication.
	 * @returns {Promise<string|null>} A promise that resolves to the authentication hash if successful, or `null` if an error occurs during hashing.
	 */
	static async generateAuthenticationHash(username: string, password: string): Promise<string | null> {
		const authHash = Blake2b.hash(`cloudky2024-${password}-${username}`);
		const authSalt = Blake2b.hash(`cloudky2024-${username}`);

		try {
			return await Argon2id.hash(authHash, authSalt, 4, 16, 3, 64);
		} catch {
			return null;
		}
	}

	/**
	 * Creates a new account on the specified server.
	 *
	 * @param {string} server - The URL of the server where the account will be created.
	 * @param {string} username - The username for the new account.
	 * @param {string} email - The email address for the new account.
	 * @param {string} password - The hashed password for the new account.
	 * @param {number} type - The account type (0 for standard, 1 for file E2EE).
	 * @returns {Promise<StandardResponse>} A promise that resolves to the standard response object.
	 */
	static async createAccount(server: string, username: string, email: string, password: string, type: number): Promise<StandardResponse> {
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

	/**
	 * Retrieves a token for an existing account using the username, password, and optional OTP.
	 *
	 * @param {string} server - The URL of the server to authenticate against.
	 * @param {string} username - The username of the account.
	 * @param {string} password - The hashed password of the account.
	 * @param {string} otp - An optional one-time password (OTP) for two-factor authentication.
	 * @returns {Promise<AccountTokenResponse>} A promise that resolves to the account token response object.
	 */
	static async getToken(server: string, username: string, password: string, otp: string): Promise<AccountTokenResponse> {
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

	/**
	 * Retrieves a token for the current account instance using stored credentials and optional OTP.
	 * Clears authHash from memory once the token is successfully retrieved.
	 *
	 * @returns {Promise<AccountTokenResponse>} A promise that resolves to the account token response object.
	 */
	async getToken(): Promise<AccountTokenResponse> {
		const res = await CloudkyAPI.getToken(this.server, this.username, this.authHash, this.otp);
		if (res.token) {
			this.token = res.token;
			this.authHash = "";
		}
		return res;
	}

	/**
	 * Retrieves account data for the specified username and token.
	 *
	 * @param {string} server - The URL of the server where the account data will be retrieved.
	 * @param {string} username - The username of the account.
	 * @param {string} token - The token for authenticating the request.
	 * @returns {Promise<AccountDataResponse>} A promise that resolves to the account data response object.
	 */
	static async getAccountData(server: string, username: string, token: string): Promise<AccountDataResponse> {
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

	/**
	 * Retrieves account data for the current instance's username.
	 *
	 * @returns {Promise<AccountDataResponse>} A promise that resolves to the account data response object.
	 */
	async getAccountData(): Promise<AccountDataResponse> {
		return await CloudkyAPI.getAccountData(this.server, this.username, this.token);
	}

	/**
	 * Deletes an existing account from the server.
	 *
	 * @param {string} server - The URL of the server where the account will be deleted.
	 * @param {string} username - The username of the account to be deleted.
	 * @param {string} token - The token for authenticating the request.
	 * @returns {Promise<StandardResponse>} A promise that resolves to the standard response object.
	 */
	static async deleteAccount(server: string, username: string, token: string): Promise<StandardResponse> {
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

	/**
	 * Deletes an existing account from the server.
	 *
	 * @returns {Promise<StandardResponse>} A promise that resolves to the standard response object.
	 */
	async deleteAccount(): Promise<StandardResponse> {
		return await CloudkyAPI.deleteAccount(this.server, this.username, this.token);
	}

	/**
	 * Retrieves a list of files from the server.
	 *
	 * @param {string} server - The URL of the server to fetch the file list from.
	 * @param {string} username - The username of the account making the request.
	 * @param {string} token - The token for authenticating the request.
	 * @returns {Promise<FileListResponse>} A promise that resolves to the file list response object, which includes the list of files or an error message.
	 */
	static async getFileList(server: string, username: string, token: string): Promise<FileListResponse> {
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

	/**
	 * Retrieves a list of files from the server.
	 *
	 * @returns {Promise<FileListResponse>} A promise that resolves to the file list response object, which includes the list of files or an error message.
	 */
	async getFileList(): Promise<FileListResponse> {
		return await CloudkyAPI.getFileList(this.server, this.username, this.token);
	}

	/**
	 * Deletes specified files from the server.
	 *
	 * @param {string} server - The URL of the server where the files will be deleted.
	 * @param {string} username - The username of the account making the request.
	 * @param {string} token - The token for authenticating the request.
	 * @param {string[]} paths - An array of file paths to be deleted.
	 * @returns {Promise<StandardResponse>} A promise that resolves to the standard response object indicating the result of the delete operation.
	 */
	static async deleteFiles(server: string, username: string, token: string, paths: string[]): Promise<StandardResponse> {
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

	/**
	 * Deletes specified files from the server.
	 *
	 * @param {string[]} paths - An array of file paths to be deleted.
	 * @returns {Promise<StandardResponse>} A promise that resolves to the standard response object indicating the result of the delete operation.
	 */
	async deleteFiles(paths: string[]): Promise<StandardResponse> {
		return await CloudkyAPI.deleteFiles(this.server, this.username, this.token, paths);
	}

	/**
	 * Downloads a file from the server.
	 *
	 * @param {string} server - The URL of the server from which to download the file.
	 * @param {string} username - The username of the account making the request.
	 * @param {string} token - The token for authenticating the request.
	 * @param {string} path - The path of the file to be downloaded.
	 * @returns {Promise<Blob | StandardResponse>} A promise that resolves to a Blob containing the file data or a standard response object in case of an error.
	 */
	static async downloadFile(server: string, username: string, token: string, path: string): Promise<Blob | StandardResponse> {
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

	/**
	 * Downloads a file from the server.
	 *
	 * @param {string} path - The path of the file to be downloaded.
	 * @returns {Promise<Blob | StandardResponse>} A promise that resolves to a Blob containing the file data or a standard response object in case of an error.
	 */
	async downloadFile(path: string): Promise<Blob | StandardResponse> {
		return await CloudkyAPI.downloadFile(this.server, this.username, this.token, path);
	}

	/**
	 * Moves specified files to a new destination on the server.
	 *
	 * @param {string} server - The URL of the server where the files will be moved.
	 * @param {string} username - The username of the account making the request.
	 * @param {string} token - The token for authenticating the request.
	 * @param {string[]} files - An array of file paths to be moved.
	 * @param {string} destination - The destination path where the files will be moved.
	 * @returns {Promise<StandardResponse>} A promise that resolves to the standard response object indicating the result of the move operation.
	 */
	static async moveFiles(server: string, username: string, token: string, files: string[], destination: string): Promise<StandardResponse> {
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

	/**
	 * Moves specified files to a new destination on the server.
	 *
	 * @param {string[]} files - An array of file paths to be moved.
	 * @param {string} destination - The destination path where the files will be moved.
	 * @returns {Promise<StandardResponse>} A promise that resolves to the standard response object indicating the result of the move operation.
	 */
	async moveFiles(files: string[], destination: string): Promise<StandardResponse> {
		return await CloudkyAPI.moveFiles(this.server, this.username, this.token, files, destination);
	}

	/**
	 * Renames a file on the server.
	 *
	 * @param {string} server - The URL of the server where the file will be renamed.
	 * @param {string} username - The username of the account making the request.
	 * @param {string} token - The token for authenticating the request.
	 * @param {string} path - The current path of the file to be renamed.
	 * @param {string} destination - The new path (including filename) of the file.
	 * @returns {Promise<StandardResponse>} A promise that resolves to the standard response object indicating the result of the rename operation.
	 */
	static async renameFile(server: string, username: string, token: string, path: string, destination: string): Promise<StandardResponse> {
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

	/**
	 * Renames a file on the server.
	 *
	 * @param {string} path - The current path of the file to be renamed.
	 * @param {string} destination - The new path (including filename) of the file.
	 * @returns {Promise<StandardResponse>} A promise that resolves to the standard response object indicating the result of the rename operation.
	 */
	async renameFile(path: string, destination: string): Promise<StandardResponse> {
		return await CloudkyAPI.renameFile(this.server, this.username, this.token, path, destination);
	}

	/**
	 * Uploads a file to the server.
	 *
	 * @param {string} server - The URL of the server where the file will be uploaded.
	 * @param {string} username - The username of the account making the request.
	 * @param {string} token - The token for authenticating the request.
	 * @param {string} destination - The destination path where the file will be uploaded.
	 * @param {Blob} fileContent - The content of the file to be uploaded.
	 * @returns {Promise<StandardResponse>} A promise that resolves to the standard response object indicating the result of the upload operation.
	 */
	static async uploadFile(server: string, username: string, token: string, destination: string, fileContent: Blob): Promise<StandardResponse> {
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

	/**
	 * Uploads a file to the server.
	 *
	 * @param {string} destination - The destination path where the file will be uploaded.
	 * @param {Blob} fileContent - The content of the file to be uploaded.
	 * @returns {Promise<StandardResponse>} A promise that resolves to the standard response object indicating the result of the upload operation.
	 */
	async uploadFile(destination: string, fileContent: Blob): Promise<StandardResponse> {
		return await CloudkyAPI.uploadFile(this.server, this.username, this.token, destination, fileContent);
	}

	/**
	 * Creates a shareable link for a file or folder.
	 *
	 * @param {string} server - The URL of the server where the share link will be created.
	 * @param {string} username - The username of the account making the request.
	 * @param {string} token - The token for authenticating the request.
	 * @param {string} path - The path of the file or folder to share.
	 * @param {string | null} password - Optional password for accessing the share link.
	 * @param {bigint | number | null} expiration - Optional expiration timestamp for the share link.
	 * @returns {Promise<StandardResponse>} A promise that resolves to the standard response object indicating the result of the share link creation operation.
	 */
	static async shareLinkCreate(
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

	/**
	 * Creates a shareable link for a file or folder.
	 *
	 * @param {string} path - The path of the file or folder to share.
	 * @param {string | null} password - Optional password for accessing the share link.
	 * @param {bigint | number | null} expiration - Optional expiration timestamp for the share link.
	 * @returns {Promise<StandardResponse>} A promise that resolves to the standard response object indicating the result of the share link creation operation.
	 */
	async shareLinkCreate(path: string, password: string | null, expiration: bigint | number | null): Promise<StandardResponse> {
		return await CloudkyAPI.shareLinkCreate(this.server, this.username, this.token, path, password, expiration);
	}

	/**
	 * Deletes a shareable link.
	 *
	 * @param {string} server - The URL of the server where the share link will be deleted.
	 * @param {string} username - The username of the account making the request.
	 * @param {string} token - The token for authenticating the request.
	 * @param {string} link - The share link to be deleted.
	 * @returns {Promise<StandardResponse>} A promise that resolves to the standard response object indicating the result of the share link deletion operation.
	 */
	static async shareLinkDelete(server: string, username: string, token: string, link: string): Promise<StandardResponse> {
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

	/**
	 * Deletes a shareable link.
	 *
	 * @param {string} link - The share link to be deleted.
	 * @returns {Promise<StandardResponse>} A promise that resolves to the standard response object indicating the result of the share link deletion operation.
	 */
	async shareLinkDelete(link: string): Promise<StandardResponse> {
		return await CloudkyAPI.shareLinkDelete(this.server, this.username, this.token, link);
	}

	/**
	 * Retrieves a list of shareable links created by the account.
	 *
	 * @param {string} server - The URL of the server from which to fetch the list of shareable links.
	 * @param {string} username - The username of the account making the request.
	 * @param {string} token - The token for authenticating the request.
	 * @returns {Promise<ShareLinkListResponse>} A promise that resolves to the share link list response object, which includes a list of shareable links or an error message.
	 */
	static async shareLinkList(server: string, username: string, token: string): Promise<ShareLinkListResponse> {
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

	/**
	 * Retrieves a list of shareable links created by the account.
	 *
	 * @returns {Promise<ShareLinkListResponse>} A promise that resolves to the share link list response object, which includes a list of shareable links or an error message.
	 */
	async shareLinkList(): Promise<ShareLinkListResponse> {
		return await CloudkyAPI.shareLinkList(this.server, this.username, this.token);
	}
}

export default CloudkyAPI;
