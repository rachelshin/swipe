const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const catProfileController = require("../controllers/catProfile");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", catProfileController.allCats);
router.get("/fosters", ensureAuth, catProfileController.getAdmin);
router.get("/addcat", ensureAuth, catProfileController.addCat);
router.get("/menu", ensureAuth, catProfileController.showMenu);
// to do - show only matches - change header? showMatches
router.get("/matches", ensureAuth, catProfileController.allCats);
// to do - allCats - change header?
router.get("/all", ensureAuth, catProfileController.allCats);

// auth stuff
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

// router.get("/profile")
// router.get("/application")
// router.get("/editcat")

module.exports = router;
