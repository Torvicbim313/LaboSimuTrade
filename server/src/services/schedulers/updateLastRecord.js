import whalesDataAndPrices from "../../models/collections/whalesDataAndPrices.js";
import highSellSignal from "../events/highSellSignal.js";

const updateLastRecord = async () => {
  try {
    // Obtén el último registro
    const lastRecord = await whalesDataAndPrices.getLast();
    if (!lastRecord) {
      console.log("No hay registros en la base de datos.");
      return;
    }

    // Evalúa la señal de venta
    const signal = await highSellSignal();


    if (signal) {
      // Actualiza el campo "VENTA" del último registro
      await whalesDataAndPrices.updateById(lastRecord.ID, { VENTA: true });
      console.log(`Registro actualizado: ID ${lastRecord.ID} marcado como VENTA.`);
    } else {
      console.log(`Sin señal de venta para el registro ID ${lastRecord.ID}.`);
    }
  } catch (error) {
    console.error("Error al actualizar el último registro:", error);
  }
};

export default updateLastRecord;
