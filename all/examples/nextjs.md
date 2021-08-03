---
sidebar: auto
sidebarDepth: -1
---

# Next.js auth example

:::::row
::::left

In this example, we will add authentication and access control to a Next.js application.

We will use Create Next App for setup, and will create an application with the following:

- Signup, login, and password reset
- Single Sign-On (SSO)
- Client-side access control
- Server-side access control
- API access

::::
::::right

:::card

#### GitHub repo for this example

[https://github.com/userfront/nextjs-example](https://github.com/userfront/nextjs-example)
:::

::::
:::::

## Next.js authentication

:::::row
::::left

At a high level, the client's responsibility in authentication is to:

1. Send an initial request to Userfront to get the JWT access token. This is what the signup and login forms do.

2. Send the JWT access token to your server with each subsequent request.

::::
::::right

![Next.js authentication diagram](https://res.cloudinary.com/component/image/upload/v1616013076/permanent/userfront-diagram.png)

::::
:::::

## Set up Create Next App

:::::row
::::left

To get Next.js up and running, start by installing [Create Next App](https://nextjs.org/docs/api-reference/create-next-app)

```sh
npx create-next-app
```

Answer the prompts to install `create-next-app` and name your project `nextjs-example` (or whatever you want).

Now our Next.js application is available at http://localhost:3000 when we run

```sh
cd nextjs-example
npm run dev
```

Just like it says, we can now edit the `pages/index.js` file to start working.
::::
::::right

:::card

#### Preview

![Create Next App authentication](https://res.cloudinary.com/component/image/upload/v1627319612/guide/examples/nextjs-0.png)
:::

::::
:::::

## Set up routes

:::::row
::::left

We'll set up our application with the following pages:

| Route        | Description                   |
| :----------- | :---------------------------- |
| `/`          | Home page                     |
| `/signup`    | Signup page                   |
| `/login`     | Login page                    |
| `/dashboard` | Dashboard for logged in users |
| `/reset`     | Password reset page           |

Update `/pages/index.js` to add links to the pages we want:

::::
:::::
::::: row
:::: left

```jsx {24-44}
// /pages/index.js

import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="/signup" className={styles.card}>
            <h3>Sign up &rarr;</h3>
            <p>Register an account.</p>
          </a>

          <a href="/login" className={styles.card}>
            <h3>Log in &rarr;</h3>
            <p>Log into your account.</p>
          </a>

          <a href="/dashboard" className={styles.card}>
            <h3>Dashboard &rarr;</h3>
            <p>View your dashboard.</p>
          </a>

          <a href="/reset" className={styles.card}>
            <h3>Reset &rarr;</h3>
            <p>Reset your password.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
```

::::
:::: right
:::card

#### Preview

![](https://res.cloudinary.com/component/image/upload/v1627323110/guide/examples/nextjs-1.png)
:::
::::
:::::

### Add files to the project

:::::row
::::left

To build out the routes and a navbar to navigate between them, create the following files in your project:

<pre style="color:white">
.
├── components
│ <span class="token string">├── navbar.js</span>
│
├── pages
│ ├── _app.js
│ <span class="token string">├── dashboard.js</span>
│ ├── index.js
│ <span class="token string">├── login.js</span>
│ <span class="token string">├── reset.js</span>
│ <span class="token string">├── signup.js</span>
│
├── styles
│ <span class="token string">├── Dashboard.module.css</span>
│ ├── globals.css
│ ├── Home.module.css
│ <span class="token string">├── Navbar.module.css</span>
│
├── ...
└── package.json
</pre>

::::
:::::

### Navbar setup

:::::row
::::left

We'll show the navbar at the top of every page except the home page.

We use an `isLoggedIn` prop in the `<Navbar>` component to show or hide different links:

::::
:::::

:::::row
::::left

```jsx
// /components/navbar.js

import styles from "../styles/Navbar.module.css";

export default function Navbar({ isLoggedIn }) {
  return (
    <header className={styles.header}>
      <div>
        <a href="/">Home</a>
      </div>
      <div className={styles.navbarRight}>
        {!isLoggedIn && <a href="/signup">Sign up</a>}
        {!isLoggedIn && <a href="/login">Log in</a>}
        {isLoggedIn && <a href="/dashboard">Dashboard</a>}
        {isLoggedIn && <a href="/reset">Password reset</a>}
      </div>
    </header>
  );
}
```

```css
/* /styles/Navbar.module.css */

.header {
  padding: 1rem;
  margin-bottom: 50px;
  display: flex;
}
.header a {
  color: #0070f3;
  margin: 0 1rem;
}
.navbarRight {
  margin-left: auto;
}
```

::::
::::right

:::card

#### Preview

When a user is logged out, the navbar has links to sign up or log in.

![Next.js navbar logged out](https://res.cloudinary.com/component/image/upload/v1627655291/guide/examples/nextjs-navbar-logged-out.png)

When the user is logged in, the navbar has links to the dashboard and password reset.

![Next.js navbar logged in](https://res.cloudinary.com/component/image/upload/v1627655291/guide/examples/nextjs-navbar-logged-in.png)
:::

::::
:::::

## Signup, login, and password reset

:::::row
::::left

We'll start by adding a signup form to the `/signup` page.

In the **Toolkit** section of the Userfront dashboard, locate the instructions for installing your signup form.

It will look like this:

:::card

#### Userfront Toolkit

![Userfront installation instructions](https://res.cloudinary.com/component/image/upload/v1617818640/permanent/installation-instructions-react.png)
:::

::::
:::::

:::::row
::::left

Follow the instructions by installing the Userfront React package with:

```js
npm install @userfront/react --save
npm run dev
```

::::
:::::

:::::row
::::left

We can avoid having to initialize Userfront on every page by initializing it once in `_app.js`.

Import and initialize Userfront in the `/pages/_app.js` file:

```jsx {3,6}
// /pages/_app.js

import Userfront from "@userfront/react";
import "../styles/globals.css";

Userfront.init("demo1234");

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

::::
:::::

:::::row
::::left

Now add the signup form and navbar to the signup page, passing through the `isLoggedIn` prop from the page to the navbar:
::::
:::::

:::::row
::::left

```jsx
// /pages/signup.js

import Userfront from "@userfront/react";
import Navbar from "../components/navbar.js";

const SignupForm = Userfront.build({
  toolId: "nkmbbm",
});

function Signup({ isLoggedIn }) {
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <SignupForm />
    </div>
  );
}

export default Signup;
```

::::
::::right

:::card

#### Preview

![Next.js signup form](https://res.cloudinary.com/component/image/upload/v1627657200/guide/examples/nextjs-signup-0.png)
:::

::::
:::::

:::::row
::::left

Your signup form should appear on the page. Try signing up a user.

::::
:::::

:::::row

::::left

#### Test mode

The form is in "Test mode" by default, which will create user records in a test environment you can view separately in your Userfront dashboard.

::::
:::::

![Userfront test mode](https://res.cloudinary.com/component/image/upload/v1612980797/permanent/create-react-app-2.png)

:::::row
::::left

Continue by adding your login and password reset forms in the same way that you added your signup form:
::::
:::::

:::::row
::::left

```jsx
// /pages/login.js

import Userfront from "@userfront/react";
import Navbar from "../components/navbar.js";

const LoginForm = Userfront.build({
  toolId: "alnkkd",
});

function Login({ isLoggedIn }) {
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <LoginForm />
    </div>
  );
}

export default Login;
```

```jsx
// /pages/reset.js

import Userfront from "@userfront/react";
import Navbar from "../components/navbar.js";

const PasswordResetForm = Userfront.build({
  toolId: "dkbmmo",
});

function PasswordReset({ isLoggedIn }) {
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <PasswordResetForm />
    </div>
  );
}

export default PasswordReset;
```

::::
::::right

:::card

#### Preview

![Next.js signup, login, password reset](https://res.cloudinary.com/component/image/upload/v1627659971/guide/examples/nextjs-2.gif)
:::
::::

:::::

At this point, your signup, login, and password reset should all be functional.

Your users can sign up, log in, and reset their password.

## Protected route in Next.js

:::::row
::::left

Usually, we don't want users to be able to view the dashboard unless they are logged in. This is known as protecting a route.

Whenever a user is not logged in but tries to visit `/dashboard`, we can redirect them to the login screen.

We'll start by adding the dashboard page, so that we have something to protect.

::::
:::::

### Dashboard page

:::::row
::::left

The dashboard page has information about the logged in user as well as a logout button.

We can get information about the logged in user by calling `Userfront.user` in the client-side code.

To log the user out, we can call `Userfront.logout()`.

Add the following to `/pages/dashboard.js` and `/styles/Dashboard.module.css` to set up the dashboard page:

::::
:::::

:::::row
::::left

```jsx
// /pages/dashboard.js

import { useState, useEffect } from "react";
import Userfront from "@userfront/react";
import Navbar from "../components/navbar.js";
import styles from "../styles/Dashboard.module.css";

const Dashboard = ({ isLoggedIn }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(Userfront.user);
  });

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <div className={styles.container}>
        <div className={styles.main}>
          <img src={user.image} className={styles.img} />
          <p>{user.email}</p>
          <div>
            <button onClick={Userfront.logout} className={styles.logout}>
              Logout
            </button>
          </div>
        </div>
        <div className={styles.data}>
          <p>
            <span className={styles.code}>Userfront.user</span>
          </p>
          <pre>
            <code>{JSON.stringify(user, null, 2)}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
```

```css
/* /styles/Dashboard.module.css */

.container {
  max-width: 800px;
  margin: 0 auto;
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.button,
.logout {
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
  border-radius: 4px;
  outline: none;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
}

.button {
  background: #0070f3;
  color: white;
}

.data {
  padding: 0 2rem;
}

.img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.code {
  background: #efefef;
  padding: 2px 6px;
  font-weight: 600;
  border-radius: 4px;
}
```

::::
:::: right
::: card

#### Preview

![Next.js dashboard](https://res.cloudinary.com/component/image/upload/v1627661688/guide/examples/nextjs-dashboard-0.png)
:::
::::
:::::

::::: row
:::: left

### Protecting the dashboard page

When a user is logged in, they are issued an access token that gets stored as a cookie in their browser.

::::
:::::

:::::row
::::left

```jsx
// src/App.js

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect, // Be sure to add this import
} from "react-router-dom";

// ...

function Dashboard() {
  function renderFn({ location }) {
    // If the user is not logged in, redirect to login
    if (!Userfront.accessToken()) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: location },
          }}
        />
      );
    }

    // If the user is logged in, show the dashboard
    const userData = JSON.stringify(Userfront.user, null, 2);
    return (
      <div>
        <h2>Dashboard</h2>
        <pre>{userData}</pre>
        <button onClick={Userfront.logout}>Logout</button>
      </div>
    );
  }

  return <Route render={renderFn} />;
}
```

Notice also that we've added a logout button by calling `Userfront.logout()` directly:

```js
<button onClick={Userfront.logout}>Logout</button>
```

Now, when a user is logged in, they can view the dashboard. If the user is not logged in, they will be redirected to the login page.

::::
::::right

:::card

#### Preview

![React protected route](https://res.cloudinary.com/component/image/upload/v1614104770/permanent/react-router-4.png)
:::
::::
:::::

## React authentication with an API

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

For Userfront, the access token is available in your React application as `Userfront.accessToken()`.

Your React application can send this as a `Bearer` token inside the `Authorization` header. For example:

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

## React SSO (Single Sign On)

:::::row
::::left

From here, you can add social identity providers like Google, Facebook, and LinkedIn to your React application, or business identity providers like Azure AD, Office365, and more.

You do this by creating an application with the identity provider (e.g. Google), and then adding that application's credentials to the Userfront dashboard. The result is a modified sign on experience.

No additional code is needed to implement Single Sign On using this approach: you can add and remove providers without updating your forms or the way you handle JWTs.
::::
::::right

![React SSO form](https://res.cloudinary.com/component/image/upload/v1619211588/guide/sso-signup.png)

::::
:::::
