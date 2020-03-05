# Logout Button

## Purpose

The purpose of the Logout Button is to allow a logged in user to log out.

![Logout Button](https://res.cloudinary.com/component/image/upload/c_crop,e_trim:2:white/if_w_lt_6/c_lpad,h_150,w_140,l_text:Arial_16:No%20preview,co_rgb:999999/if_end/if_w_lt_100/w_1.33,h_1.33,e_sharpen:50/if_end/c_lpad,h_150,w_140,b_rgb:ffffff/v1582158400/logout_uje4x0.png)

When a user logs out, they are redirected to the URL of your choice (default is `/login`). Their authentication token is removed from the browser and also invalidated on Userfront.

## Usage

:::warning
For your live sites, always use `https://` (also called SSL).

This ensures that your users' login credentials are not visible to others. If your URL begins with `http://`, it is not secure.
:::

Add your Logout Button to pages where you want your users to be able to log out. You can add multiple Logout Buttons to the same page, and can also add the Logout Button to many different pages if desired.

## Redirection

When a user clicks the Logout Button, they are redirected to the URL of your choice. The default is `/login`, but you can change it in your project's settings:

![Logout URL](https://res.cloudinary.com/component/image/upload/v1583361090/guide/logout_url.png)

When defined as a relative path like `/login`, the user will be redirected whatever domain the button is on, plus that path.

For example, placing the Logout Button at `https://example.com/random`, and defining the redirection path to be `/login` will redirect the user to `https://example.com/login` once the button is clicked.

<!-- ## Styling the button (optional) -->
