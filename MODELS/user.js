const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const normalSchema = new Schema({
  First_name: {
    type: String,
    required: true,
  },
  Last_name: {
    type: String,
    required: true,
  },

  Phone: {
    type: String,
    required: true,
  },

  Email: {
    type: String,
    required: true,
  },

  Password: {
    type: String,
    required: true,
  },

  profileImageUrl: {
    type: String,
    required: false,
  },

  Houses: [
    {
      type: Schema.Types.ObjectId,
      ref: "asset",
      default: null,
    },
  ],

  // Aprroved: {
  //   type: Boolean,
  //   default: false,
  // },
});

module.exports = mongoose.model("User", normalSchema);
