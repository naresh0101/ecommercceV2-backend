const { Seller, } = require("../../models");
const 
    Services = require('../../services'),
    Joi = require("@hapi/joi");

class seller {
  
    async Signup(req, res) {
        let 
            reqBody = req.body,
            resBody = { success: false }; 
        // Input body validation
        let inputSchema = Joi.object({
            username: Joi.string().min(3).max(100),
            fullname: Joi.string().min(3).max(150),
            email: Joi.string().email().required(),
            pencard: Joi.string().length(10).required(),
            phone: Joi.string().min(10).max(16).required(),
            password: Joi.string().min(8).max(32).required(),
          });
        try {
            await inputSchema.validateAsync(reqBody);
        } catch (err) {
            console.log(err);
            resBody.message = err.message.replace(/\"/g, "");
            return res.status(200).json(resBody);
        }
        let seller = await Services.IsUniqeSeller(reqBody)
        if (seller.length != 0) {
            resBody.message = "Seller already exist!";
            return res.status(200).json(resBody);
        }
        seller = await Services.AddSeller(reqBody);
        resBody.message = "Account Created Successfully!";
        resBody.success = true;
        res.status(200).json(resBody);
        return res.status(200).json(resBody);
    }

    async login(req, res) {
        let 
            reqBody = req.body,
            resBody = { success: false };
        let 
            inputSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).max(32).required(),
        });
        try {
          await inputSchema.validateAsync(reqBody);
        } catch (err) {
          resBody.message = err.message.replace(/\"/g, "");
          return res.status(200).json(resBody);
        }
        let seller = await Seller.findOne({ email: reqBody.email });
        if (!seller) {
          resBody.message = "Invalid email provided";
          return res.status(200).json(resBody);
        }
        const isValidPassword = await seller.verifyPassword(reqBody.password);
        console.log(isValidPassword);
        if (!isValidPassword) {
          resBody.message = "Invalid password provided";
          return res.status(200).json(resBody);
        }
        resBody = {
          success : true,
          seller: seller.toJSON(),
          message : "Login successfully"
        };
        res.status(200).json(resBody);
    }
}

module.exports = new seller()