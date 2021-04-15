# PHP example

:::::row
::::left

In this example, we add authentication and access control to a PHP application.

To demonstrate both authentication and access control, our application will have several routes:

| Route            | Description                              | File                                                                 |
| :--------------- | :--------------------------------------- | :------------------------------------------------------------------- |
| `/`              | Home page (index.php)                    | [](https://github.com/userfront/php-example/blob/main/index.php)     |
| `/protected.php` | User dashboard, for logged in users only | [](https://github.com/userfront/php-example/blob/main/protected.php) |
| `/admin.php`     | Admin dashboard, for admins only         | [](https://github.com/userfront/php-example/blob/main/admin.php)     |
| `/login.php`     | Login page                               | [](https://github.com/userfront/php-example/blob/main/login.php)     |
| `/reset.php`     | Password reset page                      | [](https://github.com/userfront/php-example/blob/main/reset.php)     |

We cover each route below, along with an [interactive sample](#sample-code) at the end.

::::
::::right

:::card

#### GitHub repo for this example

[https://github.com/userfront/php-example](https://github.com/userfront/php-example)
:::

:::card

#### Sample on PHP sandbox

[Sandbox](https://phpsandbox.io/n/userfront-php-auth-oaqaa)

[Demo](https://oaqaa.ciroue.com/) (may need to be started by viewing sandbox)
:::

::::
:::::

## PHP authentication

:::::row
::::left

At a high level, PHP authentication is structured in 2 parts:

1. Send an initial request to Userfront to get the JWT access token and save it as a cookie. This is what the signup and login forms do.

2. Send the JWT access token as a cookie to your server with each subsequent request. To verify the JWT access token, we will use the [PHP-JWT library](https://github.com/firebase/php-jwt)

::::
::::right

![PHP authentication diagram](https://res.cloudinary.com/component/image/upload/v1616013076/permanent/userfront-diagram.png)

::::
:::::

:::::row
::::left

### Logged in vs. logged out

When someone new visits the Home page, they should see a signup form.

When a user is logged in and visits the Home page, they should see navigation to visit the dashboard, as well as a button to logout.

### Redirects

In the event that the user does not have access to a page, we want to redirect them:

| If the user visits                  | Redirect to      |
| :---------------------------------- | :--------------- |
| `/protected.php` when not logged in | `/login.php`     |
| `/admin.php` when not an admin      | `/protected.php` |

::::
::::right
:::tip
With Userfront, a logged in user will have a JWT access token saved in their cookies as `access.PROJECT_ID`.

In this example, we use `access.pn4qwpby`
:::
::::
:::::

## Public route

:::::row
::::left

For showing and hiding simple things that are not sensitive, we can check whether the user has a JWT access token.

```php
<!-- /index.php -->

<?php
// Read the JWT access token from the cookies
$tenantId = 'pn4qwpby';

if (isset($_COOKIE['access_' . $tenantId])) {
    $jwt = $_COOKIE['access_' . $tenantId];
}

$hasAccessToken = isset($jwt);
?>
```

If the user does have a token present, we can display items as though they are logged in, and if not, we can display items as though they are logged out.

::::
::::right

:::tip Note
Checking for the presence of the JWT access token should only be used for showing or hiding non-sensitive items. For sensitive data, verify the JWT access token as [described below](#protected-route).
:::

::::
:::::

:::::row
::::left

For this site, we show a link to the dashboard if logged in, and we show the signup form if logged out.

```php
<!-- /index.php -->

<?php
if ($hasAccessToken) {
    echo '<ul>';
    echo '<li><a href="/protected.php">Dashboard</a></li>';
    echo '<li><a href="/reset.php">Password reset</a></li>';
    echo '</ul>';
    echo '<br><button>Logout</button>';
} else {
    echo '<a href="/login.php">Login</a>';
    echo '<!-- Signup form -->';
    echo '<div id="userfront-naanob"></div>';
}
?>
```

For any sensitive information, we want to protect our routes as described next.

::::
::::right
:::card

#### Preview

Logged in home page:

![](https://res.cloudinary.com/component/image/upload/v1618433946/permanent/php-example/home-logged-in.png)

Logged out home page:

![](https://res.cloudinary.com/component/image/upload/v1618433946/permanent/php-example/home-logged-out.png)

:::::

## Protected route

:::::row
::::left

To protect a route in PHP, we need to verify that the JWT access token is valid and has not expired.

To verify our JWT access token, we can use the open source [PHP-JWT](https://github.com/firebase/php-jwt) library, which we install with composer:

```bash
composer require firebase/php-jwt
```

::::
:::::
:::::row
::::left

If the JWT access token is not present or is invalid, we redirect to `/login.php`. Otherwise, we display the dashboard page.

```php
<!-- /protected.php -->

<?php
// Use the PHP-JWT library https://github.com/firebase/php-jwt
// Installed first with "composer require firebase/php-jwt"
require __DIR__ . '/vendor/autoload.php';
use \Firebase\JWT\JWT;

// Read the JWT access token from the cookies
$tenantId = 'pn4qwpby';
$jwt = $_COOKIE['access_' . $tenantId];

// If the JWT access token is not set, redirect to login page
if (!isset($jwt)) {
    header("Location: /login.php");
    die();
}

$publicKey = "-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAs5fuiDLiZICIMnN3OAIP
Dv/IQIJSJ/IIPG8Q/uYxIx10Sm1SiykggrQIKYCAZoyqxxq8/mJhdXsMm1vWK+e3
kN0KJNylB4+/kNVQOgxoT3+qlas4ieZb1/p3eIlFMrNjHRqgFmDd75z+L0k4bVJ/
2Bh2kCxx7d9cS0A7cyEJ7ZFq6FeiNRUxhhpdwzMm5+A8WK8urYLIO6yfe4Cast1r
ToBrleIyXbs32fTezmTXA3IsoA1Cj/XADqsloV2FR/xA5DEaqgo3I6OmqFX8xiG6
f6IMneObVsDphEnDTda6IxPqxnfsetcu8gL0sNzsxxKe2+/FlNNRKdp7Jq8PGy2q
dAJxFXfcpM+TqcOtF4UIfPcZ6rDm/9McJ9uUj4nNKPilgZhsxeRGwaXJVFgaHB+h
+BYGWRQm8WBXBj4aMyyf2/T4mV/PeSqXY+2N28rEUjhw2E3rMCF4gHiauVv8qn19
hWEnKwk8IF1hJLkbtXLhF41KPCVC++x7EtQ27t1RE5+KAlH4bm3+CRdHqkjAyzCt
90m+3iTB5ThUk9mBZk3Ozr1+w7vvjUlyUSe0/hC5MLc1B7ee/bu2JBBRCcgXziBt
YHqFCRKQz3nc1vQXiYDhUgjZRq74mkzFN6H+X+Y9Sk3VUHJazvsGmmwEy1Cdw6kf
dgmH+hE/hlRBdk6licZic0kCAwEAAQ==
-----END PUBLIC KEY-----";

// Verify the JWT access token using the public key.
// If it is not valid, remove all cookies and redirect to /login.php
try {
    $decoded = JWT::decode($jwt, $publicKey, array('RS256'));
    $roles = $decoded->authorization->$tenantId->roles;
    $isAdmin = in_array('admin', $roles);
} catch (Exception $e) {
    setcookie("access_" . $tenantId, "", time() - 3600);
    setcookie("id_" . $tenantId, "", time() - 3600);
    setcookie("refresh_" . $tenantId, "", time() - 3600);
    header("Location: /login.php");
    die();
}
?>

<html>
<head>
    <meta charset="utf-8">
    <title>Dashboard</title>

    <script id="Userfront-script">
        (function(m,o,d,u,l,a,r,i,z,e) {
            u[m]={rq:[],ready:function(j){u[m].rq.push(j);},m:m,o:o,d:d,r:r};function j(s){return encodeURIComponent(btoa(s));}z=l.getElementById(m+"-"+a);r=u.location;
            e=[d+"/page/"+o+"/"+j(r.pathname)+"/"+j(r.host)+"?t="+Date.now(),d];e.map(function(w){i=l.createElement(a);i.defer=1;i.src=w;z.parentNode.insertBefore(i,z);});u.amvartem=m;
        })("Userfront", "pn4qwpby", "https://mod.userfront.com/v3",window,document,"script");
    </script>
</head>
<body>

<a href="/">Home</a> / Dashboard
<br>
<br>

<?php if ($isAdmin) { echo '<a href="/admin.php">Admin page</a><br><br>'; } ?>

This page is only for users who are logged in. The current user has the following JWT access token payload:

<br>
<pre><?php echo print_r((array) $decoded, true); ?></pre>
<br>

<button onclick="Userfront.logout()">Logout</button>

</body>
</html>
```

There are 2 forms of authentication here:

1. If the JWT access token is not present in the cookies, redirect to `/login.php`:

```php
if (!isset($jwt)) {
    header("Location: /login.php");
    die();
}
```

2. If the JWT access token is not valid for any reason, remove all Userfront cookies and redirect to `/login.php`:

```php
try {
    $decoded = JWT::decode($jwt, $publicKey, array('RS256'));
    <!-- ... -->
} catch (Exception $e) {
    setcookie("access_" . $tenantId, "", time() - 3600);
    setcookie("id_" . $tenantId, "", time() - 3600);
    setcookie("refresh_" . $tenantId, "", time() - 3600);
    header("Location: /login.php");
    die();
}
```

::::
::::right
:::card

#### Preview

Logged in dashboard page:

![](https://res.cloudinary.com/component/image/upload/v1618442784/permanent/php-example/dashboard-logged-in.png)
:::
::::
:::::

## Admin route

:::::row
::::left

If you haven't already, install the [JWT-PHP](https://github.com/firebase/php-jwt) library:

```bash
composer require firebase/php-jwt
```

The admin route is similar to the protected route, except in addition to verifying the JWT access token, we also check that the JWT access token has an admin role.

```php
<!-- /admin.php -->

<?php
// Use the PHP-JWT library https://github.com/firebase/php-jwt
// Installed first with "composer require firebase/php-jwt"
require __DIR__ . '/vendor/autoload.php';
use \Firebase\JWT\JWT;

// Read the JWT access token from the cookies
$tenantId = 'pn4qwpby';
$jwt = $_COOKIE['access_' . $tenantId];

// If the JWT access token is not set, redirect to login page
if (!isset($jwt)) {
    header("Location: /login.php");
    die();
}

$publicKey = "-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAs5fuiDLiZICIMnN3OAIP
Dv/IQIJSJ/IIPG8Q/uYxIx10Sm1SiykggrQIKYCAZoyqxxq8/mJhdXsMm1vWK+e3
kN0KJNylB4+/kNVQOgxoT3+qlas4ieZb1/p3eIlFMrNjHRqgFmDd75z+L0k4bVJ/
2Bh2kCxx7d9cS0A7cyEJ7ZFq6FeiNRUxhhpdwzMm5+A8WK8urYLIO6yfe4Cast1r
ToBrleIyXbs32fTezmTXA3IsoA1Cj/XADqsloV2FR/xA5DEaqgo3I6OmqFX8xiG6
f6IMneObVsDphEnDTda6IxPqxnfsetcu8gL0sNzsxxKe2+/FlNNRKdp7Jq8PGy2q
dAJxFXfcpM+TqcOtF4UIfPcZ6rDm/9McJ9uUj4nNKPilgZhsxeRGwaXJVFgaHB+h
+BYGWRQm8WBXBj4aMyyf2/T4mV/PeSqXY+2N28rEUjhw2E3rMCF4gHiauVv8qn19
hWEnKwk8IF1hJLkbtXLhF41KPCVC++x7EtQ27t1RE5+KAlH4bm3+CRdHqkjAyzCt
90m+3iTB5ThUk9mBZk3Ozr1+w7vvjUlyUSe0/hC5MLc1B7ee/bu2JBBRCcgXziBt
YHqFCRKQz3nc1vQXiYDhUgjZRq74mkzFN6H+X+Y9Sk3VUHJazvsGmmwEy1Cdw6kf
dgmH+hE/hlRBdk6licZic0kCAwEAAQ==
-----END PUBLIC KEY-----";

// Verify the JWT access token using the public key.
// If it is not valid, remove all cookies and redirect to /login.php
try {
    $decoded = JWT::decode($jwt, $publicKey, array('RS256'));
    $roles = $decoded->authorization->$tenantId->roles;
    if (!in_array('admin', $roles)) {
        throw new Exception('Unauthorized');
    }
} catch (Exception $e) {
    setcookie("access_" . $tenantId, "", time() - 3600);
    setcookie("id_" . $tenantId, "", time() - 3600);
    setcookie("refresh_" . $tenantId, "", time() - 3600);
    header("Location: /protected.php");
    die();
}
?>

<html>
<head>
    <meta charset="utf-8">
    <title>Admin dashboard</title>
    <script id="Userfront-script">
        (function(m,o,d,u,l,a,r,i,z,e) {
            u[m]={rq:[],ready:function(j){u[m].rq.push(j);},m:m,o:o,d:d,r:r};function j(s){return encodeURIComponent(btoa(s));}z=l.getElementById(m+"-"+a);r=u.location;
            e=[d+"/page/"+o+"/"+j(r.pathname)+"/"+j(r.host)+"?t="+Date.now(),d];e.map(function(w){i=l.createElement(a);i.defer=1;i.src=w;z.parentNode.insertBefore(i,z);});u.amvartem=m;
        })("Userfront", "pn4qwpby", "https://mod.userfront.com/v3",window,document,"script");
    </script>
</head>
<body>

<a href="/">Home</a> / Admin only
<br>
<br>

This page is for admins only. This user has the following roles:
<?php
echo print_r(implode(', ',(array) $roles), true);
?>

<br>
<br>
<button onclick="Userfront.logout()">Logout</button>

</body>
</html>
```

::::
::::right

::::
:::::

:::::row
::::left

Here is the an additional check to make sure the JWT access token has the admin role:

```php
<!-- From /admin.php -->

try {
    $decoded = JWT::decode($jwt, $publicKey, array('RS256'));
    $roles = $decoded->authorization->$tenantId->roles;
    if (!in_array('admin', $roles)) {
        throw new Exception('Unauthorized');
    }
} catch (Exception $e) {
    setcookie("access_" . $tenantId, "", time() - 3600);
    setcookie("id_" . $tenantId, "", time() - 3600);
    setcookie("refresh_" . $tenantId, "", time() - 3600);
    header("Location: /protected.php");
    die();
}
```

::::
::::right

<div class="card light-code">
  <h4>JWT access token payload</h4>
  <p>The JWT access token has an <code>authorization</code> object that contains the user's roles:</p>
    <div class="language-json extra-class">
      <pre
        class="language-json"
      ><code class="language-json">{
    "userId": 1,
    "tenantId": "pn4qwpby",
    "authorization": {
        "pn4qwpby": {
            "roles": ["admin"]
        }
    }
}</code></pre>
  </div>
</div>

::::
:::::

## Sample code

The following code runs a site hosted at [https://oaqaa.ciroue.com/](https://oaqaa.ciroue.com/).

This site has fully implemented signup, login, logout, and password reset.

<iframe src="https://phpsandbox.io/e/x/oaqaa?&layout=Editor&iframeId=a4jdeyc3nl&theme=dark&defaultPath=/&showExplorer=yes&openedFiles=/index.php,/protected.php,/admin.php" style="display: block; min-height: 1200px;" loading="lazy" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" height="100%" width="100%"></iframe>
