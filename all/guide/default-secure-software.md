# Default-Secure Software (DSS)

:::::row
:::: left

**Default-Secure Software**, sometimes abbreviated DSS, is a software approach that prevents security flaws now and in the future.

The philosophy of Default-Secure Software is to create systems in which the party responsible for security can update software, protocols, and configurations as needed in order to maintain ongoing security standards, with no action required by downstream developers or users.

**From a downstream user's perspective, the software should simply "stay secure".**

::::
:::::

## Principles of Default-Secure Software

### 1. Security should update automatically

In Default-Secure Software, updates are pushed by the party responsible for security.

Any downstream entity, whether a software developer or end user, should not have to take any action to receive security updates.

In particular, developers relying on Default-Secure Software should not need to run any update commands or incorporate security updates into their workflow in any way. The degree to which this is possible in a given system is the degree to which the system is default-secure.

Some ecosystems may require that the end user approve of security updates before they are applied. These ecosystems are not considered default-secure, but a software supplier within such an ecosystem can still adopt Default-Secure Software practices up to that point in order to improve overall security.

### 2. The software provider should be explicit about their domain

It is typically not possible for a single provider to guarantee security at every level of a system. In these cases, a provider should explicitly state under what use cases it can provide Default-Secure Software.

For example, a provider of internet-connected software may state that it offers Default-Secure Software given the downstream network is secured with TLS and the end user uses a supported browser.

Whenever Default-Secure Software does rely on a given set of external criteria, DSS best practice is to detect and refuse use cases where the requirements are not met.

### 3. Updates should always incorporate the latest security practices

Default-Secure Software providers should always consider new threats as they emerge and should include relevant security updates in a timely manner.

Once a provider has stated explicitly the domain for which they provide DSS (#2 above), the provider is responsible for any newly discovered security threats within their domain.

- Encryption
- Storage
- Browser

### 4. Configurations should have clear, well-defined descriptions

- Should not use abbreviations or jargon in configuration settings
  - E.g. do not use "JWT" if "access token" is more appropriate
- An intelligent non-expert should be able to understand the configuration

### 4. Systems should be configured for base level access by default

- User identity only
- Should either prevent access, or keep a record of access, by default
- Roles and permissions should be added explicitly
- "Guest" access should be added explicitly
