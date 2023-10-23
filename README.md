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

