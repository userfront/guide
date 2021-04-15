# Create React App

The repo for this example is available at [https://github.com/userfront/create-react-app](https://github.com/userfront/create-react-app)

## 1. Initial setup

Follow the [setup instructions](https://create-react-app.dev/docs/getting-started/) for Create React App. In your terminal, enter:

```
npx create-react-app my-app
cd my-app
npm start
```

After installing and running, your quickstart site should be viewable at `http://localhost:3000`

![Create React App](https://res.cloudinary.com/component/image/upload/v1612896738/permanent/create-react-app.gif)

Like the message says, we can now edit `src/App.js` to start working.

---

## 2. Add signup form

To add your signup form to this landing page, visit the "Toolkit" section of your Userfront dashboard. There you can find installation instructions for React.

First, install `@userfront/react` into your project by running the following in your terminal:

```
npm install @userfront/react --save
npm start
```

Next, edit the `src/App.js` file to replace the React logo with your signup form:

```js
// src/App.js

import "./App.css";
import Userfront from "@userfront/react";

Userfront.init("demo1234");

const SignupForm = Userfront.build({
  toolId: "nkmbbm",
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SignupForm />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

The CSS from the page will apply to the form as well.

For example, in `src/App.css` you can remove the `font-size` property from `.App-header` to adjust the size of the "Sign up" text if desired:

```css {10}
/* src/App.css */

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* font-size: calc(10px + 2vmin); */
  color: white;
}
```

The result is a styled sign up page:

![Create React App sign up page](https://res.cloudinary.com/component/image/upload/v1612979801/permanent/create-react-app-1.png)

## 3. Sign up

The signup form is now functional and is in "Test mode". Try adding some user information to the form to sign up. This will create a user in your dashboard, visible by toggling the "Test mode" on:

![Userfront dashboard test mode](https://res.cloudinary.com/component/image/upload/v1612980797/permanent/create-react-app-2.png)

By default, the signup form also redirected the page to `http://localhost:3000/dashboard`.

Create React App serves the same file for all pages by default, so you still see a signup page even though you just signed up.

You can edit the redirect location by visiting `Toolkit > Signup` in the Userfront dashboard.

### Next steps

To continue this example for a Single Page App (SPA) with proper routing using React Router, move on to the [React Router example](/guide/examples/react-router).
