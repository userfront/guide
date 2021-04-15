# React Router

This example builds on the Create React App [example](/guide/examples/create-react-app), which set up a basic React app with a Userfront signup form.

The repo for this example is available at [https://github.com/userfront/react-router](https://github.com/userfront/create-react-app).

## 1. Initial setup

First, we'll add React Router and some routes based on the official React Router [quickstart](https://reactrouter.com/web/guides/quick-start).

Install React Router:

```
npm install react-router-dom --save
```

Replace the `src/App.js` file with the contents of the React Router quickstart for nested routes:

```jsx
// src/App.js

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/topics">
            <Topics />
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

function About() {
  return <h2>About</h2>;
}

function Topics() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}
```

Now our page doesn't look like much, but the router is functional:

![React Router quickstart](https://res.cloudinary.com/component/image/upload/v1613068788/permanent/react-router.gif)

## 2. Customize routes

We will use the following routes for this application:

| Name                                   | Path         | Purpose                                           |
| :------------------------------------- | :----------- | :------------------------------------------------ |
| [Home](#home-page)                     | `/`          | Home page (with signup form)                      |
| [Login](#login-page)                   | `/login`     | Login page                                        |
| [Password reset](#password-reset-page) | `/reset`     | Password reset page                               |
| [Dashboard](#dashboard-page)           | `/dashboard` | Dashboard - redirect to `/login` if not logged in |

::: warning Coming soon
This section will be posted shortly
:::

### Home, Login, and Password reset

### Dashboard page
