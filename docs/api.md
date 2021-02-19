# API reference

::::: row
:::: left

The Userfront API is organized around [REST](http://en.wikipedia.org/wiki/Representational_State_Transfer). Our API has predictable resource-oriented URLs, accepts [JSON-encoded](http://www.json.org/) request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.

You can use the Userfront API in test mode, which does not affect your live data. The API key you use to [authenticate](#authentication) the request determines whether the request is live mode or test mode.

<!-- Log in to see docs customized to your version of the API, with your test key and data. -->

::::
:::: right

#### Just getting started?

Check out our development [quickstart guide](https://userfront.com/guide/quickstart).

::: card

#### Base URL

<code style="background-color:inherit;font-size:14px;padding:0;">https://api.userfront.com</code>
:::

::::
:::::

## Authentication

::::: row
:::: left

The Userfront API uses API keys to authenticate requests. You can view and manage your API keys in the Userfront Dashboard.

Test mode secret keys have the prefix `uf_test_` and live mode secret keys have the prefix `uf_live_`.

Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.

Authentication to the API is performed via HTTP [Bearer Auth](https://tools.ietf.org/html/rfc6750). Provide your API key in the header of each request as:
`Authorization: Bearer your_api_key`.

All API requests must be made over HTTPS. Calls made over plain HTTP will fail. API requests without authentication will also fail.

::::
:::: right

::: card

#### Your API Key

A sample test API key is included in all the examples here, so you can test any example right away.

To test requests using your account, replace the sample API key with your actual API key or sign in.

:::

::::
:::::

## Errors

::::: row
:::: left

Userfront uses conventional HTTP response codes to indicate the success or failure of an API request. In general: Codes in the `2xx` range indicate success. Codes in the `4xx` range indicate an error that failed given the information provided (e.g., a required parameter was omitted, a charge failed, etc.). Codes in the `5xx` range indicate an error with Userfront's servers (these are rare).

Some `4xx` errors that could be handled programmatically (e.g. a token is expired) include an error code that briefly explains the error reported.

::::
:::: right

::: card

#### HTTP Status Code Summary

|                             |                                                                                                  |
| --------------------------: | ------------------------------------------------------------------------------------------------ |
|                **200 - OK** | Everything worked as expected.                                                                   |
|       **400 - Bad Request** | The request was unacceptable, often due to missing a required parameter.                         |
|      **401 - Unauthorized** | No valid API key provided.                                                                       |
|    **402 - Request Failed** | The parameters were valid but the request failed.                                                |
|         **403 - Forbidden** | The API key doesn't have permissions to perform the request.                                     |
|         **404 - Not Found** | The requested resource doesn't exist.                                                            |
| **429 - Too Many Requests** | Too many requests hit the API too quickly. We recommend an exponential backoff of your requests. |
|      **500 - Server Error** | Something went wrong on Userfront's end. (These are rare.)                                       |

:::
::::
:::::

## Users

::::: row
:::: left

Users are the user records within your project or within your project's tenants.

You can create, read, update, and delete a user with standard REST operations.

Additionally, there are POST operations for inviting a user to a tenant, creating or updating a user (if you don't know whether they already exist), and marking a user as "active" for data purposes.

There are also 2 endpoints for searching all users in a tenant: one via GET and one via POST.

::::
:::: right

::: card endpoints

#### Endpoints

```endpoints
  POST  /v0/tenants/:tenantId/users
   GET  /v0/tenants/:tenantId/users/:userId
   PUT  /v0/tenants/:tenantId/users/:userId
DELETE  /v0/tenants/:tenantId/users/:userId

  POST  /v0/tenants/:tenantId/users/invite
  POST  /v0/tenants/:tenantId/users/createOrUpdate
  POST  /v0/tenants/:tenantId/users/:userId/active
```

:::

::: card

#### Search endpoints

```endpoints
   GET /v0/tenants/:tenantId/users
  POST /v0/tenants/:tenantId/users/find
```

:::

::::
:::::

### Create a user

::::: row
:::: left

Creates a new user in an existing tenant.

<parameters path="/v0/tenants/{tenantId}/users" verb="post" />

::::
:::: right

`POST /v0/tenants/:tenantId/users`

<code-samples path="/v0/tenants/{tenantId}/users" verb="post" />

<response path="/v0/tenants/{tenantId}/users" verb="post"/>

::: card

#### Response

```json
{
  "mode": "test"
  "userId": 0
  "tenantId": "string"
  "uuid": "string"
  "username": "string"
  "email": "string"
  "name": "string"
  "image": "string"
  "locked": true
  "data": {}
  "isConfirmed": true
  "lastActiveAt": "2021-02-16"
  "lastMessagedAt": "2021-02-16"
  "confirmedAt": "2021-02-16"
  "updatedAt": "2021-02-16"
  "createdAt": "2021-02-16"
  "tenant": {
    "tenantId": "string"
    "name": "string"
    "image": "string"
    "loginRedirectPath": "string"
    "logoutRedirectPath": "string"
  }
  "authorization": {}
}
```

:::

::::
:::::
