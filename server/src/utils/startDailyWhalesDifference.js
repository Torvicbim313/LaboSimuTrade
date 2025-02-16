// import dailyWhalesDataWriter from "../services/schedulers/dailyWhalesDataWriter.js";
// import dailyWhalesDataWriterAfternoons from "../services/schedulers/dailyWhalesDataWriterAfternoons.js";



// const dayInMilliseconds = 24 * 60 * 60 * 1000;
// // const targetHour = 8; // Hora
// // const targetMinute = 13; // Minuto


// export function calculateTimeUntilTarget (targetHour, targetMinute)  {
//   const now = new Date();
//   const currentHour = now.getHours();
//   const currentMinute = now.getMinutes();

//   return targetHour > currentHour || (targetHour === currentHour && targetMinute > currentMinute)
//     ? (targetHour - currentHour) * 60 * 60 * 1000 + (targetMinute - currentMinute) * 60 * 1000
//     : new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, targetHour, targetMinute, 0, 0) - now;
// }

// // function restartApp() {
// //   console.log('Reiniciando la aplicación...');
// //   exec('npx pm2 restart all', (err, stdout, stderr) => {
// //     if (err) {
// //       console.error(`Error al reiniciar la aplicación: ${err.message}`);
// //       return;
// //     }
// //     console.log(stdout);
// //     console.error(stderr);
// //   });
// // }


// let timeUntilTarget = calculateTimeUntilTarget(8,13);


// export const startdailyWhalesDataWriter = () => {
//   setTimeout(() => {
//     dailyWhalesDataWriter();
//     // restartApp()
//     timeUntilTarget = calculateTimeUntilTarget(8,13);
//     setInterval(dailyWhalesDataWriter, dayInMilliseconds);
//   }, timeUntilTarget);
// }



// export const startdailyWhalesDataWriterAfternoons = () => {
//   setTimeout(() => {
//     dailyWhalesDataWriterAfternoons();
//     // restartApp()
//     timeUntilTarget = calculateTimeUntilTarget(17,13);
//     setInterval(dailyWhalesDataWriterAfternoons, dayInMilliseconds);
//   }, timeUntilTarget);
// }

import dailyWhalesDataWriter from "../services/schedulers/dailyWhalesDataWriter.js";
import dailyWhalesDataWriterAfternoons from "../services/schedulers/dailyWhalesDataWriterAfternoons.js";

const dayInMilliseconds = 24 * 60 * 60 * 1000;

// Función para calcular el tiempo hasta la hora objetivo
export function calculateTimeUntilTarget(targetHour, targetMinute) {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  return targetHour > currentHour || (targetHour === currentHour && targetMinute > currentMinute)
    ? (targetHour - currentHour) * 60 * 60 * 1000 + (targetMinute - currentMinute) * 60 * 1000
    : new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, targetHour, targetMinute, 0, 0) - now;
}

// Lanzar dailyWhalesDataWriter a las 8:13 AM
export const startdailyWhalesDataWriter = () => {
  const timeUntilMorning = calculateTimeUntilTarget(8, 13);

  setTimeout(() => {
    dailyWhalesDataWriter();
    setInterval(dailyWhalesDataWriter, dayInMilliseconds); // Se ejecutará cada 24 horas después
  }, timeUntilMorning);
};

// Lanzar dailyWhalesDataWriterAfternoons a las 5:13 PM (17:13)
export const startdailyWhalesDataWriterAfternoons = () => {
  // const timeUntilAfternoon = calculateTimeUntilTarget(17, 13);
  const timeUntilAfternoon = calculateTimeUntilTarget(17, 50);


  setTimeout(() => {
    dailyWhalesDataWriterAfternoons();
    setInterval(dailyWhalesDataWriterAfternoons, dayInMilliseconds); // Se ejecutará cada 24 horas después
  }, timeUntilAfternoon);
};
