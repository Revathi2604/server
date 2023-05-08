const express = require("express");
const router = new express.Router();
const nodemailer = require("nodemailer");
const sendSlackNotification = require("./slack");

// send mail and slack notification
router.post("/send-message", (req, res) => {
  console.log(req.body);
  const { email, name } = req.body;

  try {
    // send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Sending Email With React And Nodejs",
      html: `
        <div style="font-family: Arial; font-size: 14px;">
          <p>Hello and welcome, <b>${name}</b>!</p>
          <p>Thank you for choosing us. We appreciate your interest and look forward to connecting with you soon.</p>
          <p>If you have any questions or concerns, please don't hesitate to reach out to us.</p>
        </div>
      `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error" + error);
      } else {
        console.log("Email sent:" + info.response);
        sendSlackNotification(req.body); // call the function to send the Slack notification
      }
    });

    res.status(201).json({ status: 201 });
  } catch (error) {
    console.log("Error" + error);
    res.status(401).json({ status: 401, error });
  }
});

module.exports = router;
