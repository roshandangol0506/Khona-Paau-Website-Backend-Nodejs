const URL = require("../modules/url");
const nodemailer = require("nodemailer");

// Configure the email transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "roshan2121004@iimscollege.edu.np", // Replace with your email
    pass: "Dontbreathe1",                    // Replace with your app password
  },
});

async function handleGenerateNewUrl(req, res) {
  try {
    const {
      name,
      email,
      phoneno,
      dob,
      preffered_day,
      preffered_time,
      reason_to_visit,
      new_patient,
      which_doctor,
      detail,
      general_comments,
    } = req.body;

    // Convert `dob` to a timestamp
    const dobTimestamp = new Date(dob).getTime();

    // Save the data to the database
    await URL.create({
      name,
      email,
      phoneno,
      dob: dobTimestamp, // Save the converted timestamp
      preffered_day,
      preffered_time,
      reason_to_visit,
      new_patient,
      which_doctor,
      detail,
      general_comments,
    });

    // Prepare the email content
    const emailBody = `
      <h3>New Appointment Details</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone Number:</strong> ${phoneno}</p>
      <p><strong>Date of Birth:</strong> ${dob}</p>
      <p><strong>Preferred Day:</strong> ${preffered_day}</p>
      <p><strong>Preferred Time:</strong> ${preffered_time}</p>
      <p><strong>Reason to Visit:</strong> ${reason_to_visit}</p>
      <p><strong>New Patient:</strong> ${new_patient ? "Yes" : "No"}</p>
      <p><strong>Which Doctor:</strong> ${which_doctor}</p>
      <p><strong>Detail:</strong> ${detail}</p>
      <p><strong>General Comments:</strong> ${general_comments}</p>
    `;

    // Send the email
    const info = await transporter.sendMail({
      from: '"Roshan Dangol" <roshan2121004@iimscollege.edu.np>', // Sender address
      to: "roshan.dangol00@gmail.com", // Recipient email
      subject: "New Appointment Submission", // Email subject
      html: emailBody, // Email body
    });

    console.log("Message sent: %s", info.messageId);

    // Send a success response back to the client
    return res.send(`
      <script>
        alert("Information submitted successfully!");
        window.location.href = "/";
      </script>
    `);
  } catch (error) {
    console.error("Error handling appointment submission:", error);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  handleGenerateNewUrl,
};
