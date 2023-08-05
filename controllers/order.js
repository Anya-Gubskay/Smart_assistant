const Order = require("../models/order");
const errorHandler = require("../utils/errorHandler");

module.exports.getAll = async function (req, res) {
  try {
    const orders = await Order.find({ user: req.user.id });

    res.status(200).json(orders);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.create = async function (req, res) {
  try {
    const lastOrder = await Order.findOne({user: req.user.id}).sort({date: -1})
    const maxNumber = lastOrder ? lastOrder.order : 0
    req.body.list.forEach(item => {
      if(item.quantity === null) {
        item.quantity = 0
      }
    })
    const order = await new Order({
      list: req.body.list,
      user: req.user,
      order: maxNumber + 1,
      total: req.body.total
    }).save();

    res.status(201).json({
      message: "Order added successfully",
      data: order
    });
  } catch (e) {
    errorHandler(res, e);
  }
};
