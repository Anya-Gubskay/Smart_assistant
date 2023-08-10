const Category = require("../models/category");
const Position = require("../models/position");
const errorHandler = require("../utils/errorHandler");
const keys = require("../config/keys");
const fs = require('fs');

module.exports.getAll = async function (req, res) {
  try {
    const categories = await Category.find({ user: req.user.id });
    res.status(200).json(categories);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getById = async function (req, res) {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.remove = async function (req, res) {
  try {
    await Category.deleteOne({ _id: req.params.id });
    await Position.deleteMany({ category: req.params.id });
    
    res.status(200).json({
      message: "Сategory has been removed",
      data: {id: req.params.id}
    });

    let from = req.params.imageSrc.search('uploads');
    let to = req.params.imageSrc.length;
    const nameImage = req.params.imageSrc.substring(from, to);
    fs.unlink(`../../../../../${nameImage}`, (err) => {
      if (err) {
          console.log(err)
      }
      console.log("Delete File successfully.");
  });
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.create = async function (req, res) {
  const category = new Category({
    name: req.body.name,
    user: req.user.id,
    imageSrc: req.file ? `${keys.apiUrl}/${req.file.path}` : "",
    key: keys.apiUrl
  });

  try {
    await category.save();
    res.status(201).json({
      message: "Category added successfully",
      data: category
    });
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.update = async function (req, res) {
  const updated = { name: req.body.name };

  if (req.file) {
    updated.imageSrc = `${keys.apiUrl}/${req.file.path}`;
  }

  try {
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updated },
      { new: true }
    );
    res.status(200).json({
      message: "Category updated successfully",
      data: category
    });
  } catch (e) {
    errorHandler(res, e);
  }
};
