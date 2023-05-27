const CronJob = require('cron').CronJob;
const {Board, Servo} = require("johnny-five");
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
    let startTime = user.pet.feedingSchedule.tuesday[0].startTime;
    let endTime = user.pet.feedingSchedule.tuesday[0].endTime;

    console.log('Horarios del usuario: ', startTime, endTime); // Verificación de los horarios

    // Iniciar el cronjob solo si los horarios están definidos
    if (startTime && endTime) {
        startCronJob(startTime, endTime);
    }

    res.status(200).json({message: "Datos de detección recibidos correctamente en el backend"});
};

function startCronJob(startTime, endTime) {

    const board = new Board({
        port: "COM3",
    });

    board.on("ready", () => {
        const servo = new Servo(13); // Conectado a pin 13
        let counter = 0;

        servo.to(0); // Mueve el servomotor a 0 grados al inicio

        const job = new CronJob("*/5 * * * * *", function () {
            const currentTime = new Date().toLocaleTimeString([], {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
            });

            if (currentTime >= startTime && currentTime <= endTime && counter < 3) {
                servo.to(20); // Mueve el servomotor a 20 grados
                setTimeout(() => {
                    servo.to(0); // Vuelve a la posición de 0 grados después de 1 segundo
                }, 1000);
                counter++;
            }
        });

        // Inicia la ejecución del job
        job.start();
    });

    board.on("error", (err) => {
        console.log("Error: ", err);
    });
}

userCtrl.getPrivateSchedule = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);

        if (!user) {
            // El usuario no fue encontrado
            return res.status(404).json({message: 'Usuario no encontrado'});
        }

        res.json(user);
    } catch (error) {
        // Error al buscar el usuario
        res.status(500).json({message: 'Error al buscar el usuario'});
    }
}


module.exports = userCtrl;
