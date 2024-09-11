const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const e = require("express");
const { default: axios } = require("axios");
const generateToken = require("../routes/token");
const prisma = new PrismaClient();

exports.register = [
  // Validation and sanitization
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .escape(),
  body("email").isEmail().withMessage("Invalid email address").normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Generate OTP
      const otp = crypto.randomInt(100000, 999999).toString();

      // Create new user
      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          verified: "N",
          verifyotp: otp,
          company_existing: "N",
        },
      });

      // Configure nodemailer transporter
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_PORT === "465", // Set to true if using port 465
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
          rejectUnauthorized: false, // Ignore self-signed certificates
        },
      });

      // Construct email options
      const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: "Verify Your Email Address",
        html: `<p>Use this OTP: <strong>${otp}</strong> to verify your email. <a href="http://${req.headers.host}/verify-email?otp=${otp}">Click here</a> to verify your email.</p>`,
      };

      // Send email
      try {
        await transporter.sendMail(mailOptions);
      } catch (mailError) {
        return res
          .status(500)
          .json({ message: "Failed to send verification email" });
      }

      res.status(201).json({ message: "Verification OTP sent successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  },
];

exports.verifyEmail = [
  // Validation for OTP
  body("otp")
    .trim()
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP must be a 6-digit number")
    .isNumeric()
    .withMessage("OTP must be numeric"),

  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { otp } = req.body;

    try {
      // Find the user with the matching OTP and update the user status
      const result = await prisma.user.updateMany({
        where: { verifyotp: otp },
        data: { verifyotp: null, verified: "Y" },
      });

      if (result.count === 0) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
      }

      res.status(200).json({ message: "User verified successfully!" });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  },
];

exports.login = [
  // Validation for email and password
  body("email").isEmail().withMessage("Invalid email address").normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      if (user.verified === "N") {
        return res.status(400).json({ message: "User email not verified" });
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.SECRET_KEY,
        { expiresIn: "24h" }
      );

      res.status(200).json({ message: "Logged In Successfully", token: token });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  },
];

exports.forgotPassword = [
  // Validation for email
  body("email").isEmail().withMessage("Invalid email address").normalizeEmail(),

  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Generate OTP
      const otp = crypto.randomInt(100000, 999999).toString();

      // Update user with OTP (consider adding an expiry time for the OTP)
      await prisma.user.update({
        where: { email },
        data: { resetotp: otp },
      });

      // Set up the transporter
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_PORT === "465", // Use true if using port 465
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      // Mail options
      const resetUrl = `http://${req.headers.host}/reset-password`;
      const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: "Password Reset",
        html: `<p>Use this OTP: <strong>${otp}</strong> to reset your password. Use the following link to reset your password: <a href="${resetUrl}">Reset Password</a></p>`,
      };

      // Send email
      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: "Reset email sent successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  },
];

exports.resetPassword = [
  body("otp")
    .trim()
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP must be a 6-digit number")
    .isNumeric()
    .withMessage("OTP must be numeric"),
  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters long"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { otp, newPassword } = req.body;

    try {
      // Find user by email and OTP
      const user = await prisma.user.findFirst({
        where: {
          resetotp: otp,
        },
      });

      if (!user) {
        return res
          .status(400)
          .json({ error: "Invalid email, OTP, or OTP has expired" });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update user with new password and clear OTP
      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          resetotp: null,
        },
      });

      res.status(200).json({ message: "Password reset successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  },
];

exports.socialMediaLogin = [
  // Validation and sanitization
  body("full_name").trim(),
  body("email").isEmail().withMessage("Invalid email address").normalizeEmail(),

  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      email,
      full_name,
      first_name,
      last_name,
      logged_in_with,
      verified,
    } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        await prisma.user.update({
          where: { email },
          data: { verified: "Y" },
        });

        if (!existingUser) {
          return res.status(400).json({ message: "Invalid credentials" });
        }

        if (existingUser.verified === "N") {
          return res.status(400).json({ message: "User email not verified" });
        }

        // Generate JWT token
        const token = jwt.sign(
          { id: existingUser.id, email: existingUser.email },
          process.env.SECRET_KEY,
          { expiresIn: "24h" }
        );

        return res
          .status(200)
          .json({ message: "Registration successfully", token: token });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(email, 10);

      // Create new user
      await prisma.user.create({
        data: {
          username: email,
          email: email,
          password: hashedPassword,
          full_name: full_name,
          first_name: first_name,
          last_name: last_name,
          logged_in_with: logged_in_with,
          verified: verified,
          company_existing: "N",
        },
      });

      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      if (user.verified === "N") {
        return res.status(400).json({ message: "User email not verified" });
      }
      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.SECRET_KEY,
        { expiresIn: "24h" }
      );

      // Configure nodemailer transporter
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_PORT === "465", // Set to true if using port 465
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
          rejectUnauthorized: false, // Ignore self-signed certificates
        },
      });

      // Construct email options
      const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: "Thanks for joining us",
        html: `<p>THANK YOU FOR SIGNING UP FOR STARTER APP EMAILS</p>
        <br><p>Now you'll be the first to know when new products & updates are released as well as receive exclusive offers from STARTER APP and our community.</p>
        `,
      };

      // Send email
      try {
        await transporter.sendMail(mailOptions);
      } catch (mailError) {
        return res.status(500).json({ message: "Failed to send email" });
      }

      return res
        .status(200)
        .json({ message: "Registration successfully", token: token });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", details: error.message });
    } finally {
      await prisma.$disconnect();
    }
  },
];

