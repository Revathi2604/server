const axios = require("axios");

const sendSlackNotification = (details) => {
  const slackData = JSON.stringify({
    text: `User  : ${details.name}
Email : ${details.email}
Phone : ${details.phoneNumber}
Turnover : ${details.turnover}`,
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
