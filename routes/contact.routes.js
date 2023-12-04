const express = require("express");
const { UserModel } = require("../model/user.model");

const contactRouter = express.Router();

//Get Route
contactRouter.get("/", async (req, res) => {
  const {q} = req.query
  console.log(q)
  try {
    if(q){
      const contacts = await UserModel.find({name:{"$regex": "Mak"}});
      console.log("contacts",contacts)
      res.status(200).send(contacts);
    }
    else{
      const contacts = await UserModel.find();
      res.status(200).send(contacts);
    }
   
  } catch (err) {
    res.status(400).send({ error: err });
  }
});


//Add Route
contactRouter.post("/add", async (req, res) => {
  const { name, email, phone, label, booked_slots } = req.body;
  try {
    const exUser = await UserModel.findOne({ phone });

    if (exUser) {
      res
        .status(400)
        .send({ message: "Number already exist" });
    } else {
      const newContact = new UserModel(req.body);
      await newContact.save();
      res
        .status(200)
        .send({ message: "New contact created", newContact: newContact });
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

//Edit Route
contactRouter.patch("/edit/:contactId", async (req, res) => {
  const { contactId } = req.params;
  try {
    await UserModel.findByIdAndUpdate({ _id: contactId }, req.body);
    res
      .status(200)
      .send({ message: `Contact with ID ${contactId} has been updated` });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});


//Delete Route
contactRouter.delete("/delete/:contactId", async (req, res) => {
  const { contactId } = req.params;
  try {
    await UserModel.findByIdAndDelete({ _id: contactId });
    res
      .status(200)
      .send({ message: `Contact with ID ${contactId} has been deleted` });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

module.exports = { contactRouter };
