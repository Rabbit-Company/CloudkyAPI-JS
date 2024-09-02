import { CloudkyAPI, Error, type StandardResponse } from "./cloudky-api";

const server = document.getElementById("server") as HTMLInputElement;
const username = document.getElementById("username") as HTMLInputElement;
const email = document.getElementById("email") as HTMLInputElement;
const password = document.getElementById("password") as HTMLInputElement;
const responses = document.getElementById("responses");

const sharelinkID = document.getElementById("sharelink-id") as HTMLInputElement;
const sharelinkPath = document.getElementById("sharelink-path") as HTMLInputElement;
const sharelinkPassword = document.getElementById("sharelink-password") as HTMLInputElement;
const sharelinkExpiration = document.getElementById("sharelink-expiration") as HTMLInputElement;

const loginPage = document.getElementById("login-page");
const loggedInPage = document.getElementById("loggedin-page");

let cloudky: CloudkyAPI;
let counter = 1;
let latency = Date.now();

if (sharelinkExpiration) {
	sharelinkExpiration.value = new Date().toISOString().slice(0, 16);
}

document.getElementById("btn-create-account")?.addEventListener("click", async () => {
	if (!server || !username || !email || !password) return;

	latency = Date.now();

	const resValidate = CloudkyAPI.validate(server.value, username.value, password.value, "");
	if (resValidate.error !== Error.SUCCESS) {
		printResponse(resValidate);
		return;
	}

	const authHash = await CloudkyAPI.generateAuthenticationHash(username.value, password.value);
	if (!authHash) return;

	const res = await CloudkyAPI.createAccount(server.value, username.value, email.value, authHash, 0);
	printResponse(res);
});

document.getElementById("btn-get-token")?.addEventListener("click", async () => {
	if (!server || !username || !password) return;

	latency = Date.now();
	cloudky = new CloudkyAPI(server.value, username.value, password.value, "");

	const resValidate = cloudky.validate();
	if (resValidate.error !== Error.SUCCESS) {
		printResponse(resValidate);
		return;
	}

	if (!(await cloudky.initialize())) return;

	const res = await cloudky.getToken();
	printResponse(res);

	if (res.token) {
		if (loginPage) loginPage.style.display = "none";
		if (loggedInPage) loggedInPage.style.display = "block";
	}
});

document.getElementById("btn-get-account-data")?.addEventListener("click", async () => {
	latency = Date.now();
	const res = await cloudky.getAccountData();
	printResponse(res);
});

document.getElementById("btn-delete-account")?.addEventListener("click", async () => {
	latency = Date.now();
	const res = await cloudky.deleteAccount();
	printResponse(res);

	if (res.error === Error.SUCCESS) {
		if (loginPage) loginPage.style.display = "block";
		if (loggedInPage) loggedInPage.style.display = "none";
	}
});

document.getElementById("btn-sharelink-list")?.addEventListener("click", async () => {
	latency = Date.now();
	const res = await cloudky.listShareLinks();
	printResponse(res);
});

document.getElementById("btn-sharelink-delete")?.addEventListener("click", async () => {
	latency = Date.now();
	const res = await cloudky.deleteShareLink(sharelinkID.value);
	printResponse(res);
});

document.getElementById("btn-sharelink-create")?.addEventListener("click", async () => {
	latency = Date.now();
	const res = await cloudky.createShareLink(sharelinkPath.value, sharelinkPassword.value || null, new Date(sharelinkExpiration.value).getTime() || null);
	printResponse(res);
});

function printResponse(response: StandardResponse) {
	if (!responses) return;

	const date = new Date().toISOString().split("T")[0];
	const time = new Date().toISOString().split("T")[1].split(".")[0];

	responses.innerHTML += `<p class="response ${Number(response.error) === 0 ? "green" : "red"}">${counter}. ${date} ${time} - ${
		Date.now() - latency
	}ms<br /><br />${JSON.stringify(response, null, 4)}</p>`;
	counter++;
	responses.scrollTop = responses.scrollHeight;
}
