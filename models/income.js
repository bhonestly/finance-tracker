const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const incomeSchema = new Schema(
  {
    title: String,
    amount: Number,
    date: Date,
    timePeriod: {type: String, enum: ['weekly', 'biweekly', 'monthly']},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Income", incomeSchema);