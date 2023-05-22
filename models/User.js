const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const {Schema} = mongoose;

const feedingScheduleSchema = new Schema({
    monday: [
        {
            startTime: {type: Date, required: true},
            endTime: {type: Date, required: true},
        },
    ],
    tuesday: [
        {
            startTime: {type: Date, required: true},
            endTime: {type: Date, required: true},
        },
    ],
    wednesday: [
        {
            startTime: {type: Date, required: true},
            endTime: {type: Date, required: true},
        },
    ],
    thursday: [
        {
            startTime: {type: Date, required: true},
            endTime: {type: Date, required: true},
        },
    ],
    friday: [
        {
            startTime: {type: Date, required: true},
            endTime: {type: Date, required: true},
        },
    ],
    saturday: [
        {
            startTime: {type: Date, required: true},
            endTime: {type: Date, required: true},
        },
    ],
    sunday: [
        {
            startTime: {type: Date, required: true},
            endTime: {type: Date, required: true},
        },
    ],
});

const userSchema = new Schema({
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    pet: {
        name: {type: String, required: true},
        feedingSchedule: {type: feedingScheduleSchema, required: true},
    },
});

userSchema.methods.encryptPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const User = mongoose.model("User", userSchema);

module.exports = User;