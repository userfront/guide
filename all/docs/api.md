---
sidebarDepth: 2
title: Server-to-server API reference
---

# API reference

::::: row
:::: left

<div>
  <h3 style="margin:0 0 8px">Server-to-server</h3>
  <div style="display:flex;align-items:center;height:36px;">
    <img src="https://res.cloudinary.com/component/image/upload/w_32,o_80/v1634764502/permanent/server-solid.png" style="height:32px;margin-top:2px;">
    <span style="font-size:36px;padding:0 12px;">→</span>
    <img src="https://res.cloudinary.com/component/image/upload/w_32,o_80/v1634764502/permanent/server-solid.png" style="height:32px;margin-top:2px;">
  </div>
</div>

This documentation covers requests made by your server to Userfront's server using an API key.

For requests that end users can make directly, such as signup, login, password reset, and more, see the API refernce for [client-to-server](/docs/api-client.html) actions.

::::
:::: right

#### Just getting started?

Check out our development [quickstart guide](/guide/quickstart/).

::::
:::::

#### REST endpoints

::::: row
:::: left

The Userfront API is organized around [REST](http://en.wikipedia.org/wiki/Representational_State_Transfer). Our API has predictable resource-oriented URLs, accepts [JSON-encoded](http://www.json.org/) request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.

You can use the Userfront API in test mode, which does not affect your live data. The API key you use to authenticate the request determines whether the request is live mode or test mode.

<!-- Log in to see docs customized to your version of the API, with your test key and data. -->

::::
:::: right

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

Test mode keys have the prefix `uf_test_` and live mode keys have the prefix `uf_live_`.

Your API keys carry many privileges, so be sure to keep them secure! Do not share your API keys in publicly accessible areas such as GitHub, client-side code, and so forth.

Authentication to the API is performed via HTTP [Bearer Auth](https://tools.ietf.org/html/rfc6750). Provide your API key in the header of each request as:
`Authorization: Bearer your_api_key`.

All API requests must be made over HTTPS. Calls made over plain HTTP will fail. API requests without authentication will also fail.

::::
:::: right

::: card

#### Your API Key

<api-key/>

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

Users are the user records within your account or within your account's tenants.

You can create, read, update, and delete a user with standard REST operations.

Additionally, there are POST operations for inviting a user to a tenant, creating or updating a user (if you don't know whether they already exist), and marking a user as "active" for data purposes.

There are also 2 endpoints for searching all users in a tenant: one via GET and one via POST.

::::
:::: right

<endpoints :endpoints="[
  { verb: 'post', path: '/v0/users', anchor: 'create-user' },
  { verb: 'get', path: '/v0/users/:userId', anchor: 'read-user' },
  { verb: 'put', path: '/v0/users/:userId', anchor: 'update-user' },
  { verb: 'delete', path: '/v0/users/:userId', anchor: 'delete-user' },
  {},
  { verb: 'post', path: '/v0/users/find', anchor: 'search-users' },
  { verb: 'post', path: '/v0/users/invite', anchor: 'invite-user' },
  { verb: 'post', path: '/v0/users/createOrUpdate', anchor: 'create-or-update-user' },
  { verb: 'post', path: '/v0/users/:userId/active', anchor: 'mark-user-active' },
]"/>

::::
:::::

---

### Create user

<access-level type="admin-only"/>

::::: row
:::: left

Creates a new user.

::: tip
If you want to import or create many users, see [user import & export](/guide/import-export.html).
:::

<parameters path="/v0/users" verb="post" :show-only="['email', 'username', 'name', 'image', 'data']"/>

::::
:::: right

<code-samples path="/v0/users" verb="post" :show-only="['email', 'username', 'name', 'image', 'data']"/>

<response-json path="/v0/users" verb="post"/>

::::
:::::

---

### Read user

<access-level type="admin-or-readonly"/>

::::: row
:::: left

Reads a user record by its `userId`.

<parameters path="/v0/users/{userId}" verb="get" />

::::
:::: right

<code-samples path="/v0/users/{userId}" verb="get" />

<response-json path="/v0/users/{userId}" verb="get"/>

::::
:::::

---

### Update user

<access-level type="admin-only"/>

::::: row
:::: left

Updates the specified user by setting the values of the parameters passed. Any parameters not provided will be left unchanged. For example, if you pass the `name` parameter, that becomes the user's name to be used in the future.

This request accepts mostly the same arguments as the user creation call.

<parameters path="/v0/users/{userId}" verb="put" />

::::
:::: right

<code-samples path="/v0/users/{userId}" verb="put" />

<response-json path="/v0/users/{userId}" verb="put"/>

::::
:::::

---

### Delete user

<access-level type="admin-only"/>

::::: row
:::: left

Deletes a user record.

<parameters path="/v0/users/{userId}" verb="delete" />

::::
:::: right

<code-samples path="/v0/users/{userId}" verb="delete" />

<response-json path="/v0/users/{userId}" verb="delete"/>

::::
:::::

---

### Search users

<access-level type="admin-or-readonly"/>

::::: row
:::: left

Search user records.

<parameters path="/v0/users/find" verb="post" />

<br>

#### Filter options

<hr>

The `filters` object has a top-level `conjunction` that applies to one or more `filterGroups`.

```json
{
  "filters": {
    "conjunction": "and",
    "filterGroups": [
      {
        "conjunction": "and",
        "filters": [
          {
            "attr": "username",
            "type": "string",
            "comparison": "is",
            "value": "janedoe"
          }
        ]
      }
    ]
  }
}
```

The `"and"` conjunction returns users who meet all of the criteria, while the `"or"` conjunction returns users who meet any one of the criteria.

Each `filter` has the following options:

#### attr

The attribute to search, such as `email` or `createdAt`. For attributes in the `data` object, use `data.myAttr`.

#### type

The data type of the attribute. Can be `string`, `boolean`, `number`, `date`, or `array`.

#### comparison

The desired criteria for returned users.

::: details Comparison options

<style>
  #comparison-table {
    background:white;
  }
  #comparison-table tbody {
    display:table;
    width:100%;
  }
  #comparison-table code {
    line-height: 2em;
  }
