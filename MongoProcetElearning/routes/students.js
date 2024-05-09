const express = require('express');
const router = express.Router();
const { validate, Student } = require('..//models/studentModel');

router.get('/', async (req, res) => {
  let student = await Student.find();
  // Generate figlet text
  res.send(student);
});

router.post('/create', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
  const student = new Student({
    name: req.body.name,
    isEnroll: req.body.enroll,
    phone: req.body.phone,
  });

  await student.save();
  res.send(student);
});

router.put('/update/:id', async (req, res) => {
  // Generate figlet text

  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }

  const student = await student.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    isEnroll: req.body.enroll,
    phone: req.body.phone,
  });
  // const category = categories.find((c) => c.id === parseInt(req.params.id));
  // if (!category) {
  //   return res.status(404).send('Given id is not matched');
  // }
  // category.name = req.body.name;
  if (!student) {
    return res.status(404).send('The student of given id is not found');
  }
  res.send(student);
});

router.delete('/delete/:id', async (req, res) => {
  // Generate figlet text
  const student = await Student.findByIdAndDelete(req.params.id);
  if (!student) {
    return res.status(404).send('The student of given id is not found');
  }

  res.send(student);
});

module.exports = router;
