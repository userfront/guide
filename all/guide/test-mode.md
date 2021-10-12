# Test mode

:::::row
::::left

By default, your Userfront account is in test mode.

Test mode allows you to experiment and develop locally without affecting your live data.

::::
::::right

::::
:::::

## Why is my form in test mode?

::::: row
:::: left

If your page is not secured with `https`, or if the domain you are using is not on your list of live domains, your forms will be in test mode.

Example test domains include:

- **http://** example.com
- localhost:3000
- 192.168.1.10

To work with live data, follow the steps to [activate live mode](#activate-live-mode).

::::
:::: right

| Reason            | Explanation                                                                                                                             |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| Test mode: http   | Your page is served over `http`, which is insecure. This is OK for local development but not for production.                            |
| Test mode: domain | The domain or subdomain has not been added to your account's live domains. Add the domain to [activate live mode](#activate-live-mode). |

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

## Activate live mode

:::::row
::::left

To activate live mode, click the link that says `Activate your account` in your Userfront dashboard.

Add your domain to the "Live domains" section.

Once you have done this, any Toolkit forms or requests from this domain will be in live mode.

::::
:::: right

| Live domain     | Pages that will be in live mode                                |
| :-------------- | :------------------------------------------------------------- |
| example.com     | example.com and all subdomains                                 |
| sub.example.com | sub.example.com, another.sub.example.com (but not example.com) |

Domains are matched at the top level, unless a subdomain is specified.
::::
:::::
