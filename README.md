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

```js
import type { AccountDataResponse, AccountTokenResponse } from "@rabbit-company/cloudky-api";
```

## Usage

### Creating an Instance

To use the CloudkyAPI, you first need to create an instance of the CloudkyAPI class with your server URL, username, password, and an optional OTP (One-Time Password).

```js
const cloudky = new CloudkyAPI("https://your-cloudky-server.com", "yourUsername", "yourPassword", "yourOTP");
```

### Validating Input

You can validate the input data using the built-in validate method. This method checks if the server URL, username, password, and OTP are formatted correctly.

```js
const validationResponse = cloudky.validate();

if (validationResponse.error) {
	console.error("Validation Error:", validationResponse.message);
} else {
	console.log("Validation Successful");
}
```

### Generating Authentication Hash

Before making authenticated requests, you need to generate an authentication hash from your username and password.

```js
const isInitialized = await cloudky.initialize();
if (isInitialized) {
	console.log("Authentication hash generated successfully.");
} else {
	console.error("Failed to generate authentication hash.");
}
```

### Getting an Account Token

To authenticate with the Cloudky server, you can retrieve an account token using the getToken method.

```js
const tokenResponse = await cloudky.getToken();

if (tokenResponse.token) {
	console.log("Token retrieved successfully:", tokenResponse.token);
} else {
	console.error("Failed to retrieve token:", tokenResponse.message);
}
```

### Retrieving Account Data

Once you have a valid token, you can retrieve account data using the getAccountData method.

```js
const accountData = await cloudky.getAccountData();

if (accountData.error) {
	console.error("Failed to retrieve account data: " + accountData.message);
} else {
	console.log("Account Data:", accountData.data);
}
```

### Deleting an Account

To delete an account from the Cloudky server, use the deleteAccount method.

```js
const deleteResponse = await cloudky.deleteAccount();

if (deleteResponse.error) {
	console.error("Failed to delete account:", deleteResponse.message);
} else {
	console.log("Account deleted successfully.");
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

const response = cloudky.validate();
if (response.error === Error.INVALID_USERNAME_FORMAT) {
	console.error("The username format is invalid.");
}
```

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/Rabbit-Company/CloudkyAPI-JS/blob/main/LICENSE) file for details.
