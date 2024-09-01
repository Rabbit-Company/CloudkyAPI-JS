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
