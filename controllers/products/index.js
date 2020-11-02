const { Products } = require("../../models");
const Joi = require("@hapi/joi")

class Product {
  
    async sellproduct(req, res) {
        let 
            reqBody = req.body,
            resBody = { success: false };  
        // Input body validation
        let inputSchema = Joi.object({
            brand: Joi.string().min(3).max(100),
            product: Joi.string().min(3).max(150),
            price: Joi.number().required(),
            mrp: Joi.number().required(),
            discription: Joi.string().min(5).max(200).required(),
            image: Joi.string().min(10).max(500).required(),
            sellerId: Joi.string().min(10).max(150).required(),
            like: Joi.number(),

        });
        try {
            await inputSchema.validateAsync(reqBody);
        } catch (err) {
            resBody.message = err.message.replace(/\"/g, "");
            return res.status(200).json(resBody);
        }
        try {
            await new Products(reqBody).save();
            resBody = {
                success : true,
                message : "Product added "
              };
            res.status(200).json(resBody);
        } catch (err) {
            resBody.message = err.message.replace(/\"/g, "");
            return res.status(200).json(resBody);
        }
       
    }

    async getproducts(req, res) {
        let resBody = { success: false }
        
        try {
            const productlist = await  Products.find()
            resBody.success = true;
            return res.status(200).json(productlist);
        } catch (err) {
            resBody.message = err.message.replace(/\"/g, "");
            return res.status(200).json(resBody);
        }
       
    }
    async  searchProducts(req, res){
        const resBody = {success : false},
            reqBody = req.body
        console.log(reqBody.product);
        try {
            const product = await Products.find( {
                $or: [
                    {'brand': {$options:'i', $regex: reqBody.product}}, 
                    {'product':  {$options:'i', $regex: reqBody.product}}
                  ],
             } ,{"_id" : 0 , "updatedAt" : 0, "__v" : 0})
            resBody.success = true;
            return res.status(200).json(product);
        } catch (err) {
            resBody.success = true;
            resBody.message = err.message.replace(/\"/g, "");
            return res.status(200).json(resBody);
        }

    }


}

module.exports = new Product()