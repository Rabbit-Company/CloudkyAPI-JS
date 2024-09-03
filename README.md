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
