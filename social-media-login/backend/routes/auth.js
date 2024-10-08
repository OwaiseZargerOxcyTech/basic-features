const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// Used PGSQL as Database here

router.post("/register", authController.register);
router.post("/verify-email", authController.verifyEmail);
router.post("/login", authController.login);
router.get("/get-user", authController.getUser);
router.get("/get-all-users", authController.getAllUsers);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.post("/socialmedia-register", authController.socialMediaLogin);
router.post("/user-details-github", authController.userDetailsGithub);
router.post("/user-details-linkedin", authController.userDetailsLinkedIn);

module.exports = router;
