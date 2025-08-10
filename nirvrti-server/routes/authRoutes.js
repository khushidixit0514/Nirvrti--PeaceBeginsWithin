import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Pages
router.get("/", (req, res) => res.redirect("/login"));
router.get("/signup", (req, res) => res.render("signup"));
router.get("/login", (req, res) => res.render("login"));
router.get("/capsule", (req, res) => res.render("./pages/capsule"));
router.get("/detox", (req, res) => res.render("./pages/detox"));
router.get("/issues", (req, res) => res.render("./pages/issues"));
router.get("/reset", (req, res) => res.render("./pages/reset"));
router.get("/writing", (req, res) => res.render("./pages/writing"));
router.get("/home", protect, (req, res) => res.render("home"));
router.get("/pledge", (req, res) => res.render("./pages/pledge"));

router.get("/logout", logoutUser);

// POST routes
router.post("/signup", registerUser);
router.post("/login", loginUser);

export default router;
