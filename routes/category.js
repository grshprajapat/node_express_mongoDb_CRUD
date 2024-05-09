const express = require('express');
const { validate, Category } = require('../models/categoryModel');

const router = express.Router();

router.get('/category', async (req, res) => {
  let category = await Category.find();
  // Generate figlet text
  res.send(category);
});

router.post('/api/categories', async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) {
  //   res.status(400).send(error.details[0].message);
  // }

  // Generate figlet text
  const category = new Category({
    name: req.body.name,
  });

  await category.save();

  // categories.push(category);
  res.send(category);
});

router.put('/api/updateCategory/:id', async (req, res) => {
  // Generate figlet text

  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  // const category = categories.find((c) => c.id === parseInt(req.params.id));
  // if (!category) {
  //   return res.status(404).send('Given id is not matched');
  // }
  // category.name = req.body.name;
  if (!category) {
    return res.status(404).send('The category of given id is not found');
  }
  res.send(category);
});

router.delete('/api/deleteCategory/:id', async (req, res) => {
  // Generate figlet text
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    return res.status(404).send('The category of given id is not found');
  }

  res.send(category);
});

module.exports = router;
