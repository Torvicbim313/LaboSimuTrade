import whalesDataAndPricesAfternoons from "../../models/collections/whalesDataAndPricesAfternoons.js";
import highSellSignalAfternoons from "../events/highSellSignalAfternoons.js";

const updateLastRecordAfternoons = async () => {
  try {
    // Obtén el último registro
    const lastRecord = await whalesDataAndPricesAfternoons.getLast();
    if (!lastRecord) {
      console.log("No hay registros en la base de datos.");
      return;
    }

    // Evalúa la señal de venta
    const signal = await highSellSignalAfternoons();


    if (signal) {
      // Actualiza el campo "VENTA" del último registro
      await whalesDataAndPricesAfternoons.updateById(lastRecord.ID, { VENTA: true });
      console.log(`Registro actualizado: ID ${lastRecord.ID} marcado como VENTA.`);
    } else {
      console.log(`Sin señal de venta para el registro ID ${lastRecord.ID}.`);
    }
  } catch (error) {
    console.error("Error al actualizar el último registro:", error);
  }
};

export default updateLastRecordAfternoons;
