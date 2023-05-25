const userCtrl = {};
const User = require("../models/User");
const jwt = require("jsonwebtoken");
let {token} = require("morgan");

//Controllers
userCtrl.createUser = async (req, res) => {
    const userData = req.body;
    const newUser = new User({
        name: userData.name,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        pet: {
            name: userData.pet.name,
            feedingSchedule: userData.pet.feedingSchedule
        }
    });
    newUser.password = await newUser.encryptPassword(newUser.password);

    const savedUser = await newUser.save();
    res.json({
        status: "User saved",
    });
};

userCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

userCtrl.getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const UserById = await User.findById(id);

        res.json(UserById);
    } catch (error) {
        res.status(500).json({
            message: "User not found",
            error: error.message
        })
    }
};

userCtrl.receiveDetectionData = (req, res) => {
    const detectionData = req.body;
    console.log("Datos de detección recibidos:", detectionData[0].label);

    res
        .status(200)
        .json({message: "Datos de detección recibidos correctamente"});
};

userCtrl.getPrivateSchedule = (req, res) => {
    res.json([
        {
            hola: 2
        }
    ]);
}

module.exports = userCtrl;
