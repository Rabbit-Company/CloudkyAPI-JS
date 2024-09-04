import type { StandardResponse } from "./types";

/**
 * Enum representing various error codes used throughout the application.
 * Each error code corresponds to a specific error message.
 * @readonly
 * @enum {number}
 */
export enum Error {
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
	INSUFFICIENT_PERMISSIONS = 9999,
}

/**
 * Namespace containing error handling utilities.
 * Provides methods to retrieve error details and format error responses in JSON.
 * @namespace
 */
namespace Errors {
	/**
	 * A dictionary mapping error codes to their corresponding messages and HTTP status codes.
	 * @type {{ [key: number]: { message: string; httpCode: number } }}
	 */
	export const list: { [key: number]: { message: string; httpCode: number } } = {
		0: { message: "Success", httpCode: 200 },
		404: { message: "Invalid API endpoint", httpCode: 404 },
		1000: { message: "Bearer Token is missing in Authorization header.", httpCode: 401 },
		1001: { message: "Not all required data provided in json format.", httpCode: 400 },
		1002: { message: "Registration is disabled on this server.", httpCode: 403 },
		1003: { message: "The username must be 4 to 30 characters long and contain only lowercase letters, numbers, and hyphens.", httpCode: 400 },
		1004: { message: "Password must be hashed using Blake2b algorithm.", httpCode: 400 },
		1005: { message: "Provided file name can not contain special characters.", httpCode: 400 },
		1006: { message: "Provided file is invalid.", httpCode: 400 },
		1007: { message: "Username is already registered.", httpCode: 409 },
		1008: { message: "Provided API Secret Key in Bearer Token is invalid.", httpCode: 401 },
		1009: { message: "Provided email is invalid.", httpCode: 400 },
		1010: { message: "Max file size is 50GB.", httpCode: 413 },
		1011: { message: "Username and Password are missing in Authorization header.", httpCode: 401 },
		1012: { message: "Provided username is invalid.", httpCode: 400 },
		1013: { message: "Provided password is invalid.", httpCode: 400 },
		1014: { message: "Password is incorrect.", httpCode: 401 },
		1015: { message: "Redis connection error.", httpCode: 500 },
		1016: { message: "Provided token is invalid.", httpCode: 401 },
		1017: { message: "Provided token is incorrect or it has expired.", httpCode: 401 },
		1018: { message: "Username and Token are missing in Authorization header.", httpCode: 401 },
		1019: { message: "Provided account type in invalid.", httpCode: 400 },
		1020: { message: "Provided uploadID needs to be UUIDv4", httpCode: 400 },
		1021: { message: "Provided expiration timestamp is invalid.", httpCode: 400 },
		1022: { message: "Share Link can not be created on non-existing file or folder.", httpCode: 400 },
		1023: { message: "Provided share link is invalid.", httpCode: 400 },
		1024: { message: "Provided OTP is invalid.", httpCode: 400 },
		1025: { message: "Your password is too weak!", httpCode: 400 },
		2000: { message: "Something went wrong while trying to perform this action. Please try again later.", httpCode: 500 },
		5000: { message: "Server is unreachable!", httpCode: 503 },
		9999: { message: "Your do not have permission to perform this action.", httpCode: 403 },
	};

	/**
	 * Retrieves the error details for a given error code.
	 * @param {Error} id - The error code to retrieve details for.
	 * @returns {{ message: string; httpCode: number }} An object containing the error message and HTTP status code.
	 */
	export function get(id: Error): { message: string; httpCode: number } {
		return list[id];
	}

	/**
	 * Formats the error response as a JSON object.
	 * @param {Error} id - The error code to format.
	 * @returns {StandardResponse} A JSON object containing the error code and message.
	 */
	export function getJson(id: Error): StandardResponse {
		return { error: id, info: list[id].message };
	}
}

export default Errors;
