# Signup Form

## Purpose

The purpose of the Signup Form is to allow new users to sign up for your service.

![Signup Form](https://res.cloudinary.com/component/image/upload/w_300/v1582158400/signup_rntzec.png)

When a new user signs up, they are redirected to the URL of your choice (default is `/dashboard`). They also receive a welcome email with a link to confirm their email address.

## Usage

:::warning
For your live sites, always use `https://` (also called SSL).

This ensures that your users' login credentials are not visible to others. If your URL begins with `http://`, it is not secure.
:::

Add your Signup Form to any page where you want a user to sign up. For example, you may want your Signup Form directly on your home page and also on a page at `/signup`. You can also add it to your marketing pages if desired.

In order for the Signup Form to work properly, it should be on a page with the same domain as your "logged in" pages.

## Redirection

When a user signs up, they are redirected to the URL of your choice. The default is `/dashboard`, but you can change it in your project's settings:

![Signup URL](https://res.cloudinary.com/component/image/upload/v1583361090/guide/signup_url.png)

When defined as a relative path like `/dashboard`, the user will be redirected whatever domain the form is on, plus that path.

For example, if the Signup Form is at `https://example.com/features`, then the user will be redirected to `https://example.com/dashboard` upon sign up.

## Signup webhook (optional)

If you want to be notified when a new user is created, you can add a URL to the
User Created Webhook in your project settings.

![Signup webhook](https://res.cloudinary.com/component/image/upload/v1582764381/webhook_url_qcmvkl.png)

Userfront will send a JSON `POST` request to your Webhook URL whenever a user is created.

This request will have your project's Webhook Token in the header, which you can use to verify the request in your app.

![Webhook token](https://res.cloudinary.com/component/image/upload/v1583364091/guide/webhook_token.png)

```
Authorization: Bearer 4fd7235a7c94b4ec57579911786af80a
```

It will contain information about the user in the body:

```json
{
  "userId": 6,
  "uuid": "0b470419-1acb-4522-a94b-3c d64bc8c66dd",
  "username": "jdoe11",
  "name": "John Doe",
  "email": "john@doe.co",
  "project": "g48xypb9"
}
```

## API interaction (optional)

If you want to build a custom signup form, you can do so by using the same endpoints as the Signup Form in your Toolkit:

### Sign up a user

```
POST https://api.userfront.com/v0/auth/create
```

#### Request

```json
{
  "project": "g48xypb9",
  "username": "janedoe",
  "name": "Jane Doe",
  "email": "jane@doe.co",
  "password": "my-long-password"
}
```

#### Response

```json
{
  "token": "abcde",
  "redirectTo": "https://example.com/dashboard"
}
```

Your custom JS code should add the `token` contained in the response to the cookie `auth.${projectId}` and then redirect to the `redirectTo` URL. In this example, the cookie would be:

```
auth.g48xypb9 = 'Bearer abcde'
```

And your custom JS code should redirect the page once the token has been added to the cookies.

```js
window.location.href = "https://example.com/dashboard";
```
