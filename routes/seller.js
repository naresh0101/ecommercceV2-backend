// Module Import
let express = require("express");
// Express Router
let router = express.Router();

// Middleware
let auth = require("../middlewares/auth");
let seller = require("../controllers/seller");
let customer = require("../controllers/customer");


// POST of seller methods
router.post("/newseller",seller.Signup);
router.post("/loginseller", seller.login);

module.exports = router;