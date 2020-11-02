const mongoose = require("mongoose");
const mongooseBcrypt = require("mongoose-bcrypt");
const mongooseTimeStamp = require("mongoose-timestamp");
const uuidApiKey = require("uuid-apikey");

const customerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
  },
    password: {
      type: String,
      required: true,
      bcrypt: true,
    },
    api_key: {
      type: String,
      unique: true,
      default: uuidApiKey.create().apiKey,
      required: true,
    },
  },
  { collection: "customer" }
);

customerSchema.plugin(mongooseBcrypt);
customerSchema.plugin(mongooseTimeStamp);

module.exports = mongoose.model("customer", customerSchema);