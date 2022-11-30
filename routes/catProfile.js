const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const catProfileController = require("../controllers/catProfile");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, catProfileController.getCat);

router.post("/createCat", upload.single("file"), catProfileController.createCat);

router.delete("/deleteCat/:id", catProfileController.deleteCat);

module.exports = router;
