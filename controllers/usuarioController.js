const CronJob = require('cron').CronJob;
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

userCtrl.receiveDetectionData = async (req, res) => {
    const detectionData = req.body;
    console.log("Datos de detección recibidos:", detectionData[0].label);
    const userId = req.userId;
    const user = await User.findById(userId);

    // Obtén los horarios desde el objeto del usuario (ejemplo para el horario del viernes)
    let startTime = user.pet.feedingSchedule.friday[0].startTime;
    let endTime = user.pet.feedingSchedule.friday[0].endTime;

    console.log(startTime, endTime); // Verificación de los horarios

    // Iniciar el cronjob solo si los horarios están definidos
    if (startTime && endTime) {
        startCronJob(startTime, endTime);
    }

    res.status(200).json({ message: "Datos de detección recibidos correctamente en el backend" });
};

function startCronJob(startTime, endTime){
    const job = new CronJob(
        '*/2 * * * * *', // Ejecutar cada 2 segundos
        function() {
            const currentTime = new Date();
            const start = new Date();
            const end = new Date();
            const [startHours, startMinutes] = startTime.split(':');
            const [endHours, endMinutes] = endTime.split(':');

            start.setHours(startHours, startMinutes, 0);
            end.setHours(endHours, endMinutes, 0);

            if (currentTime >= start && currentTime <= end) {
                console.log('Este mensaje se mostrará cada 2 segundos dentro del horario especificado');
            }
        },
        null,
        true,
        'America/Los_Angeles'
    );

    job.start();
}

userCtrl.getPrivateSchedule = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);

        if (!user) {
            // El usuario no fue encontrado
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(user);
    } catch (error) {
        // Error al buscar el usuario
        res.status(500).json({ message: 'Error al buscar el usuario' });
    }
}


module.exports = userCtrl;
