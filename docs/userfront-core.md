# Userfront core library

## Setup

### Userfront.init( tenantId )

Initialize the Userfront library.

## Auth actions

Actions used to initiate or end a user session.

### Userfront.login( options )

Log a user in and redirect to the login path.

```
{ method, email, username, emailOrUsername, password, token, uuid }
```

### Userfront.logout( )

Log a user out and redirect to the logout path.

### Userfront.redirectIfLoggedIn( )

If the user is logged in, redirect the browser to the login path.

### Userfront.resetPassword( options )

```
{ uuid, token, password }
```

### Userfront.sendLoginLink( email )

Send a login link to the provided email.

### Userfront.sendResetLink( email )

Send a password reset link to the provided email.

### Userfront.signup( options )

Register a user via the provided method.

```
{ method, username, name, email, password }
```

## Tokens

Methods to read tokens

### Userfront.accessToken( )

Read the user's access token.

### Userfront.idToken( )

Read the user's ID token.
