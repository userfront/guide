(window.webpackJsonp=window.webpackJsonp||[]).push([[72],{649:function(t,e,a){"use strict";a.r(e);var r=a(39),s=Object(r.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"saml"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#saml"}},[t._v("#")]),t._v(" SAML")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("p",[t._v("SAML is another form of SSO that works by having two parties:")]),t._v(" "),a("ul",[a("li",[t._v("An "),a("strong",[t._v("identity provider")]),t._v(" ("),a("strong",[t._v("IdP")]),t._v(", e.g. Userfront)")]),t._v(" "),a("li",[t._v("A "),a("strong",[t._v("service provider")]),t._v(" ("),a("strong",[t._v("SP")]),t._v(", e.g. Notion)")])]),t._v(" "),a("p",[t._v("The providers use the user's browser as the vehicle to send authentication requests and responses back and forth to each other.")]),t._v(" "),a("p",[t._v("SAML is most commonly used by organizations to grant user access to third party resources (e.g. a team document in Notion).")])]),t._v(" "),a("div",{staticClass:"right"},[a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("NOTE")]),t._v(" "),a("p",[t._v("In setting up SAML you will see the acronyms "),a("strong",[t._v("IdP")]),t._v(" and "),a("strong",[t._v("SP")]),t._v(" often.\nFor the remainder of this guide we will be using the references below:")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Term")]),t._v(" "),a("th",[t._v("Reference")]),t._v(" "),a("th",[t._v("Entity")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("IdP")]),t._v(" "),a("td",[t._v("Identity provider")]),t._v(" "),a("td",[t._v("Userfront")])]),t._v(" "),a("tr",[a("td",[t._v("SP")]),t._v(" "),a("td",[t._v("Service provider")]),t._v(" "),a("td",[t._v("Notion, GitLab, Freshworks, etc.")])])])])])])]),t._v(" "),a("h2",{attrs:{id:"overview"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[t._v("#")]),t._v(" Overview")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("p",[t._v("The process to set up SAML uses the following steps:")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("Create an account with a third party service provider.")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"#set-up-your-service-provider"}},[t._v("Set up your service provider")])])])]),t._v(" "),a("li",[a("p",[t._v("Map your service provider information to Userfront IdP with one of the following options:")]),t._v(" "),a("p",[t._v("a. "),a("a",{attrs:{href:"#create-service-provider-with-entity-id"}},[t._v("Create service provider with entity ID")]),t._v(" (quick)\n"),a("br"),t._v("b. "),a("a",{attrs:{href:"#create-service-provider-with-metadata"}},[t._v("Create service provider with metadata")]),t._v(" (detailed)")])]),t._v(" "),a("li",[a("p",[t._v("Map your Userfront IdP information to your service provider.")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"#map-identity-provider-information-to-service-provider"}},[t._v("Map identity provider to service provider")])])])])])])]),t._v(" "),a("h2",{attrs:{id:"set-up-your-service-provider"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#set-up-your-service-provider"}},[t._v("#")]),t._v(" Set up your service provider")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("p",[t._v('First, you will need to visit the service provider\'s website, create an account, and locate the SAML settings. Beware of the descrepancy between SSO "with social platforms" vs. SSO "with SAML" when setting up.')])])]),t._v(" "),a("h2",{attrs:{id:"create-service-provider-with-entity-id"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#create-service-provider-with-entity-id"}},[t._v("#")]),t._v(" Create service provider with entity ID")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("p",[t._v("The general process for setting up SAML with Userfront as the identity provider is similar for any service provider you might be using:")]),t._v(" "),a("ol",[a("li",[a("a",{attrs:{href:"#locate-your-entity-id"}},[t._v("Locate your entity ID")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#add-your-service-provider-to-userfront"}},[t._v("Add your service provider to Userfront")])])])])]),t._v(" "),a("h3",{attrs:{id:"locate-your-entity-id"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#locate-your-entity-id"}},[t._v("#")]),t._v(" Locate your entity ID")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("p",[t._v("Your service provider will provide your entity ID in the SAML settings. The entity ID will be required to set up your service provider to Userfront.")]),t._v(" "),a("p",[t._v("The entity ID is a globally unique name for your service provider, which is why it is commonly seen as an ordinary URL with your organization name or as the service provider's metadata URL:")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("https://gitlab.com/groups/exampleorg")])]),t._v(" "),a("li",[a("code",[t._v("https://exampleorg.myfreshworks.com/sp/SAML/1234/metadata")])])])]),t._v(" "),a("div",{staticClass:"right"},[a("div",{staticClass:"card"},[a("h4",{attrs:{id:"example-freshworks-sp-settings"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#example-freshworks-sp-settings"}},[t._v("#")]),t._v(" Example: Freshworks SP settings")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://res.cloudinary.com/component/image/upload/v1640903372/guide/1_-_Locate_entity_ID.png",alt:"Locate entity ID"}})])]),t._v(" "),a("br"),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("Terminology for the "),a("strong",[t._v("entity ID")]),t._v(" among service providers may vary; it may be referred to as "),a("strong",[t._v("Identifier")]),t._v(", "),a("strong",[t._v("Issuer")]),t._v(", or "),a("strong",[t._v("Relying party trust identifier")]),t._v(" depending on the service provider.")])])])]),t._v(" "),a("h3",{attrs:{id:"add-your-service-provider-to-userfront"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#add-your-service-provider-to-userfront"}},[t._v("#")]),t._v(" Add your service provider to Userfront")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("p",[t._v("Visit the Userfront dashboard "),a("strong",[t._v("Single Sign-On")]),t._v(" page, then select the "),a("strong",[t._v("SAML")]),t._v(" tab, then click the "),a("strong",[t._v("Create service provider")]),t._v(" button. This will open the form as seen in the image to the right.")]),t._v(" "),a("p",[t._v("Enter a name to remember it by and the entity ID in the field provided, then click the "),a("strong",[t._v("Create")]),t._v(" button.")])]),t._v(" "),a("div",{staticClass:"right"},[a("p",[a("img",{attrs:{src:"https://res.cloudinary.com/component/image/upload/v1640903372/guide/2_-_Create_service_provider-2.png",alt:"Create service provider"}})])]),t._v(" "),a("p",[t._v("::::")])]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("p",[t._v("Now you should now see your newly created service provider as seen in the image to the right.")]),t._v(" "),a("p",[t._v("Follow the steps in "),a("a",{attrs:{href:"#map-identity-provider-information-to-service-provider"}},[t._v("Map identity provider information to service provider")]),t._v(" to establish the connection between your service provider and identity provider.")])]),t._v(" "),a("div",{staticClass:"right"},[a("p",[a("img",{attrs:{src:"https://res.cloudinary.com/component/image/upload/v1640903372/guide/3_-_Created_service_provider.png",alt:"Created service provider"}})]),t._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[t._v("NOTE")]),t._v(" "),a("p",[t._v("In the event the service provider could not be created, please check your entity ID with your SP's metadata XML and follow the more detailed steps in "),a("a",{attrs:{href:"#create-service-provider-with-metadata"}},[t._v("Create service provider with metadata")]),t._v(".")])])])]),t._v(" "),a("h2",{attrs:{id:"create-service-provider-with-metadata"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#create-service-provider-with-metadata"}},[t._v("#")]),t._v(" Create service provider with metadata")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("p",[t._v("This section walks through how to set up your service provider using metadata:")]),t._v(" "),a("ol",[a("li",[a("a",{attrs:{href:"#locate-your-service-provider-metadata"}},[t._v("Locate your service provider metadata")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#locate-metadata-attributes"}},[t._v("Locate metadata attributes")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#upload-metadata"}},[t._v("Upload metadata")])])])])]),t._v(" "),a("h3",{attrs:{id:"locate-your-service-provider-metadata"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#locate-your-service-provider-metadata"}},[t._v("#")]),t._v(" Locate your service provider metadata")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("p",[t._v("Your service provider will provide your metadata in the SAML settings. The metadata is a public XML file that is made available for use by the identity provider.")]),t._v(" "),a("p",[t._v("The metadata is usually found in one of the following formats:")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("URL\n"),a("code",[t._v("https://gitlab.com/users/auth/group_saml/metadata?group_path=exampleorg&token=abcd1234")])])]),t._v(" "),a("li",[a("p",[t._v('"Download" link or button')])])])]),t._v(" "),a("div",{staticClass:"right"},[a("div",{staticClass:"card"},[a("h4",{attrs:{id:"example-freshworks-sp-download-metadata"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#example-freshworks-sp-download-metadata"}},[t._v("#")]),t._v(" Example: Freshworks SP download metadata")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://res.cloudinary.com/component/image/upload/v1640903372/guide/4_-_Locate_metadata.png",alt:"Locate metadata"}})])])])]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("p",[t._v("The metadata XML contents are needed in the next step in order to locate the following attributes:")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("entityID")])]),t._v(" "),a("li",[a("code",[t._v("AssertionConsumerService")]),t._v(" - "),a("code",[t._v("Location")])])])]),t._v(" "),a("div",{staticClass:"right"},[a("div",{staticClass:"card"},[a("h4",{attrs:{id:"example-gitlab-sp-metadata"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#example-gitlab-sp-metadata"}},[t._v("#")]),t._v(" Example: GitLab SP metadata")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://res.cloudinary.com/component/image/upload/v1640903372/guide/5_-_Locate_attributes.png",alt:"Locate attributes"}})])]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("Either download your metadata XML file or have the metadata XML available to copy-paste; it will be needed in order to upload in the Userfront dashboard.")])])])]),t._v(" "),a("h3",{attrs:{id:"locate-metadata-attributes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#locate-metadata-attributes"}},[t._v("#")]),t._v(" Locate metadata attributes")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("p",[t._v("Next, locate the following attributes in the metadata XML:")]),t._v(" "),a("ol",[a("li",[a("code",[t._v("entityID")])]),t._v(" "),a("li",[a("code",[t._v("AssertionConsumerService")]),t._v(" - "),a("code",[t._v("Location")])])])])]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("h4",{attrs:{id:"_1-entityid"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-entityid"}},[t._v("#")]),t._v(" 1. "),a("code",[t._v("entityID")])]),t._v(" "),a("p",[t._v("The "),a("code",[t._v("entityID")]),t._v(" is the globally unique ID for your service provider. It can be found on the first line of the metadata XML inside the "),a("code",[t._v("EntityDescriptor")]),t._v(" attribute.")])]),t._v(" "),a("div",{staticClass:"right"},[a("div",{staticClass:"card"},[a("h4",{attrs:{id:"example-gitlab-sp-entityid"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#example-gitlab-sp-entityid"}},[t._v("#")]),t._v(" Example: GitLab SP "),a("code",[t._v("entityID")])]),t._v(" "),a("p",[a("img",{attrs:{src:"https://res.cloudinary.com/component/image/upload/v1640903372/guide/6_-_Locate_entity_ID.png",alt:"Locate entity ID"}})])])])]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("h4",{attrs:{id:"_2-assertionconsumerservice-location"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-assertionconsumerservice-location"}},[t._v("#")]),t._v(" 2. "),a("code",[t._v("AssertionConsumerService")]),t._v(" - "),a("code",[t._v("Location")])]),t._v(" "),a("p",[t._v("This is a URL that Userfront will use to complete the SAML signon process and is known as the Assertion Consumer Service URL (ACS URL).")]),t._v(" "),a("p",[t._v("The ACS URL is the value of the "),a("code",[t._v("Location")]),t._v(" attribute inside the "),a("code",[t._v("AssertionConsumerService")]),t._v(" element.")]),t._v(" "),a("p",[t._v("The ACS URL can be found by following the XML tree elements:\n"),a("code",[t._v("EntityDescriptor")]),t._v(" → "),a("code",[t._v("SPSSODescriptor")]),t._v(" → "),a("code",[t._v("AssertionConsumerService")])]),t._v(" "),a("div",{staticClass:"language-xml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-xml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- SP metadata XML simplified tree example --\x3e")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("md:")]),t._v("EntityDescriptor")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("md:")]),t._v("SPSSODescriptor")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("md:")]),t._v("AssertionConsumerService")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("Location")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("https://gitlab.com/groups/exampleorg/-/saml/callback"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("Binding")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("isDefault")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("true"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("index")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("0"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n")])])])]),t._v(" "),a("div",{staticClass:"right"},[a("div",{staticClass:"card"},[a("h4",{attrs:{id:"example-gitlab-sp-acs-url"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#example-gitlab-sp-acs-url"}},[t._v("#")]),t._v(" Example: GitLab SP ACS URL")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://res.cloudinary.com/component/image/upload/v1640903373/guide/7_-_Locate_ACS_URL.png",alt:"Locate ACS URL"}})])])])]),t._v(" "),a("h3",{attrs:{id:"upload-metadata"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#upload-metadata"}},[t._v("#")]),t._v(" Upload metadata")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("p",[t._v("Visit the Userfront dashboard "),a("strong",[t._v("Single Sign-On")]),t._v(" page, then select the "),a("strong",[t._v("SAML")]),t._v(" tab, then click the "),a("strong",[t._v("Create service provider")]),t._v(" button. This will open the form as seen in the image to the right.")]),t._v(" "),a("ol",[a("li",[t._v("Enter a name to remember it by")]),t._v(" "),a("li",[t._v("Enter the entity ID")]),t._v(" "),a("li",[t._v("Enter the ACS URL")]),t._v(" "),a("li",[t._v("Upload the metadata XML with an option below:\n"),a("br"),t._v("a. Select the file from your computer\n"),a("br"),t._v("b. Copy-paste the file contents in the text area")]),t._v(" "),a("li",[t._v("Click the "),a("strong",[t._v("Create")]),t._v(" button.")])])]),t._v(" "),a("div",{staticClass:"right"},[a("p",[a("img",{attrs:{src:"https://res.cloudinary.com/component/image/upload/v1640903372/guide/8_-_Upload_metadata.png",alt:"Upload metadata"}})]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("The ACS URL will be auto-populated upon submission if there are no validation errors in the uploaded XML.")])])])]),t._v(" "),a("h2",{attrs:{id:"map-identity-provider-information-to-service-provider"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#map-identity-provider-information-to-service-provider"}},[t._v("#")]),t._v(" Map identity provider information to service provider")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("p",[t._v("The service provider will require some information from the identity provider in order to verify the responses Userfront will send.")]),t._v(" "),a("p",[t._v("Service providers require the following IdP information:")]),t._v(" "),a("ul",[a("li",[t._v("Entity ID")]),t._v(" "),a("li",[t._v("Login URL")]),t._v(" "),a("li",[t._v("X.509 public certificate (or fingerprint)")])]),t._v(" "),a("p",[t._v("Service providers have different requirements; these may or may not be used by your service provider or may be optional:")]),t._v(" "),a("ul",[a("li",[t._v("Logout URL")]),t._v(" "),a("li",[t._v("SHA-1 fingerprint")]),t._v(" "),a("li",[t._v("SHA-256 fingerprint")])])])]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("h3",{attrs:{id:"locate-your-idp-information"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#locate-your-idp-information"}},[t._v("#")]),t._v(" Locate your IdP information")]),t._v(" "),a("p",[t._v("Visit the Userfront dashboard "),a("strong",[t._v("Single Sign-On")]),t._v(" page, then select the "),a("strong",[t._v("SAML")]),t._v(" tab, then scroll down to "),a("strong",[t._v("Your identity provider (IdP) information")]),t._v(" as seen in the image to the right.")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("Copy-paste the values that your service provider requires.")])]),t._v(" "),a("li",[a("p",[t._v('Visit the SSO URL (or "single sign-on URL") your service provider provides in order to log in with SAML.')]),t._v(" "),a("p",[t._v("Upon visiting the SSO URL your browser will follow a series of redirects, and upon successful login, will be redirected back to the service provider.")])])])]),t._v(" "),a("div",{staticClass:"right"},[a("p",[a("img",{attrs:{src:"https://res.cloudinary.com/component/image/upload/v1640903373/guide/9_-_Your_IdP_information.png",alt:"Your IdP information"}})])])])])}),[],!1,null,null,null);e.default=s.exports}}]);