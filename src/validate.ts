namespace Validate {
	export function username(username: string): boolean {
		if (["null", "com1", "lpt1", "admin"].includes(username)) return false;
		if (username.includes("--")) return false;
		return /^([a-z][a-z0-9\-]{3,29})$/.test(username);
	}

	export function password(password: string): boolean {
		return /^[a-z0-9]{128}$/i.test(password);
	}

	export function url(url: string): boolean {
		try {
			new URL(url);
			return true;
		} catch {
			return false;
		}
	}

	export function email(email: string): boolean {
		return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(email);
	}

	export function accountType(type: number): boolean {
		return [0, 1].includes(type);
	}

	export function otp(otp: string | null): boolean {
		if (otp == null) return false;
		return otp.length == 0 || otp.length == 6 || otp.length == 44;
	}

	export function token(token: string): boolean {
		return /^[a-z0-9]{128}$/i.test(token);
	}

	export function positiveInteger(number: any): boolean {
		if (typeof number == "undefined" || number == null) return false;
		return number >>> 0 === parseFloat(number);
	}

	export function yubiKey(id: string): boolean {
		return id.length == 44;
	}

	export function license(license: string): boolean {
		return license.length == 29;
	}

	export function json(json: string): boolean {
		try {
			JSON.parse(json);
			return true;
		} catch {}
		return false;
	}

	export function response(response: any): boolean {
		return typeof response.error === "number" && typeof response.info === "string";
	}

	export function userFilePathNames(filePathNames: string[]): boolean {
		for (let i = 0; i < filePathNames.length; i++) {
			if (filePathNames[i].includes("..")) return false;
			if (!/^[a-zA-Z0-9\/_. -]+$/.test(filePathNames[i])) return false;
		}
		return true;
	}
}

export default Validate;
