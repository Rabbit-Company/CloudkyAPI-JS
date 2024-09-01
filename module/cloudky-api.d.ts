declare const enum Error$1 {
	/** Action was executed successfully. */
	SUCCESS = 0,
	/** Invalid API endpoint. */
	INVALID_ENDPOINT = 404,
	/** Bearer Token is missing in Authorization header. */
	BEARER_TOKEN_MISSING = 1000,
	/** Required data is missing from the request. */
	REQUIRED_DATA_MISSING = 1001,
	/** Registration is disabled on this server. */
	REGISTRATION_DISABLED = 1002,
	/** Invalid username format. */
	INVALID_USERNAME_FORMAT = 1003,
	/** Password is not hashed using Blake2b algorithm. */
	PASSWORD_NOT_HASHED = 1004,
	/** Invalid file name. */
	INVALID_FILE_NAME = 1005,
	/** Provided file is invalid. */
	INVALID_FILE = 1006,
	/** Username is already registered. */
	USERNAME_ALREADY_REGISTERED = 1007,
	/** Invalid API Secret Key in Bearer Token. */
	INVALID_API_SECRET_KEY = 1008,
	/** Provided email is invalid. */
	INVALID_EMAIL = 1009,
	/** File size exceeds the maximum limit of 50GB. */
	MAX_FILE_SIZE_EXCEEDED = 1010,
	/** Missing Authorization header with Username and Password. */
	MISSING_AUTHORIZATION_HEADER = 1011,
	/** Provided username is invalid. */
	INVALID_USERNAME = 1012,
	/** Provided password is invalid. */
	INVALID_PASSWORD = 1013,
	/** Password is incorrect. */
	INCORRECT_PASSWORD = 1014,
	/** Redis connection error. */
	REDIS_CONNECTION_ERROR = 1015,
	/** Provided token is invalid. */
	INVALID_TOKEN = 1016,
	/** Provided token is incorrect or expired. */
	TOKEN_EXPIRED = 1017,
	/** Missing username and token in Authorization header. */
	MISSING_USERNAME_AND_TOKEN = 1018,
	/** Provided account type is invalid. */
	INVALID_ACCOUNT_TYPE = 1019,
	/** Provided upload ID is invalid. */
	INVALID_UPLOAD_ID = 1020,
	/** Provided expiration timestamp is invalid. */
	INVALID_EXPIRATION_TIMESTAMP = 1021,
	/** Non-existent share link. */
	NON_EXISTENT_SHARE_LINK = 1022,
	/** Provided share link is invalid. */
	INVALID_SHARE_LINK = 1023,
	/** Provided OTP is invalid. */
	INVALID_OTP = 1024,
	/** Provided password is too weak. */
	PASSWORD_TOO_WEAK = 1025,
	/** Unknown error occurred. */
	UNKNOWN_ERROR = 2000,
	/** Server is unreachable. */
	SERVER_UNREACHABLE = 5000,
	/** Invalid response format received from server. */
	INVALID_RESPONSE_FORMAT = 5001,
	/** Insufficient permissions to perform this action. */
	INSUFFICIENT_PERMISSIONS = 9999
}
/**
 * Represents a standard response structure with an error code and information message.
 * @interface
 */
export interface StandardResponse {
	/** The error code associated with the response. */
	error: Error$1;
	/** A descriptive message providing more information about the response. */
	info: string;
}
/**
 * Represents the response structure for an account token request.
 * @interface
 */
export interface AccountTokenResponse {
	/** The error code associated with the response. */
	error: Error$1;
	/** A descriptive message providing more information about the response. */
	info: string;
	/** Temporary token used for authentication. */
	token?: string;
}
/**
 * Represents the data structure for account-related information.
 * @interface
 */
export interface AccountData {
	/** The email address associated with the account. */
	Email: string;
	/** The amount of storage used by the account, represented in bytes. */
	StorageUsed: bigint;
	/** The maximum storage limit for the account, represented in bytes. */
	StorageLimit: bigint;
	/** The amount of data downloaded by the account, represented in bytes. */
	DownloadUsed: bigint;
	/** The maximum download limit for the account, represented in bytes. */
	DownloadLimit: bigint;
	/** The amount of data uploaded by the account, represented in bytes. */
	UploadUsed: bigint;
	/** The maximum upload limit for the account, represented in bytes. */
	UploadLimit: bigint;
	/** The type of account, represented as a number (e.g., 0 for basic, 1 for file E2EE). */
	AccountType: number;
	/** The type of storage used by the server (e.g., "LOCAL", "S3"). */
	StorageType: string;
	/** The timestamp when the account was created, represented as a bigint. */
	Created: bigint;
}
/**
 * Represents the response structure for a request for account data.
 * @interface
 */
