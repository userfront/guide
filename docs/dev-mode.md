# Dev mode

By default, your auth tools work in dev mode. This means they do not create or use your "real" users.

Dev mode always uses these users:

| ID  | Name        | Username    | Email                   | Password  |
| :-- | :---------- | :---------- | ----------------------- | :-------- |
| 1   | Admin User  | admin       | admin@example.com       | password1 |
| 2   | Member User | member      | member@example.com      | password1 |
| 3   | Viewer User | viewer      | viewer@example.com      | password1 |
| 4   | Unconfirmed | unconfirmed | unconfirmed@example.com | password1 |

When in dev mode, Userfront does not send welcome or confirmation emails. Instead, relevant information is displayed on screen to the user directly.

## Login

When in dev mode, the login form allows any of the above users to log in.

For example, you could use `member` for the username and `password1` for the password, and your login form will log you in as the Member User above.

## Signup

When in dev mode, you can enter any information you want into the signup form.

The signup form will always continue as though you signed up with the Unconfirmed user listed above.

## Getting out of dev mode

You can add your live domain so that your Toolkit will automatically work in live mode on your live site.

Visit the `Settings` section of the Userfront dashboard.

![Userfront settings](https://res.cloudinary.com/component/image/upload/v1593131793/permanent/settings-nav.png)

Add your domain to the "Live domains" section. Domains are matched at the top level, unless a subdomain is specified:

| Domain          | Matches                             |
| :-------------- | :---------------------------------- |
| example.com     | example.com and all subdomains      |
| sub.example.com | sub.example.com but not example.com |

Now whenever your auth tools appear on your live website, they will be in live mode automatically.

:::tip
Your domain must be served with `https` to be considered live.
:::
