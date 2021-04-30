# Import or export users

Userfront allows you to import users that you already have in your own database, or to export users from the Userfront database for use elsewhere.

## Importing users

To import users into your Userfront account, you can upload a CSV (comma-separated values) file with information about the users you want to import.

### Format

Users should be saved in CSV format, with a header row denoting what each column represents. One of these columns must be `id` or `userId`, corresponding to the `userId` within Userfront.

Whenever a `userId` is not already in your account, a user will be created in your account based on the information in the CSV. If an existing user in your account has the `userId` given, then the user in your account will be updated based on the information in the CSV.

:::tip
At a minimum, the header row must contain a column for `id` or `userId`. This value is used to identify the user.
:::

### How to import

Once you have your CSV, navigate to your account's settings page. Locate the section titled "Import users", then select your file and upload it.

![Import users](https://res.cloudinary.com/component/image/upload/v1587745634/permanent/import-users.png)

Depending on file size and number of users, your file will take some time to process. Userfront will email you when the import is complete.

## Exporting users

You can export your account users to CSV for use in other systems. To do this, navigate to your account's Settings page. Locate the section titled "Export your users to a CSV file", and click the button.

Your users will be downloaded in CSV format.

![Export users](https://res.cloudinary.com/component/image/upload/v1587748201/permanent/export-users.png)
