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
