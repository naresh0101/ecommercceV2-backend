const { Seller, Customer } = require("../models/index");

let isUniqeSeller = async function (data) {
    let seller = null;
    try {
      seller = await Seller.aggregate(
          [
              {$match : {email:  data.email}}
          ]
      )
    } catch (err) {
      console.log(err);
    }
    return seller;
};
let isValidUser = async function (email) {
    let seller = null;
    try {
      seller = await Seller.aggregate(
          [
              {$match : {email:  email}}
          ]
      )
    } catch (err) {
      console.log(err);
    }
    return org;
};
  
let addSeller = async function (data) {
    let seller = null;
    try {
      seller = await new Seller(data).save();
    } catch (err) {
      console.log(err);
    }
    return seller;
};


// ===============   below is customer service function   ============================== 

let addCustomer = async function (data) {
  let customer = null;
  try {
    customer = await new Customer(data).save();
  } catch (err) {
    console.log(err);
  }
  return customer;
};

let isUniqeCustomer = async function (data) {
  let customer = null;
  try {
    customer = await Customer.aggregate(
        [
            {$match : {email:  data.email}}
        ]
    )
  } catch (err) {
    console.log(err);
  }
  return customer;
};

module.exports = {
    IsUniqeSeller : isUniqeSeller,
    AddSeller : addSeller,
    IsValidUser : isValidUser,

    AddCustomer : addCustomer,
    IsUniqeCustomer : isUniqeCustomer,

};
