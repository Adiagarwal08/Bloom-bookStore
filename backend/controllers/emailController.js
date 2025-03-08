import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendOrderConfirmation = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  // Configure nodemailer transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, // Your email
      pass: process.env.EMAIL_PASSWORD, // App password from Google
    },
  });

  // Email options
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Order Confirmation",
    text: "Thanks for ordering! Your order will be delivered soon.",
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error sending email" });
  }
};
