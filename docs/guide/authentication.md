# Authentication

## What is authentication?

Authentication is the process of figuring out a user's identity. The main purpose of authentication is to guarantee identity with a secure & trustworthy process that is difficult to fake. Ease of use is important as well, so that users do not get frustrated.

When someone wants to log into a website, we need to know that they are who they claim to be. The most common way to do this is with a password that only they know, usually in combination with their email or username. As long as the password is difficult to guess, this strikes a decent balance between being difficult to fake and easy to use. This is why password-based authentication is widely adopted across many websites.

:::tip
Whenever a website authenticates a user, the connection between browser and server should **always** be encrypted using SSL (https). This ensures that software on the router and connecting equipment cannot see sensitive information like passwords or login tokens.
:::

## Authentication vs. Authorization

While Authentication determines the user's identity, Authorization determines what the user is allowed to do. Knowing who a user is (authentication) is different from saying what they are permitted to do (authorization).

For example, one user may be an admin, in which case they would be allowed to do anything on the site, while another user is a regular user who can only see their own profile and information. Both may use the same authentication process (e.g. a Login page), but they have very different levels of authorization.

Authentication is required for authorization; we have to know who someone is before we can say what they are allowed to see or do. Often if we don't know who the user is, they are not allowed to see anything other than a basic landing page.

## Authenticating users

Even in the simplest cases, there are usually several components to authentication. For password-based authentication, these are Signup, Login, and Password Reset.

### Signup

During Signup, the user submits a password for the first time along with a unique identifier, usually a username or email address. The authentication service then scrambles the password using an irreversible process called hashing, and stores this hashed version of the password rather than the password itself. This way if the database is compromised, the password still cannot be seen.

### Login

In a subsequent Login, the user submits their password and identifier again. The authentication service then hashes the incoming password using the same algorithm it did the first time, and compares the hashed password with the version that was previously stored. If the hashed values match and the identifier matches, then the user is authenticated successfully.

### Password reset

Password Reset is usually done by sending a link to the user's email address that allows the user to set a new password. This is essentially pushing the authentication burden onto the user's email provider, with the theory being: if the user knows the password for their email service, then they are who they say they are.

:::tip
Add Signup, Login, and Password Reset forms easily with [Userfront's](https://userfront.com) auth toolkit.
:::

## Single-factor Authentication

Single-factor Authentication, or authentication using only 1 method, is the most common type of authentication.

Whenever a website uses a password in combination with email or username, without any additional steps, it is using single-factor authentication.

## Multi-factor Authentication

Sometimes we want a service to be more secure than only a password, in which case we can add additional ways of authenticating the user. When we authenticate a user with multiple different approaches, it is called multi-factor authentication, or MFA.

Usually, multi-factor authentication will use two forms of authentication, in which case it can also be called two-factor authentication, or 2FA.

In the most common scenarios, the user enters their password and username or email, and then the user is required to enter a temporary code from a text message or authenticator app. This ensures that a hacker who has obtained only the password would still be unable to access the account.
