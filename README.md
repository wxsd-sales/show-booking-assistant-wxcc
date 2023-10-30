# Show Booking Assistant

This demo helps user with bookings using SMS. If the user has any additional queries, they are directed to a chat bot which answers some simple questions and will redirect to an agent when requested for additional services.
 

<p align="center">
   <a href="https://app.vidcast.io/share/5abac9ec-8bb7-4f73-9c5f-fa8e9e2d4643" target="_blank">
       <img src="virtual_assist.png" alt="virtaul-scheduling-assistant-demo"  width="100%" height="100%"/>
    </a>
</p>

## Table of Contents

<!-- ⛔️ MD-MAGIC-EXAMPLE:START (TOC:collapse=true&collapseText=Click to expand) -->
<details>
<summary>(click to expand)</summary>
    
  * [Overview](#overview)
  * [Setup](#setup)
  * [Installation](#installation)
  * [Demo](#demo)
  * [License](#license)  
  * [Disclaimer](#disclaimer)
  * [Questions](#questions)

</details>
<!-- ⛔️ MD-MAGIC-EXAMPLE:END -->

## Overview
When the customer looks to book a show, but doesn't complete the booking, we track the customer activity and send a coupon code using SMS to the customer to continue booking the show. Then based on his request we complete the booking. Few hours before the show we send another discount asking if he wants to book any additional services or have any questions regarding his booking. If he continues, he will be directed to chat with a chat bot which answers simple questions and then redirects to an agent for additional requests. This whole process is captured in JDS and when the customer is redirected to an agent, the agent will have all these details in hand.

## Setup

### Prerequisites & Dependencies: 

- Webex Connect Sandbox - Available to setup here: https://imimobile.com/products/webex-connect/sandbox
- Webex ORG with Webex Contact Center service enabled - You can ask for a Developer Sandbox here: https://developer.webex-cx.com/sandbox

### Setup JDS
CJDS is currently in Limited Availability (for US-only), please fill out this [form](https://app.smartsheet.com/b/form/7776df72239e47d0bbb73a392e32927f) to be onboarded, the Cisco team will assist you with CJDS instance setup. You should receive an email, once the service is enabled you will be able to manage it in Control Hub:

<img width="119" alt="image" src="https://github.com/wxsd-sales/show-booking-assistant-wxcc/assets/22101144/c2458152-bd13-41c9-b2a5-dd20b1523b9c">

To set up CJDS for your organization, you must:

- [Set a data retention](https://github.com/wxsd-sales/show-booking-assistant-wxcc/edit/main/README.md#set-data-retention-for-cjds)
- [Create a journey project](https://github.com/wxsd-sales/show-booking-assistant-wxcc/edit/main/README.md#create-a-journey-project)
- [Activate the Webex Contact Center connector](https://github.com/wxsd-sales/show-booking-assistant-wxcc/edit/main/README.md#activate-webex-contact-center-connector)
- [Add user identities to a journey project](https://github.com/wxsd-sales/show-booking-assistant-wxcc/edit/main/README.md#add-customer-identities-to-a-journey-project)
- [Enable customer journey widget on an agent desktop](https://github.com/wxsd-sales/show-booking-assistant-wxcc/edit/main/README.md#add-customer-identities-to-a-journey-project)

#### Set data retention for CJDS

You can set how long to retain data that's captured for CJDS. We recommend that you keep a minimum of 180 days to make sure that there are sufficient end-user journey data. By default, data is retained for 365 days.

1. Sign in to Control Hub and go to Customer Journey Data > Settings.
2. Enter the number of days that you want to retain data for CJDS.
3. Click Save.

#### Create a journey project

Journey projects help organizations manage multiple data sources. Each journey project has a unique identifier which is required to leverage CJDS APIs payloads. Note that **project IDs** in Control Hub are referred to as **workspace IDs** in APIs. You may see some existing Journey project, we recommend you to create a new one:

1. Sign in to Control Hub and go to Customer Journey Data > Journey projects.
2. Click Create a journey project.
3. Enter a name and a description for the journey project.

Write down your project ID, we will use it later in postman.

#### Activate Webex Contact Center connector

After you create a journey project, you must activate the Webex Contact Center connector. This connector allows the journey project to capture all customer events and send it to CJDS from Contact Center. Once the connector is activated in one project, it cannot be activated in another. At any point in time, it can be enabled for only one project.

1. Sign in to Control Hub and go to Customer Journey Data > Journey projects.
2. Select a journey project.
3. Toggle the Activate connector in the Webex Contact Center section to on.

#### Add customer identities to a journey project

Customer identities are the way to define customers in JDS. Customer phone numbers, email addresses, and Customer IDs are defined as **identifiers** in JDS, each customer identity must have at least one identifier.
You can upload customer identities to the system using a CSV file (see instructions [here](https://developer.webex-cx.com/documentation/guides/journey---getting-started)) but in this case we will do it programatically. To do that, download [this postman collection](https://github.com/WebexSamples/webex-contact-center-api-samples/blob/main/customer-journey-use-cases/CJDS%2010%20Use%20Cases.postman_collection02.json) and go to 'Create Identity':


<img width="184" alt="image" src="https://github.com/wxsd-sales/show-booking-assistant-wxcc/assets/22101144/6ce9aeb2-2ebc-47c0-ad61-c1130123bb19">

Now you should configure the needed postman variables: workspaceId and Token. You need to use the project ID for the Customer Journey Data project created in Control Hub as the workspaceId value:

<img width="612" alt="image" src="https://github.com/wxsd-sales/show-booking-assistant-wxcc/assets/22101144/85f8b302-e2a3-45cc-8687-478b52d9605c">

and your personal token (valid for 12h). You can get your token signing in the [Webex Contact Center for Developers portal](https://developer.webex-cx.com/):

<img width="612" alt="image" src="https://github.com/wxsd-sales/show-booking-assistant-wxcc/assets/22101144/a3584353-e3db-4b4c-b3b6-9e261bb4d4e7">

Once you copy it, you need to paste it under Authorization in the postman collection:

<img width="612" alt="image" src="https://github.com/wxsd-sales/show-booking-assistant-wxcc/assets/22101144/807fdd8e-9807-49dd-a297-7f95b66e882a">

Now it is time to go back to postman 'Create Identity' POST request and build the proper JSON body. Here you have one example:

```js
{
  "firstName": "Victor",
  "lastName": "Vazquez",
  "phone": [
    "+12345678901",
    "12345678901"
  ],
  "email": [
    "customeremail@somedomain.com"
  ]
}
```
As phone number you should use the number of the mobile you will use during your demo. It is a good practice to add the same number with and without '+'.

If everything went well you should now see a new entry in Control Hub:

<img width="612" alt="image" src="https://github.com/wxsd-sales/show-booking-assistant-wxcc/assets/22101144/f0182a6e-ff9f-414d-96ec-ae12c134216d">

#### Enable customer journey widget on an agent desktop

Download this [WxCC Desktop Layout file](https://github.com/wxsd-sales/show-booking-assistant-wxcc/blob/main/JDS%20Example%20Desktop%20Layout.json), open it with your favorite editor, search for 'project-id' and replace 'ENTER_YOUR_PROJECT_ID_HERE' with your project ID twice (lines 122 and 291). You also need to search for 'organizationId' and replace 'HARD CODE YOUR CH ORG ID HERE!' with your Webex ORG Id (line 291).

Go to the WxCC management portal, create a new Desktop Layouy and associate it to one of our Teams. Now you log as an agent from this team in WxCC desktop, you should be able to see the JDS widget:

<img width="477" alt="image" src="https://github.com/wxsd-sales/show-booking-assistant-wxcc/assets/22101144/65a673b4-9c0f-4350-b10d-01a44e911e85">

### Setup Webex Connect Q&A Bot

1. On your Webex Connect Sandbox, navigate to the Bot builder in the App tray:

![image](https://user-images.githubusercontent.com/21026209/217930701-c6ddd4c6-3cf3-4d47-b992-470c6a7ea603.png)

2. At the top right, click ``+ New Q&A Bot``:

![image](https://user-images.githubusercontent.com/21026209/217930978-255a84e6-cf6f-4f4a-8c6d-839958e8fadd.png)

3. Give your Bot a name and click done:

![bot_book_a_show](https://github.com/wxsd-sales/show-booking-assistant-wxcc/assets/85897512/aaaafebc-d555-4952-aa2d-268f61276bd5)


4. This will create a basic Q&A Bot with default articles and responses, you can add more responses to the Bot as needed.

### Setup Webex Connect Flow

1. Download the ``32744.workflow`` file from this repo 
2. Create a new Flow on your Webex Connect Sandbox and select the Upload a flow method and use the ``32744.workflow`` file

3. Modify the Webhook and create a new Webex for this Flow and use the following JSON template and parse it:
```js
{
   "number": "1111222233",
   "name": "Customer Name",
   "showName": "Magic Show"
}
```
4. Select the SMS and receive nodes and make sure to add the "From Number" field. (Make sure the from number used is constant throughout the flow)
5. Next, click on the Q&A Bot node and select the Bot you made earlier:

![image](https://user-images.githubusercontent.com/21026209/217933429-9eb85882-c9e0-47c1-a27e-edf57b62a436.png)

6. Go to flow settings > custom variables and add values to ``workspaceID`` , ``myToken`` , ``CCMainNumber`` from your contact center
   
![flow_settings](https://github.com/wxsd-sales/show-booking-assistant-wxcc/assets/85897512/cf7ceeae-43f8-432a-a7eb-3cbc1db7ed6b)

For ``myToken`` you can use the same personal token you used in postman, the one you can find signing in the [Webex Contact Center for Developers portal](https://developer.webex-cx.com/)

7. Save the flow changes and click make live.

## Installation

1. Clone this repository and change directory:

   ```
   git clone https://github.com/wxsd-sales/show-booking-assistant-wxcc.git
   ```

2. Copy `.env.example` file as `.env`:
   ```
   cp .env.example .env
   ```
3. Add PUBLIC_BACKGROUND_URL and PUBLIC_WEBHOOK_URL with the webhook you got from your Webex Connect flow in your `.env` file
4. Run
   ```
   npm install
   ```
5. Run
   ```
   npm dev run
   ```
  
## Demo

*For more demos & PoCs like this, check out our [Webex Labs site](https://collabtoolbox.cisco.com/webex-labs).


## License

All contents are licensed under the MIT license. Please see [license](LICENSE.txt) for details.


## Disclaimer

Everything included is for demo and Proof of Concept purposes only. Use of the site is solely at your own risk. This site may contain links to third party content, which we do not warrant, endorse, or assume liability for. These demos are for Cisco Webex use cases, but are not Official Cisco Webex Branded demos.


## Questions
Please contact the WXSD team at [wxsd@external.cisco.com](mailto:wxsd@external.cisco.com?subject=room-presets-macro) for questions. Or, if you're a Cisco internal employee, reach out to us on the Webex App via our bot (globalexpert@webex.bot). In the "Engagement Type" field, choose the "API/SDK Proof of Concept Integration Development" option to make sure you reach our team. 

