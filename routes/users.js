const router = require("express").Router();

// Import model
const { User } = require("./model/User");

// Import middleware
//const validateRequest = require("./middlewares/validateRequest");

router.get("/new", (req, res) => {
  res.render("form");
});

//Post method to Create new post
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, feedback } = req.body;
    console.log(req.body);
    const userExists = await User.findOne({ email });
    if (!userExists) {
      // Add
      const newUser = new User({
        firstName,
        lastName,
        email,
        phone,
        feedback,
      });
      const savedUser = await newUser.save();
      res.redirect("/");
      //res.send(savedUser);
    } else {
      // Conflict
      res.status(409).send("User already exists!");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Server Error..");
  }
});

router.get("/test", (req, res) => {
  //console.log(re.body);
  res.send(req.query);
});

//get updateable form
router.get("/edit/:id", async (req, res) => {
  let user = await User.findById(req.params.id);
  res.render("update", { user: user });
});

//Put method to update existing item
/* router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, phone, feedback } = req.body;

    const updatedData = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, email, phone, feedback },
      { new: true }
    );
    if (updatedData) {
      res.redirect("/");
      res.send(updatedData);
    } else {
      res.status(404).send("User not found.");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Server Error..");
  }
}); */

router.put("/:id", async (req, res) => {
  req.user = await User.findById(req.params.id);
  let user = req.user;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.phone = req.body.phone;
  user.feedback = req.body.feedback;
  try {
    user = await user.save();
    res.redirect("/");
  } catch (e) {
    console.log(e);
    res.status(500).send("server error");
  }
});

//Delete method to delete the existing item with thier id
router.get("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await User.deleteOne({ _id: id });
    if (deletedData.deletedCount === 1) {
      res.redirect("/");
      res.send(deletedData).status(204);
    } else {
      // this means, we could not find the id to delete
      res.status(404).send("User not found.");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Server Error..");
  }
});

module.exports = router;
