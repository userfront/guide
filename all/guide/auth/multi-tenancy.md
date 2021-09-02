# Multi-tenancy

::::: row
:::: left

Multi-tenancy allows you to sub-divide your application so that your users can have their own accounts, teams, and organizations.

The term "tenant" refers to one of these accounts, teams, or organizations.

Within a tenant, you can assign roles to your users.

Users can have multiple roles within a tenant, and users can also have roles in more than one tenant.

::::
:::: right
::: tip
You can assign application-wide roles **and** tenant-specific roles.
:::
::::
:::::

![Multi tenancy](https://res.cloudinary.com/component/image/upload/v1630597463/guide/multi-tenancy.png)

### Tenants

::::: row
:::: left

Use tenants in your application when you want specific users to have access to specific resources or actions.

If you will want more than one user to be able to access a tenant within your application, multi-tenancy allows you to give access to multiple users.

Similarly, if you will want some users to have access to more than one tenant, multi-tenancy allows you to add a user to many tenants.

::::
:::: right
:::tip
If you want more than one user per account, or more than one account per user, multi-tenancy is a good solution.
:::
::::
:::::

### Roles

::::: row
:::: left

Roles define what level of access a user has within a tenant.

Role names like `admin`, `author`, or `developer` can mean whatever you want within your application, and you can define your own roles as needed.

Because a tenant does not "belong" to a given user, each user must have one or more roles in order to be associated with a tenant.

::::
:::::

### JWT access token

::::: row
:::: left

When a user has a role in one or more tenant, it will show in the `authorization` object of their JWT access token.

In this example, the user is an `admin` of Tenant A (`nz569yb7`) and has `viewer` and `support` roles for Tenant B (`a5h281k8`).

::::
:::: right

```json
{
  "userId": 1,
  "authorization": {
    "nz569yb7": {
      "roles": ["admin"]
    },
    "a5h281k8": {
      "roles": ["viewer", "support"]
    }
  }
}
```

::::
:::::

### Usage in your application

::::: row
:::: left

Your server should first verify the JWT access token, and then it can check the `authorization` object to determine whether to allow access or not.

With this approach, your server can check the access token at whatever point makes the most sense for your application.

::::
:::: right

```js
// Example with verified access token
var roles = verifiedAccessToken.authorization["nz569yb7"].roles;

if (roles.includes["admin"]) {
  // Allow access
} else {
  // Return 401 error
}
```

See also: [Verify the JWT access token](/guide/auth/#verify-the-jwt-access-token)

::::
:::::
