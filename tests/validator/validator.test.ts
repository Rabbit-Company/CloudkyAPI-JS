import { expect, test, describe } from "bun:test";
import { Validate } from "../../src/cloudky-api";

describe("validator", () => {
	test("usernames", async () => {
		let allInvalid = true;

		const problematicUsernames = [
			"john doe",
			"admin",
			"user name",
			"user!name",
			"user@name",
			"user#name",
			"user$name",
			"user%name",
			"user^name",
			"user&name",
			"user*name",
			"user(name",
			"user)name",
			"user+name",
			"user=name",
			"user{name",
			"user}name",
			"user[name",
			"user]name",
			"user|name",
			"user\\name",
			"user/name",
			"user?name",
			"user<name",
			"user>name",
			"user,name",
			"user;name",
			"user'name",
			'user"name',
			"user~name",
			"user`name",
			"user:name",
			"user@domain.com",
			"user...name",
			"user--name",
			"user😀name",
			"usérnäme",
			"用戶名",
			"пользователь",
			"ユーザー",
			"사용자",
			"user%20name",
			"user%name",
			"user%2Fname",
			"user%3Fname",
			"user%2F%2E%2E",
			"user\nname",
			"user\tname",
			"user\x00name",
			"user\x1Fname",
			"..",
			".",
			"/etc/passwd",
			"C:\\Windows\\System32",
			"null",
			"con",
			"aux",
			"prn",
			"NUL",
			"com1",
			"lpt1",
			"user' OR '1'='1'",
			"user; DROP TABLE users; --",
			"user<script>alert('xss')</script>",
			"user\";alert('xss');\"",
			"user".repeat(30),
		];

		problematicUsernames.forEach((username) => {
			if (Validate.username(username)) allInvalid = false;
		});

		expect(allInvalid).toBe(true);
	});
});
