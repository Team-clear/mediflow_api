const { validationResult } = require("express-validator/check");
const medicine = require("../MODELS/ medicine");
const path = require("path");
const auth = require("../middleware/is-auth");
const User = require("../MODELS/user");
const { model } = require("mongoose");

exports.showMedicines = async (req, res, next) => {
  try {
    let properties = await medicine.find();
    if (!properties) {
      res.status(404).json({
        message: "no property found",
      });
    }
    res.status(200).json({
      message: "got some prop here",
      properties: properties,
    });
  } catch (error) {
    console.log(`error in fetching the house ${error}`);
  }
};

exports.getsingleMedicine = async (req, res, next) => {
  let medicineId = req.query.medicineId;
  try {
    let foundMedicine = await medicine.findById(medicineId.toString());
    if (!foundMedicine) {
      res.status(404).json({ message: "no property found" });
    }

    res.status(200).json({
      message: "fetched sucessifully",
      post: foundMedicine,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateMedicine = (req, res, next) => {
  const houseId = req.params.postId;
  const updatedTitle = req.body.title;
  const updatedContent = req.body.content;
  const updatedImageUrl = req.bod;

  housedetail
    .findOne({ _id: houseId, creator: req.userId })
    .then((house) => {
      if (!house) {
        const error = new Error("No house found");
        error.statusCode = 404;
        throw error;
      }
      house.title = updatedTitle;
      house.content = updatedContent;
      house.imageUrl = updatedImageUrl;

      return house.save();
    })
    .then((result) => {
      res.status(200).json({ post: result, message: "updated" });
      console.log("house updated");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.searchMedicine = async (req, res, next) => {
  const query = req.query;

  try {
    let med = await medicine.find({
      $or: [{ Title: { $regex: query.Title, $options: "i" } }],
    });

    res.status(200).json({
      dosc: med,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getDistricts = async (req, res, next) => {
  let city = req.query.city;
  console.log("hereeee");

  let Regions = {
    Daressalaam: ["Ilala", "Ubungo", "Temeke", "Kinondoni", "Kigamboni"],
    Arusha: ["Arusha mjini", "Babati", "ngorongoro"],
  };

  try {
    if (!city) {
      res.status(404).json(Regions[city]);
    }

    res.status(200).json(Regions[city]);
  } catch (error) {
    console.log(error);
  }
};

exports.getWards = async (req, res, next) => {
  let _district = req.query.district;
  let Wards = {
    Ilala: ["tabata", "kinyerezi", "G/mboto"],
    Ubungo: ["mbezi", "kimara", "bucha"],
    Temeke: ["magomeni", "mbagala", "Duce"],
    Kinondoni: ["ubungo", "argentina", "manzese"],
    Kigamboni: ["mboni", "feri", "mnadani"],
    "Arusha mjini": ["matejoo", "feni", "uzunguni"],
    Babati: ["weria", "towstone", "wete"],
    ngorongoro: ["doss", "weru", "kimbu"],
  };
  try {
    if (!_district) {
      console.log("teh teh");
      res.status(404).json({
        message: "no street found",
      });
    }

    res.status(200).json(Wards[_district]);
    console.log("gotcha");
  } catch (error) {
    console.log(error);
  }
};
