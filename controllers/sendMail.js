const nodemailer = require("nodemailer");

// Create a transport object
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "roshan2121004@iimscollege.edu.np",
    pass: "Dontbreathe1",
  },
});

// Define the middleware function
const sendMail = async (req, res) => {
  try {
    // Send mail
    const info = await transporter.sendMail({
      from: '"Roshan Dangol <roshan2121004@iimscollege.edu.np>', // Sender address
      to: "roshan.dangol00@gmail.com", // List of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // Plain text body
      html: "<b>Hello world?</b>", // HTML body
    });

    console.log("Message sent: %s", info.messageId);
    res.send("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email");
  }
};

module.exports = sendMail;
