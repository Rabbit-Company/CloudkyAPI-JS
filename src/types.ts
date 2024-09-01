import type { Error } from "./errors";

export interface StandardResponse {
	error: Error;
	info: string;
}

export interface AccountTokenResponse {
	error: Error;
	info: string;
	token?: string;
}

export interface AccountData {
	Email: string;
	StorageUsed: bigint;
	StorageLimit: bigint;
	DownloadUsed: bigint;
	DownloadLimit: bigint;
	UploadUsed: bigint;
	UploadLimit: bigint;
	AccountType: number;
	StorageType: string;
	Created: bigint;
}

export interface AccountDataResponse {
	error: Error;
	info: string;
	data?: AccountData;
}

export interface FileInformation {
	Key: string;
	Modified: number;
	Size: number;
}

export interface FileListResponse {
	error: Error;
	info: string;
	data?: FileInformation[];
}

export interface ShareLink {
	Token: string;
	Path: string;
	Username?: string;
	Password: string | null;
	Expiration: bigint | null;
	Downloaded: number;
	Created: bigint;
	Accessed: bigint;
}

export interface ShareLinkListResponse {
	error: Error;
	info: string;
	links?: ShareLink[];
}