exports.userDetailsGithub = [
  // Validation and sanitization
  body("codeMatch").notEmpty().withMessage("No code provided."),
  body("clientId").notEmpty().withMessage("Client ID is required."),
  body("clientSecret").notEmpty().withMessage("Client Secret is required."),
  body("redirectUrl").notEmpty().withMessage("Redirect URL is required."),

  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { codeMatch, clientId, clientSecret, redirectUrl } = req.body;

    try {
      // Prepare parameters for the access token request
      const params = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code: codeMatch,
        redirect_uri: redirectUrl,
      });

      // Fetch the access token from GitHub
      const accessTokenResponse = await axios.post(
        "https://github.com/login/oauth/access_token",
        params.toString(),
        {
          headers: {
            Accept: "application/json", // Request JSON response
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const accessToken = accessTokenResponse.data.access_token;

      if (!accessToken) {
        return res
          .status(400)
          .json({ message: "Error retrieving access token" });
      }

      // Fetch user information from GitHub
      const userInfoResponse = await axios.get("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Fetch user emails from GitHub
      const emailInfoResponse = await axios.get(
        "https://api.github.com/user/emails",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const primaryEmail =
        emailInfoResponse.data.find((email) => email.primary)?.email || null;

      return res.status(200).json({
        userData: userInfoResponse.data,
        emailData: primaryEmail,
      });
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        // Handle specific GitHub errors
        if (status === 401) {
          return res.status(401).json({
            message: "Unauthorized. Invalid code or credentials.",
          });
        }

        // Other GitHub API errors
        return res.status(status).json({
          message: data.message || "GitHub API error",
        });
      }

      // Fallback for general errors
      return res.status(500).json({
        message: "Internal server error. Please try again later.",
      });
    }
  },
];

exports.userDetailsLinkedIn = [
  // Validation and sanitization
  body("codeMatch").notEmpty().withMessage("No code provided."),
  body("clientId").notEmpty().withMessage("Client ID is required."),
  body("clientSecret").notEmpty().withMessage("Client Secret is required."),
  body("redirectUrl").notEmpty().withMessage("Redirect URL is required."),

  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { codeMatch, clientId, clientSecret, redirectUrl } = req.body;

    try {
      // Request for access token
      const accessTokenResponse = await axios.post(
        `https://www.linkedin.com/oauth/v2/accessToken`,
        `grant_type=authorization_code&code=${codeMatch}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUrl}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const accessToken = accessTokenResponse.data.access_token;

      // Request for user info
      const userInfoResponse = await axios.get(
        `https://api.linkedin.com/v2/userinfo`, // Update to use the correct endpoint for user info
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json", // Adjusted content type
          },
        }
      );

      return res.status(200).json(userInfoResponse.data);
    } catch (error) {
      if (error.response) {
        // Handle specific error codes
        if (error.response.status === 401) {
          const errorCode = error.response.data.serviceErrorCode;

          // Token revoked or expired
          if (errorCode === 65601) {
            return res.status(401).json({
              message: "Access token has been revoked. Please re-authenticate.",
            });
          }
        }

        return res.status(error.response.status).json({
          message:
            error.response.data.error_description ||
            "Error processing LinkedIn authentication.",
        });
      } else {
        return res.status(500).json({
          message: "Internal server error.",
        });
      }
    }
  },
];

exports.getAllUsers = async (req, res) => {
  try {
    // Retrieve all users with only the username field
    const users = await prisma.user.findMany({
      select: {
        username: true,
      },
    });

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  } finally {
    await prisma.$disconnect();
  }
};
exports.getUser = async (req, res) => {
  const { token } = req.query;

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;

    // Find the user by ID
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with user data
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  } finally {
    await prisma.$disconnect();
  }
};
