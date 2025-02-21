const express = require("express");
const {
  saveLanding,
  getAllLandings,
} = require("../controller/LandingController");

const router = express.Router();

router.post("/", saveLanding);
router.get("/", getAllLandings);

module.exports = router;
