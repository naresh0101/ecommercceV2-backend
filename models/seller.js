const mongoose = require("mongoose");
const mongooseBcrypt = require("mongoose-bcrypt");
const mongooseTimeStamp = require("mongoose-timestamp");
const uuidApiKey = require("uuid-apikey");
const { string } = require("@hapi/joi");

const STATUS_ACTIVE = "active",
  STATUS_PENDING = "pending",
  STATUS_DELETED = "deleted",
  STATUS_DISABLED = "disabled";

const sellerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 100,
      required: true,
    },
    fullname: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 150,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
  },
    pencard: {
      type: String,
      trim: true,
      required:true,
      minlength:9,
      maxlength:9
    },
    phone: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
      minlength: 10,
      maxlength:16
    },
    password: {
      type: String,
      required: true,
      bcrypt: true,
    },
    api_key: {
      type: String,
      required: true,
      unique: true,
      default: uuidApiKey.create().apiKey,
    },
  },
  { collection: "Seller" }
);

sellerSchema.plugin(mongooseBcrypt);
sellerSchema.plugin(mongooseTimeStamp);

module.exports = mongoose.model("Seller", sellerSchema);