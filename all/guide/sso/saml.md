# SAML

::::: row
:::: left

SAML is another form of SSO that works by having two parties:

- An **identity provider** (**IdP**, e.g. Userfront)
- A **service provider** (**SP**, e.g. Notion)

The providers use the user's browser as the vehicle to send authentication requests and responses back and forth to each other.

SAML is most commonly used by organizations to grant user access to third party resources (e.g. a team document in Notion).

::::

:::: right
::: tip NOTE
In setting up SAML you will see the acronyms **IdP** and **SP** often.
For the remainder of this guide we will be using the references below:

| Term | Reference         | Entity                           |
| ---- | ----------------- | -------------------------------- |
| IdP  | Identity provider | Userfront                        |
| SP   | Service provider  | Notion, GitLab, Freshworks, etc. |

:::
::::
:::::

## Overview

::::: row
:::: left

The process to set up SAML uses the following steps:

1. Create an account with a third party service provider.

   - [Set up your service provider](#set-up-your-service-provider)

2. Map your service provider information to Userfront IdP with one of the following options:

   a. [Create service provider with entity ID](#create-service-provider-with-entity-id) (quick)
   <br>b. [Create service provider with metadata](#create-service-provider-with-metadata) (detailed)

3. Map your Userfront IdP information to your service provider.

   - [Map identity provider to service provider](#map-identity-provider-information-to-service-provider)

::::
:::::

## Set up your service provider

:::: row
::: left

First, you will need to visit the service provider's website, create an account, and locate the SAML settings. Beware of the descrepancy between SSO "with social platforms" vs. SSO "with SAML" when setting up.

:::
::::

## Create service provider with entity ID

::::: row
:::: left

The general process for setting up SAML with Userfront as the identity provider is similar for any service provider you might be using:

1. [Locate your entity ID](#locate-your-entity-id)
2. [Add your service provider to Userfront](#add-your-service-provider-to-userfront)

::::
:::::

### Locate your entity ID

::::: row
:::: left

Your service provider will provide your entity ID in the SAML settings. The entity ID will be required to set up your service provider to Userfront.

The entity ID is a globally unique name for your service provider, which is why it is commonly seen as an ordinary URL with your organization name or as the service provider's metadata URL:

- `https://gitlab.com/groups/exampleorg`
- `https://exampleorg.myfreshworks.com/sp/SAML/1234/metadata`

::::
:::: right
::: card

#### Example: Freshworks SP settings

![Locate entity ID](https://res.cloudinary.com/component/image/upload/v1640903372/guide/1_-_Locate_entity_ID.png)

:::

<br>

::: tip
Terminology for the **entity ID** among service providers may vary; it may be referred to as **Identifier**, **Issuer**, or **Relying party trust identifier** depending on the service provider.
:::

::::
:::::

### Add your service provider to Userfront

::::: row
:::: left

Visit the Userfront dashboard **Single Sign-On** page, then select the **SAML** tab, then click the **Create service provider** button. This will open the form as seen in the image to the right.

Enter a name to remember it by and the entity ID in the field provided, then click the **Create** button.

::::
:::: right
![Create service provider](https://res.cloudinary.com/component/image/upload/v1640903372/guide/2_-_Create_service_provider-2.png)
::::
::::
:::::

::::: row
:::: left

Now you should now see your newly created service provider as seen in the image to the right.

Follow the steps in [Map identity provider information to service provider](#map-identity-provider-information-to-service-provider) to establish the connection between your service provider and identity provider.

::::
:::: right
![Created service provider](https://res.cloudinary.com/component/image/upload/v1640903372/guide/3_-_Created_service_provider.png)

::: warning NOTE
In the event the service provider could not be created, please check your entity ID with your SP's metadata XML and follow the more detailed steps in [Create service provider with metadata](#create-service-provider-with-metadata).
:::

::::
:::::

## Create service provider with metadata

:::: row
::: left

This section walks through how to set up your service provider using metadata:

1. [Locate your service provider metadata](#locate-your-service-provider-metadata)
2. [Locate metadata attributes](#locate-metadata-attributes)
3. [Upload metadata](#upload-metadata)

:::
::::

### Locate your service provider metadata

::::: row
:::: left

Your service provider will provide your metadata in the SAML settings. The metadata is a public XML file that is made available for use by the identity provider.

The metadata is usually found in one of the following formats:

- URL
  `https://gitlab.com/users/auth/group_saml/metadata?group_path=exampleorg&token=abcd1234`

- "Download" link or button

::::
:::: right
::: card

#### Example: Freshworks SP download metadata

![Locate metadata](https://res.cloudinary.com/component/image/upload/v1640903372/guide/4_-_Locate_metadata.png)

:::
::::
:::::

::::: row
:::: left

The metadata XML contents are needed in the next step in order to locate the following attributes:

- `entityID`
- `AssertionConsumerService` - `Location`

::::
:::: right
::: card

#### Example: GitLab SP metadata

![Locate attributes](https://res.cloudinary.com/component/image/upload/v1640903372/guide/5_-_Locate_attributes.png)

:::

::: tip
Either download your metadata XML file or have the metadata XML available to copy-paste; it will be needed in order to upload in the Userfront dashboard.
:::

::::
:::::

### Locate metadata attributes

:::: row
::: left

Next, locate the following attributes in the metadata XML:

1. `entityID`
2. `AssertionConsumerService` - `Location`

:::
::::

::::: row
:::: left

#### 1. `entityID`

The `entityID` is the globally unique ID for your service provider. It can be found on the first line of the metadata XML inside the `EntityDescriptor` attribute.

::::
:::: right
::: card

#### Example: GitLab SP `entityID`

![Locate entity ID](https://res.cloudinary.com/component/image/upload/v1640903372/guide/6_-_Locate_entity_ID.png)

:::
::::
:::::

::::: row
:::: left

#### 2. `AssertionConsumerService` - `Location`

This is a URL that Userfront will use to complete the SAML signon process and is known as the Assertion Consumer Service URL (ACS URL).

The ACS URL is the value of the `Location` attribute inside the `AssertionConsumerService` element.

The ACS URL can be found by following the XML tree elements:
`EntityDescriptor` → `SPSSODescriptor` → `AssertionConsumerService`

```xml
<!-- SP metadata XML simplified tree example -->
<md:EntityDescriptor>
  <md:SPSSODescriptor>
    <md:AssertionConsumerService
      Location="https://gitlab.com/groups/exampleorg/-/saml/callback"
      Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"
      isDefault="true"
      index="0" />
```

::::
:::: right
::: card

#### Example: GitLab SP ACS URL

![Locate ACS URL](https://res.cloudinary.com/component/image/upload/v1640903373/guide/7_-_Locate_ACS_URL.png)

:::
::::
:::::

### Upload metadata

::::: row
:::: left

Visit the Userfront dashboard **Single Sign-On** page, then select the **SAML** tab, then click the **Create service provider** button. This will open the form as seen in the image to the right.

1. Enter a name to remember it by
2. Enter the entity ID
3. Enter the ACS URL
4. Upload the metadata XML with an option below:
   <br>a. Select the file from your computer
   <br>b. Copy-paste the file contents in the text area
5. Click the **Create** button.

::::
:::: right
![Upload metadata](https://res.cloudinary.com/component/image/upload/v1640903372/guide/8_-_Upload_metadata.png)

::: tip
The ACS URL will be auto-populated upon submission if there are no validation errors in the uploaded XML.
:::

::::
:::::

## Map identity provider information to service provider

:::: row
::: left

The service provider will require some information from the identity provider in order to verify the responses Userfront will send.

Service providers require the following IdP information:

- Entity ID
- Login URL
- X.509 public certificate (or fingerprint)

Service providers have different requirements; these may or may not be used by your service provider or may be optional:

- Logout URL
- SHA-1 fingerprint
- SHA-256 fingerprint

:::
::::

::::: row
:::: left

### Locate your IdP information

Visit the Userfront dashboard **Single Sign-On** page, then select the **SAML** tab, then scroll down to **Your identity provider (IdP) information** as seen in the image to the right.

1. Copy-paste the values that your service provider requires.
2. Visit the SSO URL (or "single sign-on URL") your service provider provides in order to log in with SAML.

   Upon visiting the SSO URL your browser will follow a series of redirects, and upon successful login, will be redirected back to the service provider.

::::

:::: right
![Your IdP information](https://res.cloudinary.com/component/image/upload/v1640903373/guide/9_-_Your_IdP_information.png)

::::
:::::
