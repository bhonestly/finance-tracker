const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const incomeSchema = new Schema(
  {
    title: String,
    amount: Number,
    date: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Income", incomeSchema);