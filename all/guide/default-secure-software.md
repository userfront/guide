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

Some ecosystems may require that the end user approve of security updates before the updates are applied. These ecosystems are not considered default-secure, but a software supplier within such an ecosystem can still adopt Default-Secure Software practices up to that point in order to improve overall security.

### 2. The software provider should be explicit about their domain

It is typically not possible for a single provider to guarantee security at every level of a system. In these cases, a provider should explicitly state under what use cases it can provide Default-Secure Software.

For example, a provider of internet-connected software may state that it offers Default-Secure Software given the downstream network is secured with TLS and the end user uses a supported browser.

Whenever Default-Secure Software does rely on a given set of external criteria, DSS best practice is to detect and refuse use cases where the requirements are not met.

### 3. Updates should always incorporate the latest security practices

Default-Secure Software providers should always consider new threats as they emerge and should include relevant security updates in a timely manner.

Once a provider has stated explicitly the domain for which they provide DSS (#2 above), the provider is responsible for any newly discovered security threats within their domain.

It is incumbent upon the provider to proactively research and determine when new security threats have emerged, to patch or otherwise mitigate these threats as soon as the provider is able, and to push these updates downstream automatically as soon as the updates are ready.

### 4. Configurations should have clear, well-defined descriptions

In Default-Secure Software, the provider is considered to be an expert in the domain at hand, while all downstream developers and users are considered to be non-experts.

For this reason, all configurations available to downstream developers or users should be sufficiently descriptive that an intelligent non-expert is able to understand the security implications for any given configuration.

The provider should include instructions with all configurations and should take care to avoid abbreviations, jargon, or other expert-focused references.

In this manner, downstream developers and users can make informed decisions about how the software will behave.

### 5. Systems should be configured for security by default

For any configurations available to downstream developers or users, Default-Secure Software should be designed to provide maximum security by default.

The system should begin at its most secure usable level, and, if desired, include configuration settings that downstream users can change to increase access.

For systems that cannot prevent access by default, Default-Secure Software should keep a record of access by default.

For systems that include access controls, downstream users should grant access to resources explicitly.
