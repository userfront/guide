# PHP example

:::::row
::::left

In this example, we add authentication and access control to a PHP application.

::::
::::right

<!-- :::card

#### GitHub repo for this example

[https://github.com/userfront/php-example](https://github.com/userfront/php-example)
::: -->

::::
:::::

## PHP authentication

:::::row
::::left

At a high level, PHP authentication is structured in 2 parts:

1. Send an initial request to Userfront to get the JWT access token and save it as a cookie. This is what the signup and login forms do.

2. Send the JWT access token as a cookie to your server with each subsequent request.

::::
::::right

![PHP authentication diagram](https://res.cloudinary.com/component/image/upload/v1616013076/permanent/userfront-diagram.png)

::::
:::::

## Setup

Our application will have several routes:

| Route            | Description                              |
| :--------------- | :--------------------------------------- |
| `/`              | Home page                                |
| `/login.php`     | Login page                               |
| `/reset.php`     | Password reset page                      |
| `/dashboard.php` | User dashboard, for logged in users only |
| `/admin.php`     | Admin dashboard, for admins only         |

The home page will have navigation and a signup form, while the other pages are as described.

## Code

The following code runs a site hosted at [https://oaqaa.ciroue.com/](https://oaqaa.ciroue.com/).

This site has fully implemented signup, login, logout, and password reset.

<iframe src="https://phpsandbox.io/e/x/oaqaa?&layout=Editor&iframeId=a4jdeyc3nl&theme=dark&defaultPath=/&showExplorer=no&openedFiles=/index.php,/login.php,/reset.php,/dashboard.php" style="display: block; min-height: 1200px;" loading="lazy" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" height="100%" width="100%"></iframe>
