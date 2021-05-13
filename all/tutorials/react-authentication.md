# React authentication, simplified

:::::row
::::left
Authentication is one of those things that just always seems to take a lot more effort than we want it to.

To set up auth, you have to re-research topics you haven’t thought about since the last time you did authentication, and the fast-paced nature of the space means things have often changed in the meantime. New threats, new options, and new updates may have kept you guessing and digging through docs in your past projects.

In this tutorial, we lay out a different approach to authentication (and access control, SSO, and more) in React applications. Rather than add a static library that you have to keep up to date or re-research each time you want to implement auth, we’ll use a service that stays up to date automatically and is a much simpler alternative to Auth0, Okta, and others.
::::
:::::

## React authentication

:::::row
::::left

We typically use a similar approach when writing authentication in React: our React app makes a request to our authentication server, which then returns an access token. That token is saved in the browser and can be used in subsequent requests to your server (or other servers, if needed).

Whether writing standard email & password authentication or using magic links or single sign on (SSO) logins like Google, Azure, or Facebook, we want our React app to send an initial request to an authentication server and have that server handle all the complexity of generating a token.

::::
::::right

:::card

#### React's responsibility

1. Send the initial request to the authentication server
2. Receive and store the access token
3. Send the access token to your server with each subsequent request

:::
::::
:::::

## JWTs (JSON Web Tokens)

:::::row
::::left

JSON Web Tokens (JWTs) are compact, URL-safe tokens that can be used for authentication and access control in React applications.

Each JWT has a simple JSON-object as its “payload” and is signed such that your server can verify that the payload is authentic.

It’s important to note that this payload is readable by anyone with the JWT, including your React application or a third party.

::::
::::right
:::card

#### Example JWT

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImF1dGhvcml6YXRpb24iOiJhZG1pbiJ9.f7iKN-xi24qrQ5NQtOe0jiriotT-rve3ru6sskbQXnA
```

The payload for this JWT is the middle section (separated by periods):

```
eyJ1c2VySWQiOjEsImF1dGhvcml6YXRpb24iOiJhZG1pbiJ9
```

The JWT payload can be decoded from base64 to yield the JSON object:

```js
JSON.parse(atob("eyJ1c2VySWQiOjEsImF1dGhvcml6YXRpb24iOiJhZG1pbiJ9"));

// =>
{
  “userId”: 1,
  “authorization”: “admin”
}
```

:::
::::
:::::

## JWT access tokens

:::::row
::::left

With modern cryptography like RSA, an authentication server can generate secure JWTs that any other machine can read and verify as authentic using a public key. This means that JWTs can be used as access tokens to allow users to log in.

Using this kind of JWT access token, your backend server can verify a JWT access token as authentic by checking it against the public key. This allows your backend server to reject any JWT access tokens that were not created by the authentication server (or that have expired).

::::
::::right

:::card

#### JWTs in a React app

1. Your React app requests a JWT access token whenever the user wants to sign on.
2. The authentication server generates a JWT access token using a private key and then sends the JWT access token back to your React app.
3. Your React app stores this JWT access token and sends it to your backend server whenever your user needs to make a request.
4. Your backend server verifies the JWT access token using a public key and then read the payload to determine which user is making the request.

:::

:::warning NOTE
Each of these steps is simple to write down, but each step has its own pitfalls when you actually want to implement it and keep it secure. Especially over time, as new threat vectors emerge and new platforms need to be patched or supported, the security overhead can add up quickly.
:::
::::
:::::

## Userfront removes auth complexity in React apps

:::::row
::::left

Userfront is a framework that abstracts away auth complexity.

This makes it much easier for you to work with authentication in a React application and, perhaps most importantly, keeps all the auth protocols updated for you automatically over time.

The underlying philosophy with Userfront is that world-class auth should not take effort – it should be easy to set up, and security updates should happen for you automatically.

Userfront has all the bells and whistles of authentication, Single Sign On (SSO), access control, and multi-tenancy, with a production-ready free tier up to 10,000 monthly active users. For most modern React applications, it’s a great solution.

::::
:::::

## Setting up authentication in React

:::::row
::::left

Now we will go through building all the main aspects of authentication in a React application.

We will use Create React App for setup, along with React Router for client-side routing.

::::
::::right

:::card

#### GitHub repo for this example

[https://github.com/userfront/react-example](https://github.com/userfront/react-example)
:::

::::
:::::

## JWT access token flow

:::::row
::::left

At a high level, React’s responsibility in authentication is to:

1. Send an initial request to Userfront to get the JWT access token. This is what the signup and login forms do.

2. Send the JWT access token to your server with each subsequent request.

::::
::::right

![React authentication diagram](https://res.cloudinary.com/component/image/upload/v1616013076/permanent/userfront-diagram.png)

::::
:::::

## Set up Create React App

:::::row
::::left

To get React up and running, start by installing [Create React App](https://reactjs.org/docs/create-a-new-react-app.html) and [React Router](https://reactrouter.com/web/guides/quick-start)

```js
npx create-react-app my-app
cd my-app
npm install react-router-dom --save
npm start
```

Now our React application is available at http://localhost:3000

Just like it says, we can now edit the `src/App.js` file to start working.
::::
::::right

:::card

#### Preview

![Create React App authentication](https://res.cloudinary.com/component/image/upload/v1612896738/permanent/create-react-app.gif)
:::

::::
:::::

:::::row
::::left

### Routing

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
Replace the contents of `src/App.js` with the following, based on the React Router quickstart:
::::
:::::

:::::row
::::left

```jsx
// src/App.js

import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
  return <h2>Home</h2>;
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

![React Router authentication](https://res.cloudinary.com/component/image/upload/v1614094607/permanent/react-router-basic.gif)
:::

::::
:::::

With our routes in place, we are ready to add authentication.

## Signup, login, and password reset

:::::row
::::left

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

Follow the instructions by installing the Userfront react package with:

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

## Final notes

:::::row
::::left

Adding authentication and access control to your React application doesn't have to be a hassle. Both the setup step and, more importantly, the maintenance over time, are handled with modern platforms like Userfront.

JSON Web Tokens allow you to cleanly separate your auth token generation layer from the rest of your application, making it easier to reason about and more modular for future needs. This architecture also allows you to focus your efforts on your core application, where you are likely to create much more value for yourself or your clients.

For more details on adding auth to your React application, visit the [Userfront guide](/guide/), which covers everything from setting up your auth forms to API documentation, example repositories, working with different languages and frameworks, and more.
::::
::::right

:::card

#### Create a free Userfront account

<div style="padding: 20px 0">
  <a href="/signup" target="_blank" class="el-button el-button--primary">Create account</a>
</div>
:::

::::
:::::
