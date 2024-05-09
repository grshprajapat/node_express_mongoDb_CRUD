const mongoose = require('mongoose');
const Joi = require('joi');
const Student = mongoose.model('Student', studentSchema);
const studentSchema = new mongoose.Schema({
  name: { type: String, require: true, minLength: 3, maxLength: 30 },
  isEnroll: { type: Boolean, default: false },
  phone: { type: String, require: true, minLength: 10, maxLength: 25 },
});

function validate(student) {
  const schema = {
    name: Joi.string().min(1).max(50).required(),
    isEnroll: Joi.boolean(),
    phone: Joi.string().min(10).max(15).required(),
  };
  return Joi.validate(student, schema);
}

exports.validate = validate;
exports.Student = Student;
