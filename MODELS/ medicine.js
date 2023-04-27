const express = require("express");
const mongoose = require("mongoose");

//const schema = mongoose.Schema();

const Schema = mongoose.Schema;

const medicine = new Schema(
  {
    Title: {
      type: String,
      required: true,
    },

    Price: {
      type: Number,
      required: true,
    },

    ImageUrls: {
      type: String,
      required: true,
    },

    Description: {
      type: String,
      required: true,
    },

    City: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("medicine", medicine);
