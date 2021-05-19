# General Data Protection Regulation (GDPR)

## What is GDPR?

The General Data Protection Regulation (“GDPR”) is a new, EU-wide privacy and data protection law. It calls for more granular privacy guardrails in an organization’s systems, more nuanced data protection agreements, and more consumer-friendly and detailed disclosures about an organization’s privacy and data protection practices.

The GDPR replaces the EU’s current data protection legal framework from 1995 (commonly known as the “Data Protection Directive”). The Data Protection Directive required transposition into EU Member national law, which led to a fragmented EU data protection law landscape. The GDPR is an EU regulation that has direct legal effect in all EU Member States, i.e., it does not need to be transposed into an EU Member States’ national law in order to become binding. This will enhance consistency and harmonious application of the law in the EU.

## Key concepts: data controllers and data processors

In EU data protection law, there are two types of entities that can process personal data — the data controller and the data processor.

The data controller (“controller”) is the entity which, alone or jointly with others, determines the purposes and means of the processing of personal data. The data processor (“processor”) is the entity which processes personal data on behalf of the controller.

It is important to determine whether the entity processing personal data for each data processing activity is a controller or a processor. This mapping exercise enables an organization to understand what rights and obligations attach to each of its data processing operations.

Stripe has certain data processing activities for which it acts as a data controller, and others for which it acts as a data processor. A good illustration of this dual role is when Stripe processes credit card transactions. Facilitating a transaction requires the processing of personal data, such as the cardholder’s name, credit card number, the credit card expiry date, and CVC code. The cardholder’s data is sent from the Stripe user to Stripe via the Stripe API (or by some other integration method, such as Stripe Elements). Stripe then uses the data to complete the transaction within the systems of the credit card networks, which is a function that Stripe performs as a data processor. However, Stripe also uses the data to comply with its regulatory obligations (such as Know Your Customer (“KYC”) and Anti Money Laundering (“AML”), and in this role Stripe is a data controller.

## Legal basis for processing personal data in the GDPR

The next consideration is to determine whether or not a particular processing activity is GDPR-compliant. Under the GDPR, every data processing activity, performed as a controller or processor, needs to rely on a legal basis. The GDPR recognizes a total of six legal bases for processing EU individuals’ personal data (in the GDPR, EU individuals are referred to as “data subjects”). Those six legal bases, in the order of Art. 6 (1) (a) to (f) GDPR, are:

1. The data subject has given consent to the processing of his or her personal data for one or more specific purposes;

2. The processing is necessary for the performance of a contract to which the data subject is a party or in order to take steps at the request of the data subject prior to entering into a contract;

3. The processing is necessary for the compliance with a legal obligation to which the controller is subject;

4. The processing is necessary to protect a vital interest of the data subject;

5. The data processing is necessary for the performance of a task carried out in the public interest or in the exercise of official authority; or

6. The processing is necessary for the legitimate interests pursued by the entity, except where such interests are overridden by the interests or fundamental rights and freedoms of the data subject which require personal data protection.

The GDPR consent requirements (item 1 above) include elements such as (i) the requirement that consent be verifiable, (ii) the request for consent must be clearly distinguishable from other matters, and (iii) the data subjects must be informed of their right to withdraw consent. It is also important to be mindful that an even higher consent requirement (“explicit consent”) is imposed with respect to the processing of sensitive data.

## Individuals’ rights under the GDPR

Under the Data Protection Directive, individuals were guaranteed certain basic rights with regard to their personal data. Individuals’ rights continue to apply under the GDPR, subject to some clarifying amendments. The below chart compares individuals’ rights under the Data Protection Directive and the GDPR.

### Data subject access request

Individuals have the right to know whether their personal data are being processed, what and how personal data about them is being processed, and what the data processing operations are. When making an access request, individuals must receive additional information, including information about their additional data protection rights under the GDPR that did not exist before, such as the right to data portability.

### Right to object

An individual may prohibit certain data processing operations where he or she has compelling legitimate grounds. Individuals may also object to the processing of their personal data for direct marketing purposes.

### Right to rectification or erasure

Individuals may request that incomplete data be completed or that incorrect data be corrected to ensure that the processing of personal data be in compliance with applicable data protection principles.

### Right to restriction

The GDPR offers individuals the right to request the restriction of the processing of their personal data in certain circumstances, including where the individual contests the accuracy of the data.

### Right to erasure

Individuals have the right to seek erasure of their personal data if the processing operations were not in compliance with data protection principles. This right can be exercised when personal data is no longer necessary in relation to the purposes for which it was collected, or the individual withdraws consent to the processing and no other legal basis supports continued processing.

### Right to portability

Individuals may request that personal data held by one data controller be provided to themselves or another controller.
