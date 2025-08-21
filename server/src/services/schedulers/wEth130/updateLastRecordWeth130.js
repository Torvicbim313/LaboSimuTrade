import whalesDataAndPricesWeth130 from "../../../models/collections/wEth_130/whalesDataAndPricesWeth130.js";
import highSellSignalWeth from "../../events/wEth/highSellSignalWeth.js";

const updateLastRecordWeth = async () => {
  try {
    // Obtén el último registro
    const lastRecord = await whalesDataAndPricesWeth130.getLast();
    if (!lastRecord) {
      console.log("No hay registros en la base de datos.");
      return;
    }

    // Evalúa la señal de venta
    const signal = await highSellSignalWeth();


    if (signal) {
      // Actualiza el campo "VENTA" del último registro
      await whalesDataAndPricesWeth130.updateById(lastRecord.ID, { VENTA: true });
      console.log(`Registro actualizado: ID ${lastRecord.ID} marcado como VENTA.`);
    } else {
      console.log(`Sin señal de venta para el registro ID ${lastRecord.ID}.`);
    }
  } catch (error) {
    console.error("Error al actualizar el último registro:", error);
  }
};

export default updateLastRecordWeth;
