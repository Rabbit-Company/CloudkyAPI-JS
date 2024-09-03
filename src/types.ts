import type { Error } from "./errors";

/**
 * Represents a standard response structure with an error code and information message.
 * @interface
 */
export interface StandardResponse {
	/** The error code associated with the response. */
	error: Error;
	/** A descriptive message providing more information about the response. */
	info: string;
}

/**
 * Represents the response structure for an account token request.
 * @interface
 */
export interface AccountTokenResponse {
	/** The error code associated with the response. */
	error: Error;
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
	error: Error;
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
	error: Error;
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
 * Represents the response structure for a request for a create share link.
 * @interface
 */
export interface ShareLinkCreateResponse {
	/** The error code associated with the response. */
	error: Error;
	/** A descriptive message providing more information about the response. */
	info: string;
	/** Share link */
	link?: string;
}

/**
 * Represents the response structure for a request for a list of share links.
 * @interface
 */
export interface ShareLinkListResponse {
	/** The error code associated with the response. */
	error: Error;
	/** A descriptive message providing more information about the response. */
	info: string;
	/** Array containing share link objects. */
	links?: ShareLink[];
}
