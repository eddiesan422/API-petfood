const userCtrl = {};
const User = require("../models/User");

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
    newUser.password=await newUser.encryptPassword(newUser.password);

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
    const {id} = req.params;
    const UserById = await User.findById(id);
    res.json(UserById);
};

userCtrl.receiveDetectionData = (req, res) => {
    const detectionData = req.body;
    console.log("Datos de detección recibidos:", detectionData[0].label);

    res
        .status(200)
        .json({message: "Datos de detección recibidos correctamente"});
};

module.exports = userCtrl;
