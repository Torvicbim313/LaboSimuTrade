import connectDB from "../database/dbConnection.js";

const db = await connectDB();

const highSellSignal = async (currentSlice = null) => {
  try {
    let data;

    if (currentSlice) {
      // Si se proporciona currentSlice, úsalo
      data = currentSlice;
    } else {
      // Si no se proporciona, consulta los últimos 7 registros de la base de datos
      const query = `SELECT FECHA, DIFERENCIA, PRECIO_COMPRA, PRECIO_VENTA 
                     FROM trading_data 
                     ORDER BY ID DESC 
                     LIMIT 7`;
      const [rows] = await db.query(query);
      data = rows.reverse(); // Asegúrate de que los datos estén en orden cronológico
    }

    if (data.length < 5) {
      throw new Error("No hay suficientes datos para realizar el análisis.");
    }

    // Estructura los datos en un formato manejable
    const historicalData = {
      today: data[data.length - 1],
      yesterday: data[data.length - 2],
      twoDaysAgo: data[data.length - 3],
      threeDaysAgo: data[data.length - 4],
      fourDaysAgo: data[data.length - 5],
    };

    // Calcular los precios promedio
    const wbtcAvgPrices = [
      (historicalData.fourDaysAgo.PRECIO_COMPRA + historicalData.fourDaysAgo.PRECIO_VENTA) / 2,
      (historicalData.threeDaysAgo.PRECIO_COMPRA + historicalData.threeDaysAgo.PRECIO_VENTA) / 2,
      (historicalData.twoDaysAgo.PRECIO_COMPRA + historicalData.twoDaysAgo.PRECIO_VENTA) / 2,
      (historicalData.yesterday.PRECIO_COMPRA + historicalData.yesterday.PRECIO_VENTA) / 2,
      (historicalData.today.PRECIO_COMPRA + historicalData.today.PRECIO_VENTA) / 2,
    ];

    // Función para calcular las pendientes
    const calculateSlope = (data) => {
      const slopes = [];
      for (let i = 1; i < data.length; i++) {
        const y1 = data[i - 1];
        const y2 = data[i];
        const slope = ((y2 - y1) / y1) * 100;
        slopes.push(slope);
      }
      return slopes;
    };

    const averageSlopes = calculateSlope(wbtcAvgPrices);

    // Calcular las pendientes promedio para cada rampa
    const calculateAverageSlope = (data) => {
      const sumSlopes = data.reduce((sum, slope) => sum + slope, 0);
      return sumSlopes / data.length;
    };

    // Dividir las pendientes en rampas
    const ramp1 = averageSlopes.slice(0, Math.floor(averageSlopes.length / 6));
    const ramp2 = averageSlopes.slice(Math.floor(averageSlopes.length / 6), Math.floor(2 * averageSlopes.length / 6));
    const ramp3 = averageSlopes.slice(Math.floor(2 * averageSlopes.length / 6), Math.floor(3 * averageSlopes.length / 6));
    const ramp4 = averageSlopes.slice(Math.floor(3 * averageSlopes.length / 6), Math.floor(4 * averageSlopes.length / 6));
    const ramp5 = averageSlopes.slice(Math.floor(4 * averageSlopes.length / 6), Math.floor(5 * averageSlopes.length / 6));
    const ramp6 = averageSlopes.slice(Math.floor(5 * averageSlopes.length / 6));

    // Calcular la media de las pendientes de cada rampa
    const averageRamp1 = calculateAverageSlope(ramp1);
    const averageRamp2 = calculateAverageSlope(ramp2);
    const averageRamp3 = calculateAverageSlope(ramp3);
    const averageRamp4 = calculateAverageSlope(ramp4);
    const averageRamp5 = calculateAverageSlope(ramp5);
    const averageRamp6 = calculateAverageSlope(ramp6);

    // Evaluar condiciones de venta
    const rampsDecelerating = averageRamp6 < averageRamp5 && averageRamp5 < averageRamp4;

    const firstDaysSlopes = averageSlopes.slice(0, Math.floor(averageSlopes.length / 2));
    const lastDaysSlopes = averageSlopes.slice(Math.floor(averageSlopes.length / 2));

    const averageFirstDaysSlope = calculateAverageSlope(firstDaysSlopes);
    const averageLastDaysSlope = calculateAverageSlope(lastDaysSlopes);

    return (
      averageFirstDaysSlope > 0 &&
      rampsDecelerating &&
      historicalData.today.DIFERENCIA < 0
    );
  } catch (error) {
    console.error("Error al procesar datos para la señal de venta:", error);
    return false; // Devuelve false si hay un error
  }
};





const backtest = async () => {
  try {
    // Consulta para obtener todos los datos ordenados por ID
    const query = `SELECT ID, FECHA, DIFERENCIA, PRECIO_COMPRA, PRECIO_VENTA 
                   FROM trading_data 
                   ORDER BY ID ASC`;

    const [rows] = await db.query(query);
    const sellDates = [];

    // Comienza desde la quinta fila (índice 4) y usa ventanas de 7 filas
    for (let i = 4; i < rows.length; i++) {
      // Toma una ventana de 7 registros hacia atrás desde el índice actual
      const currentSlice = rows.slice(Math.max(0, i - 6), i + 1);

      // Llama a la función highSellSignal con los datos de la ventana actual
      const shouldSell = await highSellSignal(currentSlice);

      if (shouldSell) {
        console.log(`Se debería vender en ${rows[i].FECHA}`);
        sellDates.push(rows[i].FECHA);

        // Actualizar la base de datos para marcar como venta
        const updateQuery = `UPDATE trading_data SET VENTA = true WHERE ID = ?`;
        await db.query(updateQuery, [rows[i].ID]);
        console.log(`Registro ID ${rows[i].ID} actualizado como VENTA = true`);
      }
    }

    return sellDates;
  } catch (error) {
    console.error("Error en el backtesting:", error);
    return [];
  }
};




//Esto es para ejecutar el backtest cuando llamas al modulo
const sellDates = await backtest();
console.log('Fechas señal venta modo ALTA FRECUENCIA:', sellDates);



export default highSellSignal;
