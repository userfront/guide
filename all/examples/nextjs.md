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

:::::row
::::left

### Routing

We'll set up our application with the following routes:

| Route        | Description                   |
| :----------- | :---------------------------- |
| `/`          | Home page                     |
| `/signup`    | Signup page                   |
| `/login`     | Login page                    |
| `/dashboard` | Dashboard for logged in users |
| `/reset`     | Password reset page           |

Update `/pages/index.js` to add links to the routes we want:

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

### Adding routes

:::::row
::::left

To build these routes and a navbar to navigate between them, we add the following files:

- A navbar file in the `/components` folder (create this folder too)
- A file for each new route in the `/pages` folder
- Files to style the navbar and dashboard in the `/styles` folder

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

### Navbar

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

![React Router authentication](https://res.cloudinary.com/component/image/upload/v1614094607/permanent/react-router-basic.gif)
:::

::::
:::::

With our routes in place, we are ready to add authentication.

## Signup, login, and password reset

:::::row
::::left

We'll start by adding a signup form to the home page.

In the Toolkit section of your dashboard, locate the instructions for installing your signup form.

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
npm start
```

::::
:::::

:::::row
::::left

Add the signup form to your home page by importing and initializing Userfront, and then updating the `Home()` function to render the form.
::::
:::::

:::::row
::::left

```jsx
// src/App.js

import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Userfront from "@userfront/react";

Userfront.init("demo1234");

const SignupForm = Userfront.build({
  toolId: "nkmbbm",
});

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/reset">Reset</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/reset">
            <PasswordReset />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <SignupForm />
    </div>
  );
}

function Login() {
  return <h2>Login</h2>;
}

function PasswordReset() {
  return <h2>Password Reset</h2>;
}

function Dashboard() {
  return <h2>Dashboard</h2>;
}
```

::::
::::right

:::card

#### Preview

![React signup form](https://res.cloudinary.com/component/image/upload/v1614095453/permanent/react-router-signup.png)
:::

::::
:::::

:::::row
::::left

Now the home page has your signup form. Try signing up a user.

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
// src/App.js

import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Userfront from "@userfront/react";

Userfront.init("demo1234");

const SignupForm = Userfront.build({
  toolId: "nkmbbm",
});
const LoginForm = Userfront.build({
  toolId: "alnkkd",
});
const PasswordResetForm = Userfront.build({
  toolId: "dkbmmo",
});

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/reset">Reset</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/reset">
            <PasswordReset />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <SignupForm />
    </div>
  );
}

function Login() {
  return (
    <div>
      <h2>Login</h2>
      <LoginForm />
    </div>
  );
}

function PasswordReset() {
  return (
    <div>
      <h2>Password Reset</h2>
      <PasswordResetForm />
    </div>
  );
}

function Dashboard() {
  return <h2>Dashboard</h2>;
}
```

::::
::::right

:::card

#### Preview

![React signup, login, password reset](https://res.cloudinary.com/component/image/upload/v1614095875/permanent/react-router-3.gif)
:::
::::

:::::

At this point, your signup, login, and password reset should all be functional.

Your users can sign up, log in, and reset their password.

## Protected route in React

:::::row
::::left

Usually, we don't want users to be able to view the dashboard unless they are logged in. This is known as protecting a route.

Whenever a user is not logged in but tries to visit `/dashboard`, we can redirect them to the login screen.

We can accomplish this by updating the `Dashboard` component in `src/App.js` to handle the conditional logic.

When a user is logged in, they will have an access token available as `Userfront.accessToken()`. We can check for this token to determine if the user is logged in.

Add the `Redirect` component to the `import` statement for React Router, and then update the `Dashboard` component to redirect if no access token is present.
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
