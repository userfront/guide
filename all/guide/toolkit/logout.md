# Logout

## Core JS library

You can log out a user with the Userfront Core JavaScript library, which has the `logout()` method.

[Userfront.logout() method](/docs/js.html#logout)

```js
// Example to log out a user
Userfront.logout();
```

## Toolkit button

There is also an included button in the Toolkit.

The purpose of the Logout Button is to allow a logged in user to log out.

![Logout Button](https://res.cloudinary.com/component/image/upload/c_crop,e_trim:2:white/if_w_lt_6/c_lpad,h_150,w_140,l_text:Arial_16:No%20preview,co_rgb:999999/if_end/if_w_lt_100/w_1.33,h_1.33,e_sharpen:50/if_end/c_lpad,h_150,w_140,b_rgb:ffffff/v1582158400/logout_uje4x0.png)

When a user logs out, they are redirected to the URL of your choice (default is `/login`). Their access token is removed from the browser and also invalidated on Userfront.

## Usage

:::warning
For your live sites, always use `https://` (also called SSL).<br>
If your URL begins with `http://`, it is not secure.
:::

The Logout Button does the following when clicked:

1. Invalidates the user's access token with Userfront, so that it is no longer valid.
2. Removes the user's access token from their browser. The token is a cookie named `access.${accountId}`; for example, if your account ID was `abcdefg`, the token would be `access.abcdefg`.
3. Redirects the user to the designated logout page.

Add your Logout Button to pages where you want your users to be able to log out. You can add multiple Logout Buttons to the same page, and can also add the Logout Button to many different pages if desired.

## Redirection

When a user clicks the Logout Button, they are redirected to the URL of your choice. The default is `/login`, but you can change it in your account's Settings:

![Logout URL](https://res.cloudinary.com/component/image/upload/v1583361090/guide/logout_url.png)

When defined as a relative path like `/login`, the user will be redirected whatever domain the button is on, plus that path.

For example, placing the Logout Button at `https://example.com/random`, and defining the redirection path to be `/login` will redirect the user to `https://example.com/login` once the button is clicked.
