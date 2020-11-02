// Module Import
let express = require("express");
// Express Router
let router = express.Router();

// Middleware
let auth = require("../middlewares/auth");
let customerControle = require("../controllers/customer");


// POST of customer methods
router.post("/newcustomer",customerControle.Signup);
router.post("/logincustomer", customerControle.login);


module.exports = router;