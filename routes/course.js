const express = require('express');
const { validate, Course } = require('../models/courseModel');
const { Category } = require('../models/categoryModel');

const router = express.Router();

router.get('/', async (req, res) => {
  let course = await Course.find();
  // Generate figlet text
  res.send(course);
});

router.post('/create', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }

  const category = await Category.findById(req.body.categoryId);
  if (!category) {
    return res.status(400).send('inValid id');
  }
  // Generate figlet text
  const course = new Course({
    title: req.body.title,
    rating: req.body.rating,
    creator: req.body.creator,
    category: {
      _id: category.id,
      name: category.name,
    },
  });

  await course.save();

  // categories.push(course);
  res.send(course);
});

router.put('/update/:id', async (req, res) => {
  // Generate figlet text

  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }

  const category = await Category.findById(req.body.categoryId);
  if (!category) {
    return res.status(400).send('inValid id');
  }

  const course = await Course.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    rating: req.body.rating,
    creator: req.body.creator,
    category: {
      _id: category.id,
      name: category.name,
    },
  });
  // const course = categories.find((c) => c.id === parseInt(req.params.id));
  // if (!course) {
  //   return res.status(404).send('Given id is not matched');
  // }
  // course.name = req.body.name;
  if (!course) {
    return res.status(404).send('The course of given id is not found');
  }
  res.send(course);
});

router.delete('/delete/:id', async (req, res) => {
  // Generate figlet text
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) {
    return res.status(404).send('The course of given id is not found');
  }

  res.send(course);
});

module.exports = router;
