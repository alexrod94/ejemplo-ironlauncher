const express = require("express");
const router = express.Router();
const Pet = require("../models/Pet.model");

// CRUD

router.get("/", (req, res) => {
  if (req.query.name) {
    if (req.query.name.length > 0) {
      if (req.query.neutered === "true") {
        Pet.find({ neutered: true, name: req.query.name })
          .then((pets) => res.render("pets/home", { data: pets }))
          .catch((error) => console.log(error));
      } else {
        Pet.find({ name: req.query.name }).then((pets) =>
          res.render("pets/home", { data: pets })
        );
      }
    } else {
      if (req.query.neutered === "true") {
        Pet.find({ neutered: true })
          .then((pets) => res.render("pets/home", { data: pets }))
          .catch((error) => console.log(error));
      } else {
        Pet.find().then((pets) => res.render("pets/home", { data: pets }));
      }
    }
  } else {
    Pet.find().then((pets) => res.render("pets/home", { data: pets }));
  }
});

router.get("/create", (req, res) => {
  res.render("pets/create");
});

router.post("/create", (req, res) => {
  const newPet = {
    name: req.body.name,
    age: req.body.age,
    neutered: req.body.neutered === "red" ? true : false,
  };
  Pet.create(newPet)
    .then((data) => res.redirect("/pets"))
    .catch((error) => res.send(error));
});

module.exports = router;
