const axios = require("axios");

const sendSlackNotification = (name, email) => {
  const slackData = JSON.stringify({
    text: `New registration: ${name} - ${email}`,
  });
  const slackConfig = {
    method: "post",
    maxBodyLength: Infinity,
    url: process.env.SLACK_WEBHOOK_URL,
    headers: {
      "Content-type": "application/json",
    },
    data: slackData,
  };
  axios
    .request(slackConfig)
    .then((response) => {
      console.log("Slack notification sent.");
    })
    .catch((error) => {
      console.log("Error sending Slack notification:", error);
      console.log("Slack notification sent.");
    });
};

module.exports = sendSlackNotification;