</style>

<table id="comparison-table">
<tbody>
<tr>
<td><code>string</code></td>
<td>
<code>is</code><br>
<code>contains</code><br>
<code>does not contain</code><br>
<code>starts with</code><br>
<code>ends with</code><br>
<code>is unknown</code><br>
<code>has any value</code>
</td>
</tr>
<tr>
<td>
<code>boolean</code>
</td>
<td>
<code>is</code><br>
<code>is not</code><br>
</td>
</tr>
<tr>
<td>
<code>date</code>
</td>
<td>
<code>before</code><br>
<code>after</code><br>
<code>between</code><br>
<code>less than</code> (days ago)<br>
<code>more than</code> (days ago)
</td>
</tr>
<tr>
<td>
<code>number</code>
</td>
<td>
<code>is</code><br>
<code>more than</code><br>
<code>less than</code>
</td>
</tr>
<tr>
<td>
<code>array</code>
</td>
<td>
<code>contains</code><br>
<code>does not contain</code><br>
<code>any</code>
</td>
</tr>
</tbody>
</table>

:::

#### value

The value to be compared. Should make sense in the context of the `type` and `comparison`.

#### Example searches

::: details Users created in the last week

```json
{
  "order": "createdAt_DESC",
  "filters": {
    "conjunction": "and",
    "filterGroups": [
      {
        "conjunction": "and",
        "filters": [
          {
            "attr": "createdAt",
            "type": "date",
            "comparison": "less than",
            "value": 7
          }
        ]
      }
    ]
  }
}
```

:::

::: details Users named John who were last active less than 30 days ago

```json
{
  "filters": {
    "conjunction": "and",
    "filterGroups": [
      {
        "conjunction": "and",
        "filters": [
          {
            "attr": "name",
            "type": "string",
            "comparison": "contains",
            "value": "John"
          },
          {
            "attr": "lastActiveAt",
            "type": "date",
            "comparison": "less than",
            "value": 30
          }
        ]
      }
    ]
  }
}
```

:::

::: details Users with example.com in their email, or who have "Example" as a custom data attribute, sorted by username

```json
{
  "order": "username_ASC",
  "filters": {
    "conjunction": "and",
    "filterGroups": [
      {
        "conjunction": "or",
        "filters": [
          {
            "attr": "email",
            "type": "string",
            "comparison": "ends with",
            "value": "@example.com"
          }
          {
            "attr": "data.projectName",
            "type": "string",
            "comparison": "is",
            "value": "Example"
          }
        ]
      }
    ]
  }
}
```

