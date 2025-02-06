import pool from "../../../database/dbConnection.js";

const db = await pool.getConnection();

const isOperationInTable = async (tableName) => {
  try {
    const [rows] = await db.query(
      `SELECT accion FROM ?? ORDER BY id DESC LIMIT 1`, 
      [tableName]
    );

    return rows.length > 0 ? rows[0].accion : null;
  } catch (error) {
    console.error(`Error obteniendo la última acción de la tabla ${tableName}:`, error);
    return null;
  } finally {
    db.release();  // IMPORTANTE: liberar la conexión después de usarla
}
};

export default isOperationInTable;
