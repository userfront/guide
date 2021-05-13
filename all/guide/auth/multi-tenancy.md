# Multi-tenancy

Multi-tenancy allows you to sub-divide your application so that your users can have their own accounts, teams, and organizations. The term "tenant" refers to one of these accounts, teams, or organizations.

Within a tenant, you can assign roles to your users.

![Multi tenancy](https://res.cloudinary.com/component/image/upload/v1603155746/permanent/multi-tenancy.png)

Users can have multiple roles within a tenant, and users can also have roles in more than one tenant.

### Tenants

Use tenants in your application when you want specific users to have access to specific resources or actions.

If you will want more than one user to be able to access an account within your application, multi-tenancy allows you to give access to multiple users.

Similarly, if you will want some users to have access to more than one account, multi-tenancy allows you to add a user to many accounts.

:::tip
If you want more than one user per account, or more than one account per user, multi-tenancy is a good solution.
:::

### Roles

Roles define what level of access a user has within a tenant. Role names like `admin`, `author`, or `developer` can mean whatever you want within your application, and you can define your own roles as needed.

Roles also map users onto tenants. Because a tenant does not "belong" to a given user, each user must have one or more roles in order to be associated with a tenant.

### Access token

On Userfront, a user's roles are represented in their [access token](/guide/auth/#access-token), which has an `authorization` property:

```json
"userId": 1,
"authorization": {
  "nz569yb7": {
    "roles": ["admin"]
  },
  "a5h281k8": {
    "roles": ["member"]
  }
}
```

In this example, the user is an `admin` of Tenant A (`nz569yb7`) and a `member` of Tenant B (`a5h281k8`).

### Usage in your application

When your server receives the user's access token, it can check against the access token's `authorization` object to determine whether or not a user is allowed access.

For example, if you have an API route in your application that returns a list of widgets in Tenant A (`tenantId = "nz569yb7"`) that is only available to admins, your route might look like:

`GET https://api.yoursite.com/tenants/{tenantId}/widgets`

Your server should decode and verify the access token JWT, and then it can check against the `authorization` object like:

```js
var tenantAccess = token.authorization[route.tenantId];
// => {
//      "roles": ["admin"],
//    }

if (tenantAccess.roles.includes["admin"]) {
  // Find and return widgets
} else {
  // Return 401 error
}
```

With this approach, your server can check the access token at whatever point makes the most sense for your application.
