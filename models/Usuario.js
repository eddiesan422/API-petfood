const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  pet: {
    name: { type: String, required: true },
    feedingSchedule: {
      monday: { type: Date, required: true },
      tuesday: { type: Date, required: true },
      wednesday: { type: Date, required: true },
      thursday: { type: Date, required: true },
      friday: { type: Date, required: true },
    },
  },
});

module.exports = mongoose.model("User", userSchema);