---
sidebarDepth: 2
title: Passthrough migration
---

# Passthrough migration

::::: row
:::: left

This guide describes the **passthrough** strategy for migrating password-based login from your existing system to Userfront.

Using this approach, you get a standard set of client-side interactions for all new and existing users while you migrate your login to a new system.

::::
:::: right

::: tip
Userfront does not store user passwords in a recoverable format (it stores a [hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function)), and this guide assumes that your system also does not store passwords in a recoverable format.
:::

::::
:::::

## How the passthrough works

::::: row
:::: left

The first time an existing user attempts to log into your application with Userfront, we forward their request to your old login system using whatever format your old system uses.

Based on the response from your old system, Userfront either logs the user in and stores their password hash for future use, or rejects the login along with a message based on your old system's response.

::::
:::: right

<br/>

<img src="https://res.cloudinary.com/component/image/upload/v1650036211/guide/passthrough-diagram.png" alt="Passthrough diagram" style="width: 500px;max-width:100%;">

:::::

## Passthrough steps

::::: row
:::: left

To perform a successful password migration:

1. <u>**Import your existing user data into Userfront**</u>, excluding passwords. You can use [CSV upload](/guide/import-export.html) for smaller data sets, or [contact us](mailto:team@userfront.com) for larger data sets.

2. <u>**Set up a passthrough route**</u>. Userfront passes user login requests through to your old system and observes the responses in order to automatically generate a database of password hashes.

3. <u>**Choose your password transfer window**</u>. Run the passthrough for as long as desired: typically 1-6 months, or until 90-100% of active users have transferred. As each user's password is verified, Userfront stores their password hash and can handle their subsequent logins directly. Userfront also gives you regular statistics about the transfer process.

4. <u>**Once you are finished transferring, disconnect the passthrough**</u>. Users who did not log in during the password transfer window are prompted to reset their password upon their next login.

::::
:::::

## Example of a successful login

::::: row
:::: left

In this example, we show an existing user's login request during the password transfer window.

::::
:::::

::::: row
:::: left
First, the user submits their information to Userfront based on the standard [Log in with password](/docs/api-client.html#log-in-with-password) endpoint.

This can be done with the toolkit [login form](/guide/toolkit/automatic-login-form-html.html), the Core JS [login()](/docs/js.html#login-via-password-method) method, or by sending to the [API endpoint](/docs/api-client.html#log-in-with-password) directly.

::::
:::: right

```json
// POST /v0/auth/basic
{
  "emailOrUsername": "jane@example.com",
  "password": "janes-password",
  "tenantId": "demo1234"
}
```

::::
:::::

::::: row
:::: left

Userfront forwards this information to your old login system based on your desired format, and optionally adds a `passthroughCode`.
::::
:::: right

```json
// NOTE: this can be any format to match your existing system
{
  "email": "jane@example.com",
  "password": "janes-password",
  "passthroughCode": "5bcf2d6c-abeb-4204-8aa8-01167297aa1c"
}
```

::::
:::::

::::: row
:::: left

Your old login system responds as it normally would, with an optional `passbackCode`.

Typically, your old system would respond with either a `200` response for success or a `4XX` response for failure.

In this example, your old system responds with `200` for success.

From this point forward, Userfront stores a hash of the user's password and can handle future login requests without the passthrough.

::::
:::: right

```json
// Status: 200
{
  "passbackCode": "3dcee2c5-8e7a-46b7-91f0-c9bc38b6444f",
  ... // Other response attributes are ignored
}
```

::::
:::::

#### Response to the client

::::: row
:::: left

For all successful login requests (passthrough or not), Userfront generates a standard response based on the [Log in with password](https://userfront.com/docs/api-client.html#log-in-with-password) endpoint and sends this response to the client.

If you are using the toolkit [login form](/guide/toolkit/automatic-login-form-html.html) or Core JS [login()](/docs/js.html#login-via-password-method) method on the client, this response is handled automatically and the user is logged in.

Using this approach, you get a standard set of client-side interactions for all new and existing users while you migrate your login to a new system.

::::
:::: right

```json
// Status: 200
{
  "mode": "live",
  "redirectTo": "https://example.com/path",
  "sessionId": "8976836f-f43d-425d-ab93-86e620c51e5c",
  "tokens": {
    "access": {
      "value": "e2y...",
      "cookieOptions": {
        "secure": true,
        "sameSite": "Strict",
        "expires": 7
      }
    },
    "id": {
      "value": "e2y...",
      "cookieOptions": {
        "secure": true,
        "sameSite": "Strict",
        "expires": 7
      }
    },
    "refresh": {
      "value": "e2y...",
      "cookieOptions": {
        "secure": true,
        "sameSite": "Strict",
        "expires": 1
      }
    }
  }
}
```

::::
:::::

## Set up a passthrough

::::: row
:::: left

Please [contact us](mailto:team@userfront.com) if you are interested in setting up a passthrough route.

We can work with you to map the passthrough requests and responses to your existing system, as well as assist with any other transition topics or questions you may have.

::::
:::::
