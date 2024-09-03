# CloudkyAPI-JS

The CloudkyAPI library provides a set of functions for interacting with the Cloudky server, including managing accounts, handling files, and creating shareable links. This library simplifies the process of making HTTP requests to the Cloudky API, validating input data, and handling common error scenarios.

## Installation

```js
npm i --save @rabbit-company/cloudky-api
```

## Importing the Library

You can import the CloudkyAPI class, along with the types and error handling utilities provided by the library, like this:

```js
import { CloudkyAPI, Errors, Validate, StandardResponse } from "@rabbit-company/cloudky-api";
```

If you are using TypeScript, you can also import specific types for better type checking:

```ts
import type { AccountDataResponse, AccountTokenResponse } from "@rabbit-company/cloudky-api";
```

## Usage

### Creating New Account

To create a new account using the CloudkyAPI, use the createAccount function as shown below:

```js
const response = await CloudkyAPI.createAccount("https://your-cloudky-server.com", "yourUsername", "yourEmail", "yourPassword", 0);

if (response.error === Error.SUCCESS) {
	console.log("Account creation successful");
} else {
	console.error("Error: " + response.message);
}
```

### Getting an Account Token

To authenticate with the Cloudky server, you can retrieve an account token using the getToken method.

```js
const response = await CloudkyAPI.getToken("https://your-cloudky-server.com", "yourUsername", "yourPassword", "yourOTP");

if (response.token) {
	console.log("Your Authentication Token: " + response.token);
} else {
	console.error("Error: " + response.message);
}
```

### Creating an Instance

To use the CloudkyAPI, you first need to create an instance of the CloudkyAPI class with your server URL, username and token.

```js
const cloudky = new CloudkyAPI("https://your-cloudky-server.com", "yourUsername", "yourToken");
```

### Retrieving Account Data

Once you have a valid instance of the CloudkyAPI, you can retrieve account data using the getAccountData method.

```js
const accountData = await cloudky.getAccountData();

if (accountData.error === Error.SUCCESS) {
	console.log("Account Data:", accountData.data);
} else {
	console.error("Failed to retrieve account data: " + accountData.message);
}
```

### Deleting an Account

To delete an account from the Cloudky server, use the deleteAccount method.

```js
const res = await cloudky.deleteAccount();

if (res.error === Error.SUCCESS) {
	console.log("Account deleted successfully.");
} else {
	console.error("Failed to delete account: " + res.message);
}
```

### Getting List of Files

To list all files, use the listFiles method.

```js
const res = await cloudky.listFiles();

if (res.data) {
	console.log("File list: " + res.data);
} else {
	console.error("Failed to list files: " + res.message);
}
```

### Uploading a File

To upload a file, use the uploadFile method.

```js
const res = await cloudky.uploadFile("Documents/hello.txt", new Blob(["Hello World!"], { type: "text/plain" }));

if (res.error === Error.SUCCESS) {
	console.log("File uploaded successfully!");
} else {
	console.error("Failed to upload file: " + res.message);
}
```

### Downloading a File

To download a file, use the downloadFile method.

```js
const res = await cloudky.downloadFile("Documents/hello.txt");

if (res instanceof Blob) {
	console.log("File downloaded successfully!");
} else {
	console.error("Failed to download a file: " + res.message);
}
```

### Moving Files

To move files, use the moveFiles method.

```js
const res = await cloudky.moveFiles(["Documents/hello.txt"], "Documents/Test");

if (res.error === Error.SUCCESS) {
	console.log("Files moved successfully!");
} else {
	console.error("Failed to move files: " + res.message);
}
```

### Renaming File

To rename a files, use the renameFile method.

```js
const res = await cloudky.renameFile("Documents/Test/hello.txt", "Documents/Test/helloWorld.txt");

if (res.error === Error.SUCCESS) {
	console.log("File renamed successfully!");
} else {
	console.error("Failed to rename a file: " + res.message);
}
```

### Deleting Files

To delete files, use the deleteFiles method.

```js
const res = await cloudky.deleteFiles(["Documents/Test/helloWorld.txt"]);

if (res.error === Error.SUCCESS) {
	console.log("Files deleted successfully!");
} else {
	console.error("Failed to delete files: " + res.message);
}
```

### Creating Share Link

To create a share link, use the createShareLink method.

Set the password or expiration to null if you do not want to protect your share link with a password or set an expiry date.

```js
const res = await cloudky.createShareLink("Documents/Test/helloWorld.txt", "PasswordForShareLink", 1918296000000);

if (res.link) {
	console.log("Share Link successfully created: " + res.link);
} else {
	console.error("Failed to create share link: " + res.message);
}
```

### Getting List of Share Links

To list all share links, use the listShareLinks method.

```js
const res = await cloudky.listShareLinks();

if (res.links) {
	console.log("Share Links: " + res.links);
} else {
	console.error("Failed to list share links: " + res.message);
}
```

## Types

The library provides several TypeScript types that are useful for type checking and code clarity:

- `StandardResponse`: A standard response object from the server.
- `AccountTokenResponse`: The response object when retrieving an account token.
- `AccountDataResponse`: The response object when retrieving account data.
- `FileInformation`: Information about a file.
- `FileListResponse`: The response object when listing files.
- `ShareLink`: Information about a shareable link.
- `ShareLinkListResponse`: The response object when listing shareable links.

## Error Handling

The library uses the Errors object and Error enum for handling different types of errors. You can use these to handle specific errors based on your needs.

Example of handling an error:

```js
import { Error } from "@rabbit-company/cloudky-api";

const res = cloudky.getAccountData();
if (res.error === Error.TOKEN_EXPIRED) {
	console.error("Token has expired.");
}
```

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/Rabbit-Company/CloudkyAPI-JS/blob/main/LICENSE) file for details.