export interface AccountDataResponse {
	/** The error code associated with the response. */
	error: Error$1;
	/** A descriptive message providing more information about the response. */
	info: string;
	/** Object containing the account data. */
	data?: AccountData;
}
/**
 * Represents the information structure for a file.
 * @interface
 */
export interface FileInformation {
	/** The unique identifier (path) for the file. */
	Key: string;
	/** The timestamp of the last modification of the file, represented as a number. */
	Modified: number;
	/** The size of the file in bytes. */
	Size: number;
}
/**
 * Represents the response structure for a request for a list of files.
 * @interface
 */
export interface FileListResponse {
	/** The error code associated with the response. */
	error: Error$1;
	/** A descriptive message providing more information about the response. */
	info: string;
	/** Array containing file information objects. */
	data?: FileInformation[];
}
/**
 * Represents the structure of a share link.
 * @interface
 */
export interface ShareLink {
	/** The unique token associated with the share link. */
	Token: string;
	/** The path to the shared resource. */
	Path: string;
	/** The username associated with the share link. */
	Username?: string;
	/** The password required to access the share link, or null if no password is required. */
	Password: string | null;
	/** The expiration time of the share link, represented as a bigint, or null if it does not expire. */
	Expiration: bigint | null;
	/** The number of times the shared resource has been downloaded. */
	Downloaded: number;
	/** The timestamp when the share link was created, represented as a bigint. */
	Created: bigint;
	/** The timestamp of the last access to the share link, represented as a bigint. */
	Accessed: bigint;
}
/**
 * Represents the response structure for a request for a list of share links.
 * @interface
 */
export interface ShareLinkListResponse {
	/** The error code associated with the response. */
	error: Error$1;
	/** A descriptive message providing more information about the response. */
	info: string;
	/** Array containing share link objects. */
	links?: ShareLink[];
}
/**
 * Class for interacting with the Cloudky API.
 *
 * This class provides functions for managing accounts, files, and shareable links
 * via HTTP requests to the Cloudky server.
 */
