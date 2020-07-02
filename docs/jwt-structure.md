# JWT structure

```json
{
  "userId": 99,
  "username": "someuser",
  "uuid": "3b22a243-7dd3-50a3-c9b4-9d1bbc96188b",
  "project": "PROJECT_ID",
  "authorization": "member",
  "createdAt": "2020-01-01T00:00:01.000Z",
  "confirmed": true,
  "isDev": false,
  "iat": 1593649607,
  "exp": 1596241607
}
```

The auth token JWT will be available in the browser cookie as `auth.PROJECT_ID`, where PROJECT_ID is your project's ID.

:::tip
Your project ID is in the URL for your project:
![Project ID](https://res.cloudinary.com/component/image/upload/v1583347563/guide/project_id_ilsrsa.png)
:::
