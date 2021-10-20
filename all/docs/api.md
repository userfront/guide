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

<response path="/v0/users" verb="post"/>

::::
:::::

---

### Read user

::::: row
:::: left

Reads a user record by its `userId`.

<parameters path="/v0/users/{userId}" verb="get" />

::::
:::: right

<code-samples path="/v0/users/{userId}" verb="get" />

<response path="/v0/users/{userId}" verb="get"/>

::::
:::::

---

### Update user

::::: row
:::: left

Updates the specified user by setting the values of the parameters passed. Any parameters not provided will be left unchanged. For example, if you pass the `name` parameter, that becomes the user's name to be used in the future.

This request accepts mostly the same arguments as the user creation call.

<parameters path="/v0/users/{userId}" verb="put" />

::::
:::: right

<code-samples path="/v0/users/{userId}" verb="put" />

<response path="/v0/users/{userId}" verb="put"/>

::::
:::::

---

### Delete user

::::: row
:::: left

Deletes a user record.

<parameters path="/v0/users/{userId}" verb="delete" />

::::
:::: right

<code-samples path="/v0/users/{userId}" verb="delete" />

<response path="/v0/users/{userId}" verb="delete"/>

::::
:::::

---

### Search users

::::: row
:::: left

Search user records.

<parameters path="/v0/users/find" verb="post" />

::::
:::: right

<code-samples path="/v0/users/find" verb="post" />

<response path="/v0/users/find" verb="post"/>

::::
:::::

---

### Invite user

::::: row
:::: left

Invite a user by email address.

<parameters path="/v0/users/invite" verb="post" />

::::
:::: right

<code-samples path="/v0/users/invite" verb="post" />

<response path="/v0/users/invite" verb="post"/>

::::
:::::

---

### Create or update user

::::: row
:::: left

Create a user or, if the user already exists, update it.

<parameters path="/v0/users/createOrUpdate" verb="post" />

::::
:::: right

<code-samples path="/v0/users/createOrUpdate" verb="post" />

<response path="/v0/users/createOrUpdate" verb="post"/>

::::
:::::

---

### Mark user active

::::: row
:::: left

Mark a user as active. This updates a user's `lastActiveAt` timestamp to the current time.

<parameters path="/v0/users/{userId}/active" verb="post" />

::::
:::: right

<code-samples path="/v0/users/{userId}/active" verb="post" />

<response path="/v0/users/{userId}/active" verb="post"/>

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

::::: row
:::: left

Creates a new tenant.

<parameters path="/v0/tenants" verb="post" :show-only="['name', 'image']"/>

::::
:::: right

<code-samples path="/v0/tenants" verb="post" />

<response path="/v0/tenants" verb="post"/>

::::
:::::

---

### Read tenant

::::: row
:::: left

Reads a tenant record by its `tenantId`.

<parameters path="/v0/tenants/{tenantId}" verb="get" />

::::
:::: right

<code-samples path="/v0/tenants/{tenantId}" verb="get" :tenant="store.state.activeTenant" />

<response path="/v0/tenants/{tenantId}" verb="get"/>

::::
:::::

---

### Update tenant

::::: row
:::: left

Updates an existing tenant.

<parameters path="/v0/tenants/{tenantId}" verb="put" :show-only="['name', 'image']"/>

::::
:::: right

<code-samples path="/v0/tenants/{tenantId}" verb="put" :tenant="store.state.activeTenant" />

<response path="/v0/tenants/{tenantId}" verb="put"/>

::::
:::::

---

### Delete tenant

::::: row
:::: left

Deletes an existing tenant.

<parameters path="/v0/tenants/{tenantId}" verb="delete"/>

::::
:::: right

<code-samples path="/v0/tenants/{tenantId}" verb="delete" />

<response path="/v0/tenants/{tenantId}" verb="delete"/>

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
  { verb: 'post', path: '/v0/tenants/:tenantId/users/:userId/roles', anchor: 'set-user-roles-tenant-level' },
  { verb: 'post', path: '/v0/tenants/:tenantId/roles/invite', anchor: 'invite-user-to-a-role-tenant-level' },
]"/>

::::
:::::

---

### List roles

::::: row
:::: left

Lists all the roles available in your account.

<parameters path="/v0/roles" verb="get" />

::::
:::: right

<code-samples path="/v0/roles" verb="get" />

<response path="/v0/roles" verb="get"/>

::::
:::::

---

### Set user roles

::::: row
:::: left

Sets the roles for a given user.

The role(s) set with this route will be at the application-wide level. To set a user's role(s) within a specific tenant, see [Set user roles (tenant level)](#set-user-roles-tenant-level).

To remove all roles for a user, pass an empty array for `roles`.

<parameters path="/v0/users/{userId}/roles" verb="put" />

::::
:::: right

<code-samples path="/v0/users/{userId}/roles" verb="put" />

<response path="/v0/users/{userId}/roles" verb="put"/>

::::
:::::

---

### Invite user to a role

::::: row
:::: left

Invite a user to join the application with the given role(s).

The role(s) that is created will be at the application-wide level. To invite a user to a role within a specific tenant, see [Invite user to a role (tenant level)](#invite-user-to-a-role-tenant-level).

<parameters path="/v0/roles/invite" verb="post" />

::::
:::: right

<code-samples path="/v0/roles/invite" verb="post" />

<response path="/v0/roles/invite" verb="post"/>

::::
:::::

---

### List roles (tenant level)

::::: row
:::: left

Lists all the roles available within the specified tenant.

<parameters path="/v0/tenants/{tenantId}/roles" verb="get" />

::::
:::: right

<code-samples path="/v0/tenants/{tenantId}/roles" verb="get" />

<response path="/v0/tenants/{tenantId}/roles" verb="get"/>

::::
:::::

---

### Set user roles (tenant level)

::::: row
:::: left

Sets the roles for a given user within the specified tenant.

To remove all roles for a user within the specified tenant, pass an empty array for `roles`.

<parameters path="/v0/tenants/{tenantId}/users/{userId}/roles" verb="put" />

::::
:::: right

<code-samples path="/v0/tenants/{tenantId}/users/{userId}/roles" verb="put" />

<response path="/v0/tenants/{tenantId}/users/{userId}/roles" verb="put"/>

::::
:::::

---

### Invite user to a role (tenant level)

::::: row
:::: left

Invite a user to join the application with the given role(s) in the specified tenant.

<parameters path="/v0/tenants/{tenantId}/roles/invite" verb="post" />

::::
:::: right

<code-samples path="/v0/tenants/{tenantId}/roles/invite" verb="post" />

<response path="/v0/tenants/{tenantId}/roles/invite" verb="post"/>

::::
:::::
