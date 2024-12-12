import dailyWhalesDataWriter from "../services/dailyWhalesDataWriter.js";



const dayInMilliseconds = 24 * 60 * 60 * 1000;
const targetHour = 8; // Hora
const targetMinute = 13; // Minuto


export function calculateTimeUntilTarget ()  {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  return targetHour > currentHour || (targetHour === currentHour && targetMinute > currentMinute)
    ? (targetHour - currentHour) * 60 * 60 * 1000 + (targetMinute - currentMinute) * 60 * 1000
    : new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, targetHour, targetMinute, 0, 0) - now;
}

// function restartApp() {
//   console.log('Reiniciando la aplicación...');
//   exec('npx pm2 restart all', (err, stdout, stderr) => {
//     if (err) {
//       console.error(`Error al reiniciar la aplicación: ${err.message}`);
//       return;
//     }
//     console.log(stdout);
//     console.error(stderr);
//   });
// }


let timeUntilTarget = calculateTimeUntilTarget();


export const startdailyWhalesDataWriter = () => {
  setTimeout(() => {
    dailyWhalesDataWriter();
    // restartApp()
    timeUntilTarget = calculateTimeUntilTarget();
    setInterval(dailyWhalesDataWriter, dayInMilliseconds);
  }, timeUntilTarget);
}

