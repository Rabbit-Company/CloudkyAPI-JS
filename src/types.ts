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
