const mongoose = require("mongoose");
//const yup = require("yup");

let userSchema = mongoose.Schema({
  firstName: {
    type: String,
    //required: true,
  },
  lastName: {
    type: String,
    //required: true,
  },
  email: {
    type: String,
    //required: true,
    //max: 255,
    //min: 6,
  },
  phone: {
    type: String,
    //required: true,
  },
  feedback: {
    type: String,
    //required: true,
  },
});

/* const validationSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().email().max(255).min(6).required(),
  feedback: yup.string().required(),
}); */
module.exports.User = mongoose.model("User", userSchema);

//
//module.exports.validationSchema = validationSchema;
