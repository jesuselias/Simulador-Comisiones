const express = require("express");
const { simulate } = require("../controllers/simulatorController");

const router = express.Router();

router.post("/", simulate);

module.exports = router;
