import axios from "axios";
import { PUBLIC_WEBHOOK_URL } from "$env/static/public";

async function sendMessage(name, number, showName) {
  const body = {
    number: number,
    name: name,
    showName: showName,
  };
  console.log(body);
  await axios.post(PUBLIC_WEBHOOK_URL, body).catch((e) => {
    console.log("Error in sending message:");
    console.log(e);
  });
}

export { sendMessage };
