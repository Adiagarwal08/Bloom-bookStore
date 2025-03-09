import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const router = express.Router();

// Google Auth Route
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google Auth Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/failure" }),
  (req, res) => {
    // Generate JWT token
    console.log(req.user);
    const token = jwt.sign({ _id: req.user._id }, process.env.SECRET, {
      expiresIn: "3d",
    });

    // Redirect to frontend with token
    res.redirect(
      `${process.env.REACT_APP_API_URI}/auth-success?token=${token}&email=${req.user.email}`
    );
  }
);

// Success Route
router.get("/success", (req, res) => {
  if (!req.user) return res.redirect("/auth/failure");
  res.send(`Welcome, ${req.user.email}`);
});

// Failure Route
router.get("/failure", (req, res) => {
  res.send("Authentication Failed");
});

// Logout Route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.redirect("/");
    });
  });
});

export default router;
