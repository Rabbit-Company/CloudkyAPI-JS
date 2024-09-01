/**
 * The `Validate` namespace provides a collection of validation functions
 * used to verify the correctness of various input data types, such as
 * usernames, passwords, URLs, email addresses, and more. These utility
 * functions are useful for ensuring data integrity and security throughout
 * the application.
 */
namespace Validate {
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
	export function username(username: string): boolean {
		if (["null", "com1", "lpt1", "admin"].includes(username)) return false;
		if (username.includes("--")) return false;
		return /^([a-z][a-z0-9\-]{3,29})$/.test(username);
	}

	/**
	 * Validates a password.
	 * A valid password:
	 * - Must be exactly 128 characters long.
	 * - Can include lowercase and uppercase letters and numbers.
	 *
	 * @param {string} password - The password to validate.
	 * @returns {boolean} True if the password is valid, otherwise false.
	 */
	export function password(password: string): boolean {
		return /^[a-z0-9]{128}$/i.test(password);
	}

	/**
	 * Validates a URL.
	 *
	 * @param {string} url - The URL to validate.
	 * @returns {boolean} True if the URL is valid, otherwise false.
	 */
	export function url(url: string): boolean {
		try {
			new URL(url);
			return true;
		} catch {
			return false;
		}
	}

	/**
	 * Validates an email address.
	 *
	 * @param {string} email - The email address to validate.
	 * @returns {boolean} True if the email is valid, otherwise false.
	 */
	export function email(email: string): boolean {
		return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(email);
	}

	/**
	 * Validates an account type.
	 * Valid account types are either 0 or 1.
	 *
	 * @param {number} type - The account type to validate.
	 * @returns {boolean} True if the account type is valid, otherwise false.
	 */
	export function accountType(type: number): boolean {
		return [0, 1].includes(type);
	}

	/**
	 * Validates a One-Time Password (OTP).
	 * A valid OTP:
	 * - Must be null, empty, 6 characters long, or 44 characters long.
	 *
	 * @param {string | null} otp - The OTP to validate.
	 * @returns {boolean} True if the OTP is valid, otherwise false.
	 */
	export function otp(otp: string | null): boolean {
		if (otp == null) return false;
		return otp.length == 0 || otp.length == 6 || otp.length == 44;
	}

	/**
	 * Validates a token.
	 * A valid token:
	 * - Must be exactly 128 characters long.
	 * - Can include lowercase and uppercase letters and numbers.
	 *
	 * @param {string} token - The token to validate.
	 * @returns {boolean} True if the token is valid, otherwise false.
	 */
	export function token(token: string): boolean {
		return /^[a-z0-9]{128}$/i.test(token);
	}

	/**
	 * Validates if a value is a positive integer.
	 *
	 * @param {any} number - The value to check.
	 * @returns {boolean} True if the value is a positive integer, otherwise false.
	 */
	export function positiveInteger(number: any): boolean {
		if (typeof number == "undefined" || number == null) return false;
		return number >>> 0 === parseFloat(number);
	}

	/**
	 * Validates a YubiKey ID.
	 * A valid YubiKey ID is 44 characters long.
	 *
	 * @param {string} id - The YubiKey ID to validate.
	 * @returns {boolean} True if the ID is valid, otherwise false.
	 */
	export function yubiKey(id: string): boolean {
		return id.length == 44;
	}

	/**
	 * Validates a license key.
	 * A valid license key is 29 characters long.
	 *
	 * @param {string} license - The license key to validate.
	 * @returns {boolean} True if the license key is valid, otherwise false.
	 */
	export function license(license: string): boolean {
		return license.length == 29;
	}

	/**
	 * Checks if a string is a valid JSON string.
	 *
	 * @param {string} json - The string to validate as JSON.
	 * @returns {boolean} True if the string is valid JSON, otherwise false.
	 */
	export function json(json: string): boolean {
		try {
			JSON.parse(json);
			return true;
		} catch {}
		return false;
	}

	/**
	 * Validates a response object.
	 * A valid response has an 'error' property of type number and an 'info' property of type string.
	 *
	 * @param {any} response - The response object to validate.
	 * @returns {boolean} True if the response is valid, otherwise false.
	 */
	export function response(response: any): boolean {
		return typeof response.error === "number" && typeof response.info === "string";
	}

	/**
	 * Validates a file path name for a user.
	 * A valid file path name:
	 * - Should not include "..".
	 * - Must match the regex pattern /^[a-zA-Z0-9\/_. -]+$/.
	 *
	 * @param {string} filePathName - The file path name to validate.
	 * @returns {boolean} True if the file path name is valid, otherwise false.
	 */
	export function userFilePathName(filePathName: string): boolean {
		if (filePathName.includes("..")) return false;
		return /^[a-zA-Z0-9\/_. -]+$/.test(filePathName);
	}

	/**
	 * Validates an array of file path names for a user.
	 * Each valid file path name:
	 * - Should not include "..".
	 * - Must match the regex pattern /^[a-zA-Z0-9\/_. -]+$/.
	 *
	 * @param {string[]} filePathNames - The array of file path names to validate.
	 * @returns {boolean} True if all file path names are valid, otherwise false.
	 */
	export function userFilePathNames(filePathNames: string[]): boolean {
		for (let i = 0; i < filePathNames.length; i++) {
			if (filePathNames[i].includes("..")) return false;
			if (!/^[a-zA-Z0-9\/_. -]+$/.test(filePathNames[i])) return false;
		}
		return true;
	}

	/**
	 * Validates an expiration time.
	 * The expiration time is valid if it is greater than the current time.
	 *
	 * @param {bigint | number} expiration - The expiration time to validate.
	 * @returns {boolean} True if the expiration time is valid, otherwise false.
	 */
	export function expiration(expiration: bigint | number): boolean {
		return Number(expiration) > Date.now();
	}

	/**
	 * Validates a share link.
	 * A valid share link is exactly 15 alphanumeric characters.
	 *
	 * @param {string} id - The share link to validate.
	 * @returns {boolean} True if the share link is valid, otherwise false.
	 */
	export function sharelink(id: string): boolean {
		return /^([A-Za-z0-9]{15})$/.test(id);
	}
}

export default Validate;
