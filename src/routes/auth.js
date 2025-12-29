const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs"); // encryption for password
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const User = require("../models/login");

router.post("/signup", async (req, res) => {
  try {
    const { email, userid, password } = req.body;
    // same as const email = req.body.email

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await User.create({
      email,
      userid,
      password: hashedPassword,
      otp,
      otpExpires: Date.now() + 10 * 60 * 1000
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    await transporter.sendMail({
      to: email,
      subject: "Verify your account for notes app",
      text: `Your OTP is ${otp}. Please dont share with anyone`
    });
     
    user.save(); // added by me to save the user but the user is unverified
    res.json({ message: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/verifyOtp", async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({email});

  if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  user.isVerified = true;
  user.otp = null;
  user.otpExpires = null;
  await user.save();

  res.json({ message: "Account verified" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !user.isVerified) {
    return res.status(401).json({ message: "User not verified" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token });
});

module.exports = router;
