import CloudkyAPI from "./cloudky-api";

const server = document.getElementById("server") as HTMLInputElement;
const username = document.getElementById("username") as HTMLInputElement;
const email = document.getElementById("email") as HTMLInputElement;
const password = document.getElementById("password") as HTMLInputElement;
const token = document.getElementById("token") as HTMLInputElement;
const response = document.getElementById("response") as HTMLInputElement;

const loginPage = document.getElementById("login-page");
const loggedInPage = document.getElementById("loggedin-page");

let cloudky;

document.getElementById("btn-create-account")?.addEventListener("click", async () => {
	if (!server || !username || !email || !password || !response) return;
	const authHash = await CloudkyAPI.generateAuthenticationHash(username.value, password.value);
	if (!authHash) return;
	const res = await CloudkyAPI.createAccount(server.value, username.value, email.value, authHash, 0);
	response.value = JSON.stringify(res);
});

document.getElementById("btn-get-token")?.addEventListener("click", async () => {
	if (!server || !username || !password || !response) return;
	cloudky = new CloudkyAPI(server.value, username.value, password.value, null);
	if (!(await cloudky.initialize())) return;

	const res = await cloudky.getToken();

	if (res.token) {
		if (loginPage) loginPage.style.display = "none";
		if (loggedInPage) loggedInPage.style.display = "block";
		response.value = "";
	} else {
		response.value = JSON.stringify(res);
	}
});
