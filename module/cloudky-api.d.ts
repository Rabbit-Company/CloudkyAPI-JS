import Argon2id from '@rabbit-company/argon2id';
import Blake2b from '@rabbit-company/blake2b';
import PasswordEntropy from '@rabbit-company/password-entropy';

/**
 * Enum representing various error codes used throughout the application.
 * Each error code corresponds to a specific error message.
 * @readonly
 * @enum {number}
 */
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
 * Namespace containing error handling utilities.
 * Provides methods to retrieve error details and format error responses in JSON.
 * @namespace
 */
export declare namespace Errors {
	/**
	 * A dictionary mapping error codes to their corresponding messages and HTTP status codes.
	 * @type {{ [key: number]: { message: string; httpCode: number } }}
	 */
	const list: {
		[key: number]: {
			message: string;
			httpCode: number;
		};
	};
	/**
	 * Retrieves the error details for a given error code.
	 * @param {Error} id - The error code to retrieve details for.
	 * @returns {{ message: string; httpCode: number }} An object containing the error message and HTTP status code.
	 */
	function get(id: Error$1): {
		message: string;
		httpCode: number;
	};
	/**
	 * Formats the error response as a JSON object.
	 * @param {Error} id - The error code to format.
	 * @returns {{ error: Error, info: string }} A JSON object containing the error code and message.
	 */
	function getJson(id: Error$1): {
		error: Error$1;
		info: string;
	};
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
 * The `Validate` namespace provides a collection of validation functions
 * used to verify the correctness of various input data types, such as
 * usernames, passwords, URLs, email addresses, and more. These utility
 * functions are useful for ensuring data integrity and security throughout
 * the application.
 */
export declare namespace Validate {
	/**
	 * Validates a username based on specific rules.
	 * A valid username:
	 * - Should not be one of the restricted names (e.g., "null", "com1", "lpt1", "admin").
	 * - Should not contain double hyphens "--".
	 * - Must start with a lowercase letter and can include lowercase letters, numbers, and hyphens.
	 * - Must be between 4 and 30 characters long.
	 *
	 * @param {string} username - The username to validate.
	 * @returns {boolean} True if the username is valid, otherwise false.
	 */
	function username(username: string): boolean;
	/**
	 * Validates a password.
	 * A valid password:
	 * - Must be exactly 128 characters long.
	 * - Can include lowercase and uppercase letters and numbers.
	 *
	 * @param {string} password - The password to validate.
	 * @returns {boolean} True if the password is valid, otherwise false.
	 */
	function password(password: string): boolean;
	/**
	 * Validates a URL.
	 *
	 * @param {string} url - The URL to validate.
	 * @returns {boolean} True if the URL is valid, otherwise false.
	 */
	function url(url: string): boolean;
	/**
	 * Validates an email address.
	 *
	 * @param {string} email - The email address to validate.
	 * @returns {boolean} True if the email is valid, otherwise false.
	 */
	function email(email: string): boolean;
	/**
	 * Validates an account type.
	 * Valid account types are either 0 or 1.
	 *
	 * @param {number} type - The account type to validate.
	 * @returns {boolean} True if the account type is valid, otherwise false.
	 */
	function accountType(type: number): boolean;
	/**
	 * Validates a One-Time Password (OTP).
	 * A valid OTP:
	 * - Must be null, empty, 6 characters long, or 44 characters long.
	 *
	 * @param {string | null} otp - The OTP to validate.
	 * @returns {boolean} True if the OTP is valid, otherwise false.
	 */
	function otp(otp: string | null): boolean;
	/**
	 * Validates a token.
	 * A valid token:
	 * - Must be exactly 128 characters long.
	 * - Can include lowercase and uppercase letters and numbers.
	 *
	 * @param {string} token - The token to validate.
	 * @returns {boolean} True if the token is valid, otherwise false.
	 */
	function token(token: string): boolean;
	/**
	 * Validates if a value is a positive integer.
	 *
	 * @param {any} number - The value to check.
	 * @returns {boolean} True if the value is a positive integer, otherwise false.
	 */
	function positiveInteger(number: any): boolean;
	/**
	 * Validates a YubiKey ID.
	 * A valid YubiKey ID is 44 characters long.
	 *
	 * @param {string} id - The YubiKey ID to validate.
	 * @returns {boolean} True if the ID is valid, otherwise false.
	 */
	function yubiKey(id: string): boolean;
	/**
	 * Validates a license key.
	 * A valid license key is 29 characters long.
	 *
	 * @param {string} license - The license key to validate.
	 * @returns {boolean} True if the license key is valid, otherwise false.
	 */
	function license(license: string): boolean;
	/**
	 * Checks if a string is a valid JSON string.
	 *
	 * @param {string} json - The string to validate as JSON.
	 * @returns {boolean} True if the string is valid JSON, otherwise false.
	 */
	function json(json: string): boolean;
	/**
	 * Validates a response object.
	 * A valid response has an 'error' property of type number and an 'info' property of type string.
	 *
	 * @param {any} response - The response object to validate.
	 * @returns {boolean} True if the response is valid, otherwise false.
	 */
	function response(response: any): boolean;
	/**
	 * Validates a file path name for a user.
	 * A valid file path name:
	 * - Should not include "..".
	 * - Must match the regex pattern /^[a-zA-Z0-9\/_. -]+$/.
	 *
	 * @param {string} filePathName - The file path name to validate.
	 * @returns {boolean} True if the file path name is valid, otherwise false.
	 */
	function userFilePathName(filePathName: string): boolean;
	/**
	 * Validates an array of file path names for a user.
	 * Each valid file path name:
	 * - Should not include "..".
	 * - Must match the regex pattern /^[a-zA-Z0-9\/_. -]+$/.
	 *
	 * @param {string[]} filePathNames - The array of file path names to validate.
	 * @returns {boolean} True if all file path names are valid, otherwise false.
	 */
	function userFilePathNames(filePathNames: string[]): boolean;
	/**
	 * Validates an expiration time.
	 * The expiration time is valid if it is greater than the current time.
	 *
	 * @param {bigint | number} expiration - The expiration time to validate.
	 * @returns {boolean} True if the expiration time is valid, otherwise false.
	 */
	function expiration(expiration: bigint | number): boolean;
	/**
	 * Validates a share link.
	 * A valid share link is exactly 15 alphanumeric characters.
	 *
	 * @param {string} id - The share link to validate.
	 * @returns {boolean} True if the share link is valid, otherwise false.
	 */
	function sharelink(id: string): boolean;
}
/**
 * Class for interacting with the Cloudky API.
 *
 * This class provides functions for managing accounts, files, and shareable links
 * via HTTP requests to the Cloudky server.
 */
export declare class CloudkyAPI {
	server: string;
	username: string;
	token: string;
	/**
	 * Creates an instance of CloudkyAPI.
	 *
	 * @constructor
	 * @param {string} server - The URL of the server to connect to.
	 * @param {string} username - The username for authentication.
	 * @param {string} token - The token for authenticating the request.
	 */
	constructor(server: string, username: string, token: string);
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
	 * This method checks the validity of the server URL, username and token.
	 * It returns an appropriate error response if any of the validations fail.
	 *
	 * @returns {StandardResponse} The validation response indicating success or error.
	 */
	validate(): StandardResponse;
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
	 * @param {string} password - The strong password for the new account.
	 * @param {number} type - The account type (0 for standard, 1 for file E2EE).
	 * @returns {Promise<StandardResponse>} A promise that resolves to the standard response object.
	 */
	static createAccount(server: string, username: string, email: string, password: string, type: number): Promise<StandardResponse>;
	/**
	 * Retrieves a token for an existing account using the username, password, and optional OTP.
	 *
	 * @param {string} server - The URL of the server to authenticate against.
	 * @param {string} username - The username of the account.
	 * @param {string} password - The strong password of the account.
	 * @param {string} otp - An optional one-time password (OTP) for two-factor authentication.
	 * @returns {Promise<AccountTokenResponse>} A promise that resolves to the account token response object.
	 */
	static getToken(server: string, username: string, password: string, otp: string): Promise<AccountTokenResponse>;
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
	static listFiles(server: string, username: string, token: string): Promise<FileListResponse>;
	/**
	 * Retrieves a list of files from the server.
	 *
	 * @returns {Promise<FileListResponse>} A promise that resolves to the file list response object, which includes the list of files or an error message.
	 */
	listFiles(): Promise<FileListResponse>;
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
	static createShareLink(server: string, username: string, token: string, path: string, password: string | null, expiration: bigint | number | null): Promise<StandardResponse>;
	/**
	 * Creates a shareable link for a file or folder.
	 *
	 * @param {string} path - The path of the file or folder to share.
	 * @param {string | null} password - Optional password for accessing the share link.
	 * @param {bigint | number | null} expiration - Optional expiration timestamp for the share link.
	 * @returns {Promise<StandardResponse>} A promise that resolves to the standard response object indicating the result of the share link creation operation.
	 */
	createShareLink(path: string, password: string | null, expiration: bigint | number | null): Promise<StandardResponse>;
	/**
	 * Downloads a file from the share link.
	 *
	 * @param {string} server - The URL of the server from which to download the file.
	 * @param {string} link - The share link for file to be downloaded from.
	 * @param {string | null} password - Optional password for accessing the share link.
	 * @returns {Promise<Blob | StandardResponse>} A promise that resolves to a Blob containing the file data or a standard response object in case of an error.
	 */
	static downloadFromShareLink(server: string, link: string, password: string | null): Promise<Blob | StandardResponse>;
	/**
	 * Downloads a file from the share link.
	 *
	 * @param {string} link - The share link for file to be downloaded from.
	 * @param {string | null} password - Optional password for accessing the share link.
	 * @returns {Promise<Blob | StandardResponse>} A promise that resolves to a Blob containing the file data or a standard response object in case of an error.
	 */
	downloadFromShareLink(link: string, password: string | null): Promise<Blob | StandardResponse>;
	/**
	 * Deletes a shareable link.
	 *
	 * @param {string} server - The URL of the server where the share link will be deleted.
	 * @param {string} username - The username of the account making the request.
	 * @param {string} token - The token for authenticating the request.
	 * @param {string} link - The share link to be deleted.
	 * @returns {Promise<StandardResponse>} A promise that resolves to the standard response object indicating the result of the share link deletion operation.
	 */
	static deleteShareLink(server: string, username: string, token: string, link: string): Promise<StandardResponse>;
	/**
	 * Deletes a shareable link.
	 *
	 * @param {string} link - The share link to be deleted.
	 * @returns {Promise<StandardResponse>} A promise that resolves to the standard response object indicating the result of the share link deletion operation.
	 */
	deleteShareLink(link: string): Promise<StandardResponse>;
	/**
	 * Retrieves a list of shareable links created by the account.
	 *
	 * @param {string} server - The URL of the server from which to fetch the list of shareable links.
	 * @param {string} username - The username of the account making the request.
	 * @param {string} token - The token for authenticating the request.
	 * @returns {Promise<ShareLinkListResponse>} A promise that resolves to the share link list response object, which includes a list of shareable links or an error message.
	 */
	static listShareLinks(server: string, username: string, token: string): Promise<ShareLinkListResponse>;
	/**
	 * Retrieves a list of shareable links created by the account.
	 *
	 * @returns {Promise<ShareLinkListResponse>} A promise that resolves to the share link list response object, which includes a list of shareable links or an error message.
	 */
	listShareLinks(): Promise<ShareLinkListResponse>;
}

export {
	Argon2id,
	Blake2b,
	Error$1 as Error,
	PasswordEntropy,
};

export {};
