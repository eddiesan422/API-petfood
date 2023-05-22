const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const feedingScheduleItemSchema = new Schema({
    startTime: { type: String, required: true, set: convertToDateTime },
    endTime: { type: String, required: true, set: convertToDateTime },
});

function convertToDateTime(value) {
    const date = new Date(value);
    return date.toString() !== 'Invalid Date' ? date : value;
}

const feedingScheduleSchema = new Schema({
    monday: [feedingScheduleItemSchema],
    tuesday: [feedingScheduleItemSchema],
    wednesday: [feedingScheduleItemSchema],
    thursday: [feedingScheduleItemSchema],
    friday: [feedingScheduleItemSchema],
    saturday: [feedingScheduleItemSchema],
    sunday: [feedingScheduleItemSchema],
});

const userSchema = new Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    pet: {
        name: { type: String, required: true },
        feedingSchedule: { type: feedingScheduleSchema, required: true },
    },
});

userSchema.methods.encryptPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const User = mongoose.model("User", userSchema);

module.exports = User;