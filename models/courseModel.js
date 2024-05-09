const mongoose = require('mongoose');
const Joi = require('joi');
const { categorySchema } = require('../models/categoryModel');

const courseModel = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    minLength: 3,
    maxLength: 30,
    trim: true,
  },
  category: {
    type: categorySchema,
    require: true,
  },
  creator: { type: String, require: true },
  rating: { type: String, require: true },
});

const Course = mongoose.model('Course', courseModel);

function validate(course) {
  const schema = {
    title: Joi.string().min(3).required(),
    categoryId: Joi.string().required(),
    creator: Joi.string().min(3).required(),
    rating: Joi.number().min(0).required(),
  };
  return Joi.validate(course, schema);
}

exports.Course = Course;
exports.validate = validate;
