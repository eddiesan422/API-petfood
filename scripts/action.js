// const userCtrl = require('../');
// const CronJob = require('cron').CronJob;
//
//
// const startTime = "15:31";
// const endTime = "17:00";
//
// const job = new CronJob(
//     '*/2 * * * * *', // Ejecutar cada 2 segundos
//     function() {
//         const currentTime = new Date();
//         const start = new Date();
//         const end = new Date();
//         const [startHours, startMinutes] = startTime.split(':');
//         const [endHours, endMinutes] = endTime.split(':');
//
//         start.setHours(startHours, startMinutes, 0);
//         end.setHours(endHours, endMinutes, 0);
//
//         if (currentTime >= start && currentTime <= end) {
//             console.log('Este mensaje se mostrará cada 2 segundos dentro del horario especificado');
//         }
//     },
//     null,
//     true,
//     'America/Los_Angeles'
// );
//
// job.start();
