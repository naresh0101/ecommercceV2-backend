// Module Import
const express = require("express");
const Product = require("../controllers/products");
const Auth = require("../middlewares/auth")
// Express Router
const router = express.Router();

// POST  products methods
router.post("/sellproduct",Auth.apiKeyAuth,Product.sellproduct);
router.post("/searchproducts",Auth.apiKeyAuth,Product.searchProducts);


// GET products
router.get("/getproducts",Auth.apiKeyAuth, Product.getproducts);



module.exports = router;