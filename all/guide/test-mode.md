# Test mode

:::::row
::::left

By default, your new Userfront account is in test mode. This allows you to experiment and develop locally without affecting your live data.

Test mode is used automatically for any domains that are not secure or that are not added to your list of live domains.

Example test domains include:

- localhost:3000
- 192.168.1.10
- **http://** example.com

::::
::::right

:::card

#### Disabling test mode

To enable live mode, select `Activate your account` in the Userfront dashboard.

**Your domain must be served with `https` to be considered live.**

:::
::::
:::::

## Working in test mode

:::::row
::::left

Your account is first created with 4 test users, each with an initial password set to `testmodepassword`.

You can log in with these users to test your application or you can sign up new users. Your initial users behave the same as any other user who signs up.

When in test mode, Userfront does not send welcome or confirmation emails.

Anywhere an email would have been sent to a user, that information is displayed directly in the browser instead.
::::
::::right

Your initial test users:

| Username    | Email                   | Password         |
| :---------- | :---------------------- | :--------------- |
| admin       | admin@example.com       | testmodepassword |
| member      | member@example.com      | testmodepassword |
| viewer      | viewer@example.com      | testmodepassword |
| unconfirmed | unconfirmed@example.com | testmodepassword |

Example: you could use `admin` for the username and `testmodepassword` for the password, and your login form will log you in as the Admin User above.

::::
:::::

## Disabling test mode

:::::row
::::left

To disable test mode and activate live mode, click the link that says `Activate your account` in your Userfront dashboard.

Add your domain to the "Live domains" section. Any Toolkit forms or requests from this domain will be in live mode.

Domains are matched at the top level, unless a subdomain is specified:

| Domain          | Matches                             |
| :-------------- | :---------------------------------- |
| example.com     | example.com and all subdomains      |
| sub.example.com | sub.example.com but not example.com |

Now whenever your auth tools appear on your live website, they will be in live mode automatically.

::::
::::right

:::warning
Your domain must be served with `https` to be considered live.
:::
::::
:::::
