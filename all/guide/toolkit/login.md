# Login

## Purpose

The purpose of the Login Form is to allow existing users to log into your service.

![Login Form](https://res.cloudinary.com/component/image/upload/w_300/v1597168270/permanent/login-mod.png)

When a user logs in, they are redirected to the URL of your choice (default is `/dashboard`). They can also choose to generate a login link or reset their password if they have forgotten it.

## Usage

:::warning
For your live sites, always use `https://` (also called SSL).<br>
If your URL begins with `http://`, it is not secure.
:::

Add your Login Form to any page where you want a user to be able to log in. For example, you may want your Login Form on a page at `/login` and also in the footer of your landing page.

In order for the Login Form to work properly, it should be on a page with the same domain as your "logged in" pages.

## Redirection

When a user logs in, they are redirected to the URL of your choice. The default is `/dashboard`, but you can change it in your project's settings:

![Login URL](https://res.cloudinary.com/component/image/upload/v1583361090/guide/login_url.png)

When defined as a relative path like `/dashboard`, the user will be redirected whatever domain the form is on, plus that path.

For example, if the Login Form is at `https://example.com/login`, then the user will be redirected to `https://example.com/dashboard` upon login.

## API interaction (optional)

If you want to build a custom login form, you can do so by using the same endpoints as the Login Form in your Toolkit:

### Log in a user with password

```
POST https://api.userfront.com/v0/auth/basic
```

#### Request

```json
{
  "project": "n8bjqqx7",
  "emailOrUsername": "janedoe",
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

Your custom JS code should add the `token` contained in the response to the cookie `access.${projectId}` and then redirect to the `redirectTo` URL. In this example, the cookie would be:

```
access.n8bjqqx7 = 'Bearer abcde'
```

And your custom JS code should redirect the page once the token has been added to the cookies.

```js
window.location.href = "https://example.com/dashboard";
```
