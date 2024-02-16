# Salesforce Development Interview Project

## Project Requirements
> Merz Aesthetics Customer Service representatives must quickly get the updated status of a
customer shipment. When viewing the standard Shipment page in Salesforce, the rep wants to be
able to view a Lightning Web Component that displays the latest status of the Shipment based on
the tracking number of the Shipment record. Develop an LWC that calls the mock shipping status 
service defined below and displays the response to the end user.

## Project Solution
1. object\Shipment
   - This solution is dependent on the standard **Shipment** object that is part of Salesforce Order Management. All standard fields are utilized so need for the object to be in this reposistory for now. If not familiar with this part of the platform you should explore the [Order Management Resources](https://help.salesforce.com/s/articleView?id=sf.om_order_management_resources.htm&type=5) published by Salesforce.   

1. lwc\shipmentStatus
   - This Lightning Web Component is intended to be placed on the default "Shipment" Lightning Record Page assigned to Customer Service Representatives when using the standard Order Management App. The component leverages @wire for efficient access to the records data and events. In addition to rendering sucessful Shipment Status results, the component also has basic logic for error handling and providing visual feedback to the user.

1. classes\shipmentStatusCallout
    - This Apex Class has an @AuraEnabled method that initiats a callout to the mock shipping status service (also currently hosted on SFDC). The class can be extended later if the shipping service expands to support a bulk response or if further platform side automation or DML is required.

## Setup
1. Administrative Setup
    - The callout to the mock shipping status service is dependent on a Named Credential (where its hosted), External Credential
    (how we authenticate with it) and Principal (who can call it). You will need to perform a one time manual setup of these items in order to sucessfully use the lwc\shipments component on the Shipment Lightning Record Page.
    - Go to Setup \ Security \ Named Credentials, click External Credential (tab item in main content panel) and click "New"
    - Set the fields as follows:
      - Label: shipmentStatusAPIExternalCredential
      - Name: shipmentStatusAPIExternalCredential
      - Authentication Protocol: No Authentication
    - Click Save
    - While viewing the new External Credential, go to the Principals section and click New
    - Set the fields as follows:
      - Parameter Name: customerServiceRepresentative
      - Sequence Number: 1
      - Identity Type: Named Principal
    - Click Save
    - Go to Setup \ Security \ Named Credentials, click Named Credential (tab item in main content panel) and click "New" (do not use "New Legacy")
    - Set the fields as follows:
      - Label: shipmentStatusAPINamedCredential
      - Name: shipmentStatusAPINamedCredential
      - URL: https://merzcommunities--mel.sandbox.my.salesforce-sites.com/services/apexrest/mockShipmentStatus
      - Enabled for Callouts = true/on
      - Extneral Credential = shipmentStatusAPIExternalCredential
      - Generate Authorization Header = true/checked
    - Click Save
    - Assign the "shipmentStatusAPIExternalCredential - customerServiceRepresentative" Principal to the profile/permission sets for the users who need to be able to see Shipment Status results.
      - This is done under the Enabled External Credential Principal Access section of the profile/permission set

1. Code Deployment
    - Deploy the lwc\shipmentStatus and classes\shipmentStatusCallout project components to your sandbox.
      - Note: Unit tests will be needed to go to a production org

1. Page Layout Setup
    - Go to the Shipments tab (search App Launcher if not already in your Order Management app).
    - If a Shipment record is not present under the All view, then create a basic one and be sure to add a tracking number, ie: 123456.
    - View the Shipment record and select the Setup "gear" icon at the top right of your page and then "Edit Page". 
    - This will launch the Lightning App Builder, find the shipmentStatus component under the Custom compoents section on the left and drag it onto the page layout
    - click Save at the top right of the page
  
## Screenshots

![image](https://github.com/manthesails/MerzDevProject/assets/7214780/02f338b8-f958-4b24-88a1-391846b7c999)

![image](https://github.com/manthesails/MerzDevProject/assets/7214780/af265f95-f9ab-480b-8cbe-2c0579386758)

![image](https://github.com/manthesails/MerzDevProject/assets/7214780/a88b00d8-21c9-4442-b3ce-e376e62f0cb2)

 

