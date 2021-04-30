# User Profile

## Purpose

The purpose of the User Profile is to allow your existing users to view and edit their own information.

![User Profile](https://res.cloudinary.com/component/image/upload/w_300/v1582158893/profile_kbeaou.png)

When a user is logged in, the User Profile allows them to edit their name, username, and image. It should be placed on a page that is considered "logged in".

## Usage

Add your User Profile to any page where you want a user to be able to view or edit their profile information. For example, you may want your User Profile on a page at `/profile`.

In order for the User Profile to work properly, it should be on a page with the same domain as your "logged in" pages.

## API interaction (optional)

If you want to build a custom User Profile, you can do so by using the same endpoints as the User Profile in your Toolkit:

### Read a user's information

#### GET request

```
GET https://api.userfront.com/v0/users/self
```

The request should contain the user's access token in the `Authorization` header. The access token is found in a cookie named `access.${accountId}`; for example, if your account ID was `abcdefg`, the token would be `access.abcdefg`.

```
Authorization: Bearer e2yvjua9p39ojup29j2j1k2lkjs.ol3ao3e8il3e3epo0a9u32a.ao8i3eao
```

#### Response

```json
{
  "userId": 6,
  "uuid": "87193077-f56f-453e-bc94-858ed921fec5",
  "name": "John Doe",
  "email": "john@doe.co",
  "username": "johndoe",
  "image": "https://res.cloudinary.com/component/image/upload/jdoe.png",
  "authorization": "member",
  "isConfirmed": true,
  "isDev": false,
  "locked": false,
  "createdAt": "2020-03-05T17:59:47.768Z",
  "updatedAt": "2020-03-05T22:23:10.060Z",
  "lastActiveAt": "2020-03-05T23:29:41.705Z",
  "project": {
    "eid": "g48xypb9",
    "name": "Demo"
  }
}
```

Your custom JS code can use this response to display information about the user.

### Update a user's information

#### PUT request

```
PUT https://api.userfront.com/v0/users/self
```

The JSON request should contain the user's access token in the `Authorization` header. The access token is found in a cookie named `access.${accountId}`; for example, if your account ID was `abcdefg`, the token would be `access.abcdefg`.

```
Authorization: Bearer e2yvjua9p39ojup29j2j1k2lkjs.ol3ao3e8il3e3epo0a9u32a.ao8i3eao
```

```json
{
  "name": "John Updated",
  "username": "johnupdated",
  "image": "https://res.cloudinary.com/component/image/upload/newimage.png"
}
```

#### Response

```json
{
  "userId": 6,
  "uuid": "87193077-f56f-453e-bc94-858ed921fec5",
  "name": "John Updated",
  "email": "john@doe.co",
  "username": "johnupdated",
  "image": "https://res.cloudinary.com/component/image/upload/newimage.png",
  "authorization": "member",
  "isConfirmed": true,
  "isDev": false,
  "locked": false,
  "lastActiveAt": "2020-03-05T23:29:41.705Z"
}
```

With these 2 endpoints, you can display or update information for your users as needed.