declare class CloudkyAPI {
	server: string;
	username: string;
	private password;
	private otp;
	private authHash;
	token: string;
	/**
	 * Creates an instance of CloudkyAPI.
	 *
	 * @constructor
	 * @param {string} server - The URL of the server to connect to.
	 * @param {string} username - The username for authentication.
	 * @param {string} password - The password for authentication.
	 * @param {string|null} otp - The one-time password (OTP) for two-factor authentication.
	 */
	constructor(server: string, username: string, password: string, otp: string);
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
	static validate(server: string, username: string, password: string, otp: string): StandardResponse;
	/**
	 * Validates the current instance's properties for interacting with the Cloudky API.
	 *
	 * This method checks the validity of the server URL, username, OTP, and depending on the state,
	 * either the token, authHash, or password. It returns an appropriate error response if any of the validations fail.
	 *
	 * @returns {StandardResponse} The validation response indicating success or error.
	 */
	validate(): StandardResponse;
	/**
	 * Initializes the CloudkyAPI instance by generating the authentication hash.
	 * This method sets the `authHash` property based on the provided username and password,
	 * and clears the password from memory if the hash is successfully generated.
	 *
	 * @returns {Promise<boolean>} A promise that resolves to `true` if the `authHash` is successfully generated, otherwise `false`.
	 */
	initialize(): Promise<boolean>;
	/**
	 * Generates a hashed authentication string using the provided username and password.
	 * This method uses Blake2b to create a unique hash and Argon2id for further hashing
	 * to enhance security.
	 *
	 * @param {string} username - The username for authentication.
	 * @param {string} password - The password for authentication.
	 * @returns {Promise<string|null>} A promise that resolves to the authentication hash if successful, or `null` if an error occurs during hashing.
	 */
	static generateAuthenticationHash(username: string, password: string): Promise<string | null>;
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
	static createAccount(server: string, username: string, email: string, password: string, type: number): Promise<StandardResponse>;
	/**
	 * Retrieves a token for an existing account using the username, password, and optional OTP.
	 *
	 * @param {string} server - The URL of the server to authenticate against.
	 * @param {string} username - The username of the account.
	 * @param {string} password - The hashed password of the account.
	 * @param {string} otp - An optional one-time password (OTP) for two-factor authentication.
	 * @returns {Promise<AccountTokenResponse>} A promise that resolves to the account token response object.
	 */
	static getToken(server: string, username: string, password: string, otp: string): Promise<AccountTokenResponse>;
	/**
	 * Retrieves a token for the current account instance using stored credentials and optional OTP.
	 * Clears authHash from memory once the token is successfully retrieved.
	 *
	 * @returns {Promise<AccountTokenResponse>} A promise that resolves to the account token response object.
	 */
	getToken(): Promise<AccountTokenResponse>;
	/**
	 * Retrieves account data for the specified username and token.
	 *
	 * @param {string} server - The URL of the server where the account data will be retrieved.
	 * @param {string} username - The username of the account.
	 * @param {string} token - The token for authenticating the request.
	 * @returns {Promise<AccountDataResponse>} A promise that resolves to the account data response object.
	 */
	static getAccountData(server: string, username: string, token: string): Promise<AccountDataResponse>;
	/**
	 * Retrieves account data for the current instance's username.
	 *
	 * @returns {Promise<AccountDataResponse>} A promise that resolves to the account data response object.
	 */
	getAccountData(): Promise<AccountDataResponse>;
	/**
	 * Deletes an existing account from the server.
	 *
	 * @param {string} server - The URL of the server where the account will be deleted.
	 * @param {string} username - The username of the account to be deleted.
	 * @param {string} token - The token for authenticating the request.
	 * @returns {Promise<StandardResponse>} A promise that resolves to the standard response object.
	 */
	static deleteAccount(server: string, username: string, token: string): Promise<StandardResponse>;
	/**
	 * Deletes an existing account from the server.
	 *
	 * @returns {Promise<StandardResponse>} A promise that resolves to the standard response object.
	 */
	deleteAccount(): Promise<StandardResponse>;
	/**
	 * Retrieves a list of files from the server.
	 *
	 * @param {string} server - The URL of the server to fetch the file list from.
	 * @param {string} username - The username of the account making the request.
	 * @param {string} token - The token for authenticating the request.
	 * @returns {Promise<FileListResponse>} A promise that resolves to the file list response object, which includes the list of files or an error message.
	 */
	static getFileList(server: string, username: string, token: string): Promise<FileListResponse>;
	/**
	 * Retrieves a list of files from the server.
	 *
	 * @returns {Promise<FileListResponse>} A promise that resolves to the file list response object, which includes the list of files or an error message.
	 */
	getFileList(): Promise<FileListResponse>;
	/**
	 * Deletes specified files from the server.
	 *
	 * @param {string} server - The URL of the server where the files will be deleted.
	 * @param {string} username - The username of the account making the request.
	 * @param {string} token - The token for authenticating the request.
	 * @param {string[]} paths - An array of file paths to be deleted.
	 * @returns {Promise<StandardResponse>} A promise that resolves to the standard response object indicating the result of the delete operation.
	 */
	static deleteFiles(server: string, username: string, token: string, paths: string[]): Promise<StandardResponse>;
	/**
	 * Deletes specified files from the server.
	 *
	 * @param {string[]} paths - An array of file paths to be deleted.
	 * @returns {Promise<StandardResponse>} A promise that resolves to the standard response object indicating the result of the delete operation.
	 */
	deleteFiles(paths: string[]): Promise<StandardResponse>;
	/**
	 * Downloads a file from the server.
	 *
	 * @param {string} server - The URL of the server from which to download the file.
	 * @param {string} username - The username of the account making the request.
	 * @param {string} token - The token for authenticating the request.
	 * @param {string} path - The path of the file to be downloaded.
	 * @returns {Promise<Blob | StandardResponse>} A promise that resolves to a Blob containing the file data or a standard response object in case of an error.
	 */
	static downloadFile(server: string, username: string, token: string, path: string): Promise<Blob | StandardResponse>;
	/**
	 * Downloads a file from the server.
	 *
	 * @param {string} path - The path of the file to be downloaded.
	 * @returns {Promise<Blob | StandardResponse>} A promise that resolves to a Blob containing the file data or a standard response object in case of an error.
	 */
	downloadFile(path: string): Promise<Blob | StandardResponse>;
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
	static moveFiles(server: string, username: string, token: string, files: string[], destination: string): Promise<StandardResponse>;
	/**
	 * Moves specified files to a new destination on the server.
	 *
	 * @param {string[]} files - An array of file paths to be moved.
	 * @param {string} destination - The destination path where the files will be moved.
	 * @returns {Promise<StandardResponse>} A promise that resolves to the standard response object indicating the result of the move operation.
	 */
	moveFiles(files: string[], destination: string): Promise<StandardResponse>;
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
	static renameFile(server: string, username: string, token: string, path: string, destination: string): Promise<StandardResponse>;
	/**
	 * Renames a file on the server.
	 *
	 * @param {string} path - The current path of the file to be renamed.
	 * @param {string} destination - The new path (including filename) of the file.
	 * @returns {Promise<StandardResponse>} A promise that resolves to the standard response object indicating the result of the rename operation.
	 */
	renameFile(path: string, destination: string): Promise<StandardResponse>;
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
	static uploadFile(server: string, username: string, token: string, destination: string, fileContent: Blob): Promise<StandardResponse>;
	/**
	 * Uploads a file to the server.
	 *
	 * @param {string} destination - The destination path where the file will be uploaded.
	 * @param {Blob} fileContent - The content of the file to be uploaded.
	 * @returns {Promise<StandardResponse>} A promise that resolves to the standard response object indicating the result of the upload operation.
	 */
	uploadFile(destination: string, fileContent: Blob): Promise<StandardResponse>;
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
	static shareLinkCreate(server: string, username: string, token: string, path: string, password: string | null, expiration: bigint | number | null): Promise<StandardResponse>;
	/**
	 * Creates a shareable link for a file or folder.
	 *
	 * @param {string} path - The path of the file or folder to share.
	 * @param {string | null} password - Optional password for accessing the share link.
	 * @param {bigint | number | null} expiration - Optional expiration timestamp for the share link.
	 * @returns {Promise<StandardResponse>} A promise that resolves to the standard response object indicating the result of the share link creation operation.
	 */
	shareLinkCreate(path: string, password: string | null, expiration: bigint | number | null): Promise<StandardResponse>;
	/**
	 * Deletes a shareable link.
	 *
	 * @param {string} server - The URL of the server where the share link will be deleted.
	 * @param {string} username - The username of the account making the request.
	 * @param {string} token - The token for authenticating the request.
	 * @param {string} link - The share link to be deleted.
	 * @returns {Promise<StandardResponse>} A promise that resolves to the standard response object indicating the result of the share link deletion operation.
	 */
	static shareLinkDelete(server: string, username: string, token: string, link: string): Promise<StandardResponse>;
	/**
	 * Deletes a shareable link.
	 *
	 * @param {string} link - The share link to be deleted.
	 * @returns {Promise<StandardResponse>} A promise that resolves to the standard response object indicating the result of the share link deletion operation.
	 */
	shareLinkDelete(link: string): Promise<StandardResponse>;
	/**
	 * Retrieves a list of shareable links created by the account.
	 *
	 * @param {string} server - The URL of the server from which to fetch the list of shareable links.
	 * @param {string} username - The username of the account making the request.
	 * @param {string} token - The token for authenticating the request.
	 * @returns {Promise<ShareLinkListResponse>} A promise that resolves to the share link list response object, which includes a list of shareable links or an error message.
	 */
	static shareLinkList(server: string, username: string, token: string): Promise<ShareLinkListResponse>;
	/**
	 * Retrieves a list of shareable links created by the account.
	 *
	 * @returns {Promise<ShareLinkListResponse>} A promise that resolves to the share link list response object, which includes a list of shareable links or an error message.
	 */
	shareLinkList(): Promise<ShareLinkListResponse>;
}

export {
	CloudkyAPI as default,
};

export {};
