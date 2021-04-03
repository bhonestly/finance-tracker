const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    email: String,
    avatar: String,
    googleId: String,
    expenses: [{type: Schema.Types.ObjectId, ref: "Expense"}],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
