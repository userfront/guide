# Vue.js auth example

:::::row
::::left

In this example, we will add authentication and access control to a Vue.js application.

We will use Vue CLI for setup, along with Vue Router for client-side routing.

::::
::::right

:::card

#### GitHub repo for this example

[https://github.com/userfront/vue-example](https://github.com/userfront/vue-example)
:::

::::
:::::

## Vue.js authentication

:::::row
::::left

At a high level, Vue's responsibility in authentication is to:

1. Send an initial request to Userfront to get the JWT access token. This is what the signup and login forms do.

2. Send the JWT access token to your server with each subsequent request.

::::
::::right

![Vue.js authentication diagram](https://res.cloudinary.com/component/image/upload/v1616013076/permanent/userfront-diagram.png)

::::
:::::

## Set up Vue CLI

:::::row
::::left

To get Vue up and running, start by installing [Vue CLI](https://cli.vuejs.org/)

```sh
npm install -g @vue/cli
vue create vue-example
```

Select the options as you go. In this example, we set up Vue with the following:

- Vue version 2
- Babel
- Router with history mode
- CSS Pre-processor: dart sass
- Linter: ESLint + Prettier

Then with it set up, we can run the server:

```sh
cd vue-example
npm run serve
```

Now our Vue application is available at http://localhost:8080

::::
::::right

:::card

#### Preview

![Vue CLI app authentication](https://res.cloudinary.com/component/image/upload/v1625839561/guide/vue-cli-example.png)
:::

::::
:::::

### Routing

:::::row
::::left

We'll set up a simple app with routing. This is all we need to start adding authentication.

| Route        | Description                              |
| :----------- | :--------------------------------------- |
| `/`          | Home page                                |
| `/login`     | Login page                               |
| `/reset`     | Password reset page                      |
| `/dashboard` | User dashboard, for logged in users only |

::::
:::::

:::::row
::::left

Replace the contents of `src/router/index.js` with the following to set up the routes we want:

::::
:::::
::::: row
:::: left

```js {6-8,18-32}
// src/router/index.js

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Reset from "../views/Reset.vue";
import Dashboard from "../views/Dashboard.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/reset",
    name: "Reset",
    component: Reset,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
```

For each new route like `src/views/Login.vue`, we can make a basic template for now:

```html
<!-- src/views/Login.vue-->

<template>
  <div>
    <h1>Login</h1>
  </div>
</template>
```

```html
<!-- src/views/Reset.vue-->

<template>
  <div>
    <h1>Reset</h1>
  </div>
</template>
```

```html
<!-- src/views/Dashboard.vue-->

<template>
  <div>
    <h1>Dashboard</h1>
  </div>
</template>
```

<!-- ```html
<template>
  <div>
    <h1>Admin</h1>
  </div>
</template>
``` -->

Now when we run our server, we should have all 5 of the routes working.

With these routes in place, we are ready to add authentication.

::::
::::right

:::card

#### Preview

![Vue Router authentication](https://res.cloudinary.com/component/image/upload/v1625840798/guide/vue-cli-routing-0.gif)
:::

::::
:::::

## Signup, login, and password reset

:::::row
::::left

We'll start by adding a signup form to the home page.

In the **Toolkit** section of your dashboard, locate the instructions for installing your signup form with Vue.

It will look like this:

:::card

#### Userfront Toolkit

![Userfront Vue installation instructions](https://res.cloudinary.com/component/image/upload/v1625842678/guide/installation-instructions-vue.png)
:::

::::
:::::

:::::row
::::left

Follow the instructions by installing the Userfront Vue package with:

```sh
npm install @userfront/vue --save
npm run serve
```

::::
:::::

:::::row
::::left

We will use Userfront tools on multiple pages, so we can initialize it once in the `main.js` file, instead of the component like the instructions show.

```js {4,8}
// src/main.js

import Vue from "vue";
import Userfront from "@userfront/vue";
import App from "./App.vue";
import router from "./router";

Userfront.init("demo1234");

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
```

::::
:::::

:::::row
::::left
Now we can add the signup form to the home page by replacing the contents of `src/views/Home.vue` with the template from the instructions:
::::
:::::

:::::row
::::left

```html
<!-- src/views/Home.vue -->

<template>
  <div>
    <signup-form tool-id="nkmbbm" />
  </div>
</template>

<script>
  import { SignupForm } from "@userfront/vue";

  export default {
    components: {
      SignupForm,
    },
  };
</script>
```

<br>
Now the home page has your signup form. Try signing up a user.
::::
::::right

:::card

#### Preview

![Vue signup form](https://res.cloudinary.com/component/image/upload/v1625842971/guide/vue-cli-home.png)
:::

::::
:::::

:::::row
::::left

### Test mode

The form is in "Test mode" by default, which will create user records in a test environment you can view separately in your Userfront dashboard.

::::
:::::

![Userfront test mode](https://res.cloudinary.com/component/image/upload/v1612980797/permanent/create-react-app-2.png)

### Login and password reset

:::::row
::::left

Continue by adding your login and password reset forms in the same way that you added your signup form:
::::
:::::

:::::row
::::left

```html
<!-- src/views/Login.vue -->

<template>
  <div>
    <login-form tool-id="alnkkd" />
  </div>
</template>

<script>
  import { LoginForm } from "@userfront/vue";

  export default {
    components: {
      LoginForm,
    },
  };
</script>
```

```html
<!-- src/views/Reset.vue -->

<template>
  <div>
    <password-reset-form tool-id="dkbmmo" />
  </div>
</template>

<script>
  import { PasswordResetForm } from "@userfront/vue";

  export default {
    components: {
      PasswordResetForm,
    },
  };
</script>
```

::::
::::right

:::card

#### Preview

![Vue signup, login, password reset](https://res.cloudinary.com/component/image/upload/v1625844010/guide/vue-cli-routing-1.gif)
:::

::::
:::::

::::: row
:::: left

At this point, your signup, login, and password reset should all be functional.

Your users can sign up, log in, and reset their password.

::::
:::::

## Protected route in Vue

:::::row
::::left

Usually, we don't want users to be able to view the dashboard unless they are logged in. This is known as protecting a route.

Whenever a user is not logged in but tries to visit `/dashboard`, we can redirect them to the login screen.

We can accomplish this by adding a [navigation guard](https://router.vuejs.org/guide/advanced/navigation-guards.html) to our router.

When a user is logged in, they will have an access token available as `Userfront.accessToken()`. We can check for this token to determine if the user is logged in.

Add a `beforeEach` guard that checks for the `Userfront.accessToken()` value and, if not present, redirects to the login page.
::::
:::::

:::::row
::::left

```js {5,14-22}
// src/router/index.js

import Vue from "vue";
import VueRouter from "vue-router";
import Userfront from "@userfront/vue";
// ...

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // If the user is not logged in, redirect to /login
  const isLoggedIn = !!Userfront.accessToken();
  if (to.name === "Dashboard" && !isLoggedIn) {
    return next({ path: "/login" });
  }

  next();
});

export default router;
```

Now if someone tries to visit `/dashboard` while logged out, they are immediately redirected to `/login` instead.
::::
:::::

### Dashboard page

::::: row
:::: left

Whenever a user does log in, we want to show them some relevant information and also give them the ability to log out.

For the dashboard page, we can add information about the user by referencing the `Userfront.user` object.

We can log the user out by calling `Userfront.logout()`.

Replace the `src/views/Dashboard.vue` file with the following:

::::
:::::

::::: row
:::: left

```html
<!-- src/views/Dashboard.vue -->

<template>
  <div>
    <h1>Dashboard</h1>
    <div>
      <h3>{{ user.name }}</h3>
      <img :src="user.image" />
    </div>
    <button @click.prevent="logout">Log out</button>

    <pre><code>{{ user }}</code></pre>
  </div>
</template>

<script>
  import Userfront from "@userfront/vue";

  export default {
    computed: {
      user() {
        return Userfront.user;
      },
    },
    methods: {
      logout() {
        Userfront.logout();
      },
    },
  };
</script>

<style scoped>
  pre {
    text-align: left;
  }
</style>
```

::::
::::right

:::card

#### Preview

![Vue.js protected route](https://res.cloudinary.com/component/image/upload/v1625846602/guide/vue-cli-dashboard.png)
:::
::::
:::::

## Vue authentication with an API

:::::row
::::left

You will probably want to retrieve user-specific information from your backend. In order to protect these API endpoints, your server should check that incoming JWTs are valid.

There are many libraries to read and verify JWTs across various languages; here are a few popular libraries for handling JWTs:

::::
::::right

:::card

#### JWT libraries

<p>
  <a href="https://github.com/auth0/node-jsonwebtoken" target="_blank">Node.js</a>
  <br/>
  <a href="https://github.com/jpadilla/pyjwt/" target="_blank">Python</a>
  <br/>
  <a href="https://github.com/auth0/java-jwt" target="_blank">Java</a>
  <br/>
  <a href="https://github.com/firebase/php-jwt" target="_blank">PHP</a>
  <br/>
  <a href="https://github.com/jwt-dotnet/jwt" target="_blank">.NET</a>
</p>

:::
::::
:::::
:::::row
::::left

For Userfront, the access token is available in your Vue application as `Userfront.accessToken()`.

Your Vue application can send this as a `Bearer` token inside the `Authorization` header. For example:

```js
// Example of calling an endpoint with a JWT

async function getInfo() {
  const res = await window.fetch("/your-endpoint", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Userfront.accessToken()}`,
    },
  });

  console.log(res);
}

getInfo();
```

To handle a request like this, your backend should read the JWT from the `Authorization` header and verify that it is valid using the public key found in your Userfront dashboard.

Here is an example of Node.js middleware to read and verify the JWT:

```js
// Node.js example (Express.js)

const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  // Read the JWT access token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401); // Return 401 if no token

  // Verify the token using the Userfront public key
  jwt.verify(token, process.env.USERFRONT_PUBLIC_KEY, (err, auth) => {
    if (err) return res.sendStatus(403); // Return 403 if there is an error verifying
    req.auth = auth;
    next();
  });
}
```

Using this approach, any invalid or missing tokens would be rejected by your server. You can also reference the contents of the token later in the route handlers using the `req.auth` object:

```js
console.log(req.auth);

// =>
{
  mode: 'test',
  tenantId: 'demo1234',
  userId: 1,
  userUuid: 'ab53dbdc-bb1a-4d4d-9edf-683a6ca3f609',
  isConfirmed: false,
  authorization: {
    demo1234: {
      roles: ["admin"]
    },
  },
  sessionId: '35d0bf4a-912c-4429-9886-cd65a4844a4f',
  iat: 1614114057,
  exp: 1616706057
}
```

With this information, you can perform further checks as desired, or use the `userId` or `userUuid` to look up user information to return.

For example, if you wanted to limit a route to admin users, you could check against the `authorization` object from the verified access token:

```js
// Node.js example (Express.js)

app.get("/users", (req, res) => {
  const authorization = req.auth.authorization["demo1234"] || {};

  if (authorization.roles.includes("admin")) {
    // Allow access
  } else {
    // Deny access
  }
});
```

::::
:::::

## Vue.js SSO (Single Sign On)

:::::row
::::left

From here, you can add social identity providers like Google, Facebook, and LinkedIn to your Vue application, or business identity providers like Azure AD, Office365, and more.

You do this by creating an application with the identity provider (e.g. Google), and then adding that application's credentials to the Userfront dashboard. The result is a modified sign on experience.

No additional code is needed to implement Single Sign On using this approach: you can add and remove providers without updating your forms or the way you handle JWTs.
::::
::::right

![Vue SSO form](https://res.cloudinary.com/component/image/upload/v1619211588/guide/sso-signup.png)

::::
:::::
