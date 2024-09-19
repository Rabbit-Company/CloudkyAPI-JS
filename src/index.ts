import { CloudkyAPI, Error, type StandardResponse } from "./cloudky-api";

const server = document.getElementById("server") as HTMLInputElement;
const username = document.getElementById("username") as HTMLInputElement;
const email = document.getElementById("email") as HTMLInputElement;
const password = document.getElementById("password") as HTMLInputElement;
const responses = document.getElementById("responses");

const filePath = document.getElementById("file-path") as HTMLInputElement;
const fileDestination = document.getElementById("file-destination") as HTMLInputElement;
const fileContent = document.getElementById("file-content") as HTMLInputElement;

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
	const res = await CloudkyAPI.createAccount(server.value, username.value, email.value, password.value, 0);
	printResponse(res);
});

document.getElementById("btn-get-token")?.addEventListener("click", async () => {
	if (!server || !username || !password) return;

	latency = Date.now();
	const res = await CloudkyAPI.getToken(server.value, username.value, password.value, "");
	printResponse(res);

	if (res.token) {
		cloudky = new CloudkyAPI(server.value, username.value, res.token);
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

document.getElementById("btn-sharelink-download")?.addEventListener("click", async () => {
	latency = Date.now();
	const res = await cloudky.downloadFromShareLink(sharelinkID.value, sharelinkPassword.value || null);
	if (res instanceof Blob) {
		const parts = filePath.value.split("/");
		const fileName = parts[parts.length - 1];

		const url = globalThis.URL.createObjectURL(res);
		const a = document.createElement("a");
		a.href = url;
		a.download = fileName;
		document.body.appendChild(a);
		a.click();
		globalThis.URL.revokeObjectURL(url);
		document.body.removeChild(a);
	} else {
		printResponse(res);
	}
});

document.getElementById("btn-sharelink-create")?.addEventListener("click", async () => {
	latency = Date.now();
	const res = await cloudky.createShareLink(sharelinkPath.value, sharelinkPassword.value || null, new Date(sharelinkExpiration.value).getTime() || null);
	printResponse(res);
});

document.getElementById("btn-file-upload")?.addEventListener("click", async () => {
	latency = Date.now();
	const content = fileContent?.files?.length ? fileContent.files[0] : new Blob();
	const res = await cloudky.uploadFile(filePath.value, content);
	printResponse(res);
});

document.getElementById("btn-file-download")?.addEventListener("click", async () => {
	latency = Date.now();
	const res = await cloudky.downloadFile(filePath.value);
	if (res instanceof Blob) {
		const parts = filePath.value.split("/");
		const fileName = parts[parts.length - 1];

		const url = globalThis.URL.createObjectURL(res);
		const a = document.createElement("a");
		a.href = url;
		a.download = fileName;
		document.body.appendChild(a);
		a.click();
		globalThis.URL.revokeObjectURL(url);
		document.body.removeChild(a);
	} else {
		printResponse(res);
	}
});

document.getElementById("btn-file-list")?.addEventListener("click", async () => {
	latency = Date.now();
	const res = await cloudky.listFiles();
	printResponse(res);
});

document.getElementById("btn-file-move")?.addEventListener("click", async () => {
	latency = Date.now();
	const res = await cloudky.moveFiles([filePath.value], fileDestination.value);
	printResponse(res);
});

document.getElementById("btn-file-rename")?.addEventListener("click", async () => {
	latency = Date.now();
	const res = await cloudky.renameFile(filePath.value, fileDestination.value);
	printResponse(res);
});

document.getElementById("btn-file-delete")?.addEventListener("click", async () => {
	latency = Date.now();
	const res = await cloudky.deleteFiles([filePath.value]);
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