:::

#### Searching roles

To search for users with a specific role use `"tenantId: role name"`, or to search for users with any role in the tenant, use `"tenantId"`.

::: details Users with an admin role in the demo tenant (tenantId = "demo1234")

```json
{
  "filters": {
    "conjunction": "and",
    "filterGroups": [
      {
        "conjunction": "and",
        "filters": [
          {
            "attr": "role",
            "type": "string",
            "comparison": "is",
            "value": "demo1234:admin"
          }
        ]
      }
    ]
  }
}
```

:::

::: details Users with any role in the demo tenant (tenantId = "demo1234")

```json
{
  "filters": {
    "conjunction": "and",
    "filterGroups": [
      {
        "conjunction": "and",
        "filters": [
          {
            "attr": "role",
            "type": "string",
            "comparison": "is",
            "value": "demo1234"
          }
        ]
      }
    ]
  }
}
```

:::

::::
:::: right

<code-samples path="/v0/users/find" verb="post" />

<response-json path="/v0/users/find" verb="post"/>

::::
:::::

---

### Invite user

<access-level type="admin-only"/>

::::: row
:::: left

Invite a user by email address.

This endpoint creates a user, then sends them an email with a link to log in (default) or set their password (see [options.type](#post-v0usersinvite-options)).

<parameters path="/v0/users/invite" verb="post" />

#### Invite link duration

Use `options.duration` to set the amount of time until a link expires.

You can use `seconds`, `minutes`, `hours`, `days`, and `weeks`.

The duration must be between `10 seconds` and `1 week`.

| Examples                                     |
| :------------------------------------------- |
| `10 minutes`, `6 hours` , `1 day` , `1 week` |

::::
:::: right

<code-samples path="/v0/users/invite" verb="post" />

<response-json path="/v0/users/invite" verb="post"/>

::::
:::::

#### Set password upon login

::::: row
:::: left

| options.type | Purpose                                                  |
| :----------- | :------------------------------------------------------- |
| `reset`      | Use the Password Reset Path in the invitation email link |

When you use `options.type = "reset"`, Userfront sends the invitation email with a link to your Password Reset Path.

On your password reset page, your application can send the `token` and `uuid` to the [Reset password with link credentials](/docs/api-client.html#reset-password-with-link-credentials) endpoint or use them with the [Userfront.resetPassword()](/docs/js.html#resetpassword-options) method.

::::
:::: right

::: card
With `options.type = reset`, the invitation link will still contain `token`, `uuid`, and `type=invite`, but will direct to the Password Reset Path.

`/reset?token=...&uuid=...&type=invite`
:::

::::
:::::

---

### Create or update user

<access-level type="admin-only"/>

::::: row
:::: left

Create a user or, if the user already exists, update it.

Must include an email address if creating a user.

Must include a `userId` or `userUuid` if updating a user.

<parameters path="/v0/users/createOrUpdate" verb="post" />

::::
:::: right

<code-samples path="/v0/users/createOrUpdate" verb="post" />

<response-json path="/v0/users/createOrUpdate" verb="post"/>

::::
:::::

---

### Mark user active

<access-level type="admin-only"/>

::::: row
:::: left

Mark a user as active. This updates a user's `lastActiveAt` timestamp to the current time.

<parameters path="/v0/users/{userId}/active" verb="post" />

::::
:::: right

<code-samples path="/v0/users/{userId}/active" verb="post" />

<response-json path="/v0/users/{userId}/active" verb="post"/>

::::
:::::

---

## Tenants

::::: row
:::: left

Tenants allow you to sub-divide your application so that certain users only have access to certain parts.

For example, your account could have Tenant A and Tenant B. You could give some users access to Tenant A, some users access to Tenant B, some users access to both Tenants, and some users access to neither Tenant.

You can create and read tenants with standard REST operations.

::::
:::: right

<endpoints :endpoints="[
  { verb: 'post', path: '/v0/tenants', anchor: 'create-tenant' },
  { verb: 'get', path: '/v0/tenants/:tenantId', anchor: 'read-tenant' },
  { verb: 'put', path: '/v0/tenants/:tenantId', anchor: 'update-tenant' },
  { verb: 'delete', path: '/v0/tenants/:tenantId', anchor: 'delete-tenant' },
]"/>

::::
:::::

---

### Create tenant

<access-level type="admin-only"/>

::::: row
:::: left

Creates a new tenant.

<parameters path="/v0/tenants" verb="post" :show-only="['name', 'image']"/>

::::
:::: right

<code-samples path="/v0/tenants" verb="post" />

<response-json path="/v0/tenants" verb="post"/>

::::
:::::

---

### Read tenant

<access-level type="admin-or-readonly"/>

::::: row
:::: left

Reads a tenant record by its `tenantId`.

<parameters path="/v0/tenants/{tenantId}" verb="get" />

::::
:::: right

<code-samples path="/v0/tenants/{tenantId}" verb="get" :tenant="store.state.activeTenant" />

<response-json path="/v0/tenants/{tenantId}" verb="get"/>

::::
:::::

---

### Update tenant

<access-level type="admin-only"/>

::::: row
:::: left

Updates an existing tenant.

<parameters path="/v0/tenants/{tenantId}" verb="put" :show-only="['name', 'image']"/>

::::
:::: right

<code-samples path="/v0/tenants/{tenantId}" verb="put" :tenant="store.state.activeTenant" />

<response-json path="/v0/tenants/{tenantId}" verb="put"/>

::::
:::::

---

### Delete tenant

<access-level type="admin-only"/>

::::: row
:::: left

Deletes an existing tenant.

<parameters path="/v0/tenants/{tenantId}" verb="delete"/>

::::
:::: right

<code-samples path="/v0/tenants/{tenantId}" verb="delete" />

<response-json path="/v0/tenants/{tenantId}" verb="delete"/>

::::
:::::

---

## Roles

::::: row
:::: left

Roles are labels you can use to determine each user's access control within your application.

You can assign one or more roles to each user, and roles can apply to your entire application or to [tenants](#tenants) within your application.

You can create, read, update, and delete roles with standard REST operations.

::::
:::: right

<endpoints :endpoints="[
  { verb: 'get', path: '/v0/roles', anchor: 'list-roles' },
  { verb: 'post', path: '/v0/users/:userId/roles', anchor: 'set-user-roles' },
  { verb: 'post', path: '/v0/roles/invite', anchor: 'invite-user-to-a-role' },
  {},
  { verb: 'get', path: '/v0/tenants/:tenantId/roles', anchor: 'list-roles-tenant-level' },
  { verb: 'post', path: '/v0/tenants/:tenantId/users/:userId/roles', anchor: 'set-user-roles-tenant-level' },
  { verb: 'post', path: '/v0/tenants/:tenantId/roles/invite', anchor: 'invite-user-to-a-role-tenant-level' },
]"/>

::::
:::::

---

### List roles

<access-level type="admin-or-readonly"/>

::::: row
:::: left

Lists all the roles available in your account.

<parameters path="/v0/roles" verb="get" />

::::
:::: right

<code-samples path="/v0/roles" verb="get" />

<response-json path="/v0/roles" verb="get"/>

::::
:::::

---

### Set user roles

<access-level type="admin-only"/>

::::: row
:::: left

Sets the roles for a given user.

The role(s) set with this route will be at the application-wide level. To set a user's role(s) within a specific tenant, see [Set user roles (tenant level)](#set-user-roles-tenant-level).

To remove all roles for a user, pass an empty array for `roles`.

<parameters path="/v0/users/{userId}/roles" verb="put" />

::::
:::: right

<code-samples path="/v0/users/{userId}/roles" verb="put" />

<response-json path="/v0/users/{userId}/roles" verb="put"/>

::::
:::::

---

### Invite user to a role

<access-level type="admin-only"/>

::::: row
:::: left

Invite a user to join the application with the given role(s).

This endpoint creates a user, then sends them an email with a link to log in (default) or set their password (see [options.type](#post-v0rolesinvite-options)).

The role(s) that is created will be at the application-wide level. To invite a user to a role within a specific tenant, see [Invite user to a role (tenant level)](#invite-user-to-a-role-tenant-level).

<parameters path="/v0/roles/invite" verb="post" />

#### Invite link duration

Use `options.duration` to set the amount of time until a link expires.

You can use `seconds`, `minutes`, `hours`, `days`, and `weeks`.

The duration must be between `10 seconds` and `1 week`.

| Examples                                     |
| :------------------------------------------- |
| `10 minutes`, `6 hours` , `1 day` , `1 week` |

::::
:::: right

<code-samples path="/v0/roles/invite" verb="post" />

<response-json path="/v0/roles/invite" verb="post"/>

::::
:::::

#### Set password upon login

::::: row
:::: left

| options.type | Purpose                                                      |
| :----------- | :----------------------------------------------------------- |
| `reset`      | Include the Password Reset Path in the invitation email link |

When you use `options.type = "reset"`, Userfront sends the invitation email with a link to your Password Reset Path.

On your password reset page, your application can send the `token` and `uuid` to the [Reset password with link credentials](/docs/api-client.html#reset-password-with-link-credentials) endpoint or use them with the [Userfront.resetPassword()](/docs/js.html#resetpassword-options) method.

::::
:::: right

::: card
With `options.type = reset`, the invitation link will still contain `token`, `uuid`, and `type=invite`, but will direct to the Password Reset Path.

`/reset?token=...&uuid=...&type=invite`
:::

::::
:::::

---

### List roles (tenant level)

<access-level type="admin-or-readonly"/>

::::: row
:::: left

Lists all the roles available within the specified tenant.

<parameters path="/v0/tenants/{tenantId}/roles" verb="get" />

::::
:::: right

<code-samples path="/v0/tenants/{tenantId}/roles" verb="get" />

<response-json path="/v0/tenants/{tenantId}/roles" verb="get"/>

::::
:::::

---

### Set user roles (tenant level)

<access-level type="admin-only"/>

::::: row
:::: left

Sets the roles for a given user within the specified tenant.

To remove all roles for a user within the specified tenant, pass an empty array for `roles`.

<parameters path="/v0/tenants/{tenantId}/users/{userId}/roles" verb="put" />

::::
:::: right

<code-samples path="/v0/tenants/{tenantId}/users/{userId}/roles" verb="put" />

<response-json path="/v0/tenants/{tenantId}/users/{userId}/roles" verb="put"/>

::::
:::::

---

### Invite user to a role (tenant level)

<access-level type="admin-only"/>

::::: row
:::: left

Invite a user to join the application with the given role(s) in the specified tenant.

<parameters path="/v0/tenants/{tenantId}/roles/invite" verb="post" />

#### Invite link duration

Use `options.duration` to set the amount of time until a link expires.

You can use `seconds`, `minutes`, `hours`, `days`, and `weeks`.

The duration must be between `10 seconds` and `1 week`.

| Examples                                     |
| :------------------------------------------- |
| `10 minutes`, `6 hours` , `1 day` , `1 week` |

::::
:::: right

<code-samples path="/v0/roles/invite" verb="post" />

<response-json path="/v0/roles/invite" verb="post"/>

::::
:::::

#### Set password upon login

::::: row
:::: left

| options.type | Purpose                                                      |
| :----------- | :----------------------------------------------------------- |
| `reset`      | Include the Password Reset Path in the invitation email link |

When you use `options.type = "reset"`, Userfront sends the invitation email with a link to your Password Reset Path.

On your password reset page, your application can send the `token` and `uuid` to the [Reset password with link credentials](/docs/api-client.html#reset-password-with-link-credentials) endpoint or use them with the [Userfront.resetPassword()](/docs/js.html#resetpassword-options) method.

::::
:::::

---

## API keys

::::: row
:::: left

API keys are a way to authenticate machine-to-machine requests, either from your server to Userfront, or from your users' servers to your server.

You can create, read, invalidate, delete, and verify API keys with standard REST operations.

::::
:::: right

<endpoints :endpoints="[
  { verb: 'post', path: '/v0/keys', anchor: 'create-api-key' },
  { verb: 'get', path: '/v0/keys/:type', anchor: 'list-api-keys' },
  { verb: 'post', path: '/v0/keys/verify', anchor: 'verify-api-key' },
  { verb: 'put', path: '/v0/keys/invalidate', anchor: 'invalidate-api-key' },
  { verb: 'delete', path: '/v0/keys', anchor: 'delete-api-key' },
  { verb: 'get', path: '/v0/tenants/:tenantId/keys/:type', anchor: 'list-api-keys-tenant-level' }
]"/>

::::
:::::

---

### Create API key

<access-level type="admin-only"/>

::::: row
:::: left

Create a new API key with a given type.

<parameters path="/v0/keys" verb="post"/>

| type       | description                                   |
| :--------- | :-------------------------------------------- |
| `admin`    | Allows all Userfront actions for a tenant     |
| `readonly` | Allows readonly actions for a tenant          |
| `webhook`  | Included in webhook headers sent by Userfront |

::::
:::: right

<code-samples path="/v0/keys" verb="post" />

<response-json path="/v0/keys" verb="post"/>

::::
:::::

---

### List API keys

<access-level type="admin-only"/>

::::: row
:::: left

Lists all of a tenant's API keys for a given type.

| type       | description                                   |
| :--------- | :-------------------------------------------- |
| `admin`    | Allows all Userfront actions for a tenant     |
| `readonly` | Allows readonly actions for a tenant          |
| `webhook`  | Included in webhook headers sent by Userfront |

::::
:::: right

<code-samples path="/v0/keys/{type}" verb="get" />

<response-json path="/v0/keys/{type}" verb="get"/>

::::
:::::

---

### Verify API key

<access-level type="admin-only"/>

::::: row
:::: left

Verify that an API key is valid.

Include your admin API key in the `authorization` header, and include the key that you want to verify as `key` in the request body.

::: warning Note
An API key cannot be used to verify itself.
:::

<parameters path="/v0/keys/verify" verb="post"/>

::::
:::: right

<code-samples path="/v0/keys/verify" verb="post" />

<response-json path="/v0/keys/verify" verb="post"/>

::::
:::::

::::: row
:::: left

#### Invalid API key

When an API key is invalid, Userfront returns a 400 status code response with the message "Invalid API key".

::::
:::: right

<response-json-custom title="Response (400)" :response="{ message: 'Invalid API key', result: { mode: 'test', type: 'readonly', tenantId: 'demo1234', isActive: false }}"/>

::::
:::::

---

### Invalidate API key

<access-level type="admin-only"/>

::::: row
:::: left

Invalidate an API key.

API keys that have been invalidated are still returned in the [list API keys](#list-api-keys) response, but have the `isActive` value set to `false`.

API keys that have been invalidated will return 400 "Invalid" for [verify API key](#verify-api-key).

<parameters path="/v0/keys/invalidate" verb="put" />

::::
:::: right

<code-samples path="/v0/keys/invalidate" verb="put" />

<response-json path="/v0/keys/invalidate" verb="put"/>

::::
:::::

::::: row
:::: left

::: warning Note
You cannot invalidate the final API key of a given type. You must create another key to take its place before invalidating.
:::

::::
:::: right

<response-json-custom title="Response (400)" :response="{ message: 'Cannot invalidate the only active admin API key. Please create another admin API key, then try again.'}"/>

:::::

---

### Delete API key

<access-level type="admin-only"/>

::::: row
:::: left

Delete an API key.

API keys that have been deleted will return 400 "Invalid" for [verify API key](#verify-api-key).

<parameters path="/v0/keys" verb="delete" />

::::
:::: right

<code-samples path="/v0/keys" verb="delete" />

<response-json path="/v0/keys" verb="delete"/>

::::
:::::

::::: row
:::: left

::: warning Note
You cannot delete the final API key of a given type. You must create another key to take its place before deleting.
:::

::::
:::: right

<response-json-custom title="Response (400)" :response="{ message: 'Cannot delete the only active admin API key. Please create another admin API key, then try again.'}"/>

:::::

---

### List API keys (tenant level)

<access-level type="admin-only"/>

::::: row
:::: left

Lists all of a tenant's API keys for a given type.

| type       | description                                   |
| :--------- | :-------------------------------------------- |
| `admin`    | Allows all Userfront actions for a tenant     |
| `readonly` | Allows readonly actions for a tenant          |
| `webhook`  | Included in webhook headers sent by Userfront |

::::
:::: right

<code-samples path="/v0/tenants/{tenantId}/keys/{type}" verb="get" />

<response-json path="/v0/tenants/{tenantId}/keys/{type}" verb="get"/>

::::
:::::

---

## JWTs

::::: row
:::: left

Userfront issues a JWT access token to each user when they log into your application.

Your client (frontend) application should send the JWT access token to your server with each request, where you can verify it using your JWT public key.

Your JWT public key(s) can be viewed directly with the `/v0/tenants/:tenantId/keys/jwt` endpoint, or as a JSON Web Key Set (JWKS) with the `/v0/tenants/:tenantId/jwks` endpoint.

For more information about JWT access tokens, see [Tokens and access control](/guide/auth).

::::
:::: right

<endpoints :endpoints="[
  { verb: 'get', path: '/v0/tenants/:tenantId/keys/jwt', anchor: 'list-jwt-public-keys' },
  { verb: 'get', path: '/v0/tenants/:tenantId/jwks', anchor: 'json-web-key-set-jwks' }
]"/>

::::
:::::

### List JWT public keys

<access-level type="public"/>

::::: row
:::: left

Lists all of a tenant's JWT public keys in both plaintext (`publicKey`) and Base64 (`publicKeyBase64`) format.

#### Query strings

---

<parameter name="test" description="Optional query string for test mode (?test=true)" :required="false"/>

::::
:::: right

<code-samples path="/v0/tenants/{tenantId}/keys/jwt" verb="get" no-authorization="true"/>

<response-json path="/v0/tenants/{tenantId}/keys/jwt" verb="get"/>

::::
:::::

---

### JSON Web Key Set (JWKS)

<access-level type="public"/>

::::: row
:::: left

The public JWKS url for a tenant.

A [JSON Web Key Set](https://datatracker.ietf.org/doc/html/rfc7517) allows your application to build your JWT public key(s) from a URL instead of hard-coding the latest JWT public key into your code.

The JWKS representation requires fewer bytes than a full JWT public key, which is preferrable if you want your application to look up public key information in realtime instead of hard-coding a JWT public key.

When you set up your application to use JWKS instead of a hard-coded JWT public key, you can rotate your JWT signing key without having to update your application code.

#### Query strings

---

<parameter name="test" description="Optional query string for test mode (?test=true)" :required="false"/>

::::
:::: right

<code-samples path="/v0/tenants/{tenantId}/jwks" verb="get" no-authorization="true"/>

<response-json path="/v0/tenants/{tenantId}/jwks" verb="get"/>

::::
:::::

---

## Authentication actions

::::: row
:::: left

Server-to-server authentication actions allow your backend to perform actions that an end user cannot perform on their own, such as directly generating login link credentials.

::::
:::: right

<endpoints :endpoints="[
  { verb: 'post', path: '/v0/auth/link/generate', anchor: 'generate-link-credentials' },
]"/>

::::
:::::

---

### Generate link credentials

<access-level type="admin-only"/>

::::: row
:::: left

Generate link credentials for use in custom login, welcome, verification, or password reset flows.

This endpoint returns the `uuid` and `token` credentials but does not send an email.

If you want Userfront to send an email on your behalf, you can use endpoints like [generate login link](/docs/api-client.html#generate-login-link) or [generate password reset link](/docs/api-client.html#generate-password-reset-link).

<parameters path="/v0/auth/link/generate" verb="post" />

#### Login, welcome, and verification

Your application can send the `token` and `uuid` to the [Log in with login link](/docs/api-client.html#log-in-with-login-link) endpoint or use them with the [Userfront.login()](/docs/js.html#login-options) method.

The `token` and `uuid` can only be used once and will automatically expire according to the type of link:

| options.type      | Expiration |
| :---------------- | :--------- |
| `login` (default) | 1 hour     |
| `welcome`         | 3 days     |
| `verify`          | 3 days     |

#### Password reset

Your application can send the `token` and `uuid` to the [Reset password with link credentials](/docs/api-client.html#reset-password-with-link-credentials) endpoint or use them with the [Userfront.resetPassword()](/docs/js.html#resetpassword-options) method.

The `token` and `uuid` can only be used once and will automatically expire according to the type of link:

| options.type | Expiration |
| :----------- | :--------- |
| `reset`      | 1 hour     |

::::
:::: right

<code-samples path="/v0/auth/link/generate" verb="post" :show-only="['email','options']" />

<response-json path="/v0/auth/link/generate" verb="post"/>

::::
:::::
