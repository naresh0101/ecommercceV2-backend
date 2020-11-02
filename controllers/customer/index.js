const { Customer } = require('../../models');
const 
    Services = require('../../services'),
    Joi = require("@hapi/joi")

class customerControle {
  
    async Signup(req, res) {
        let 
            reqBody = req.body,
            resBody = { success: false };  
        // Input body validation
        let inputSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).max(32).required(),
          });
        try {
            await inputSchema.validateAsync(reqBody);
        } catch (err) {
            resBody.message = err.message.replace(/\"/g, "");
            return res.status(200).json(resBody);
        }
        let customer = await Services.IsUniqeCustomer(reqBody)
        if (customer.length != 0) {
            resBody.message = "Customer Already exist!";
            return res.status(200).json(resBody);
        }
        customer = await Services.AddCustomer(reqBody);
        resBody.success = true;
        resBody.message = "Customer created successfully!";
        res.status(200).json(resBody);
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
          console.log(err);
          resBody.message = err.message.replace(/\"/g, "");
          return res.status(200).json(resBody);
        }
        let customer = await Customer.findOne({ email: reqBody.email });
      
        if (!customer) {
          resBody.message = "Invalid email provided";
          return res.status(200).json(resBody);
        }
        const isValidPassword = await customer.verifyPassword(reqBody.password);
        if (!isValidPassword) {
          console.log("reqBody");

          resBody.message = "Invalid password provided";
          return res.status(200).json(resBody);
        }
        resBody = {
          success : true,
          customer: customer.toJSON(),
          message : "Login successfully"
        };
        res.status(200).json(resBody);
    }
}

module.exports = new customerControle()