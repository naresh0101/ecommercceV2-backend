const mongoose = require("mongoose");
const uuidApiKey = require("uuid-apikey");
const mongooseBcrypt = require("mongoose-bcrypt");
const mongooseTimeStamp = require("mongoose-timestamp");
const validator = require("validator");

const ProductsSchema = new mongoose.Schema(
  { 
    brand : {
      type: String,
      trim: true,
    },
    product: {
      type:String,
      minlength: 5,
      maxlength: 100,
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      minlength: 5,
      maxlength: 100,
      required: true,
    },
    mrp: {
      type: Number,
      required: true,
      trim: true,
    },
    discription: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength:200,
    },
    image: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 500,
      trim: true,
    },
    sellerId : {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
      trim: true,
    },
    like: {
        type: Number,
    }
  },
  { collection: "Products"}
);

ProductsSchema.plugin(mongooseBcrypt);
ProductsSchema.plugin(mongooseTimeStamp);

module.exports = mongoose.model("Products", ProductsSchema);