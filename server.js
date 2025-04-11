const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: "https://portfolio-fq8t.onrender.com" 
}));
app.use(express.json());


app.post("/contact", async (req, res) => {
  const { fullName, email, message } = req.body;

  try {
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

   
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Contact from ${fullName}`,
      text: message,
    };

    
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send message." });
  }
});


app.get("/", (req, res) => {
  res.send("Backend is live ");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
