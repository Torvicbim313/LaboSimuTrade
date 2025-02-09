import pool from "../../database/dbConnection.js";



class whalesDataAndPricesAfternoons {
  static async getAll() {
    const db = await pool.getConnection();
    const query = 'SELECT * FROM trading_data_afternoons';
    try {
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      throw new Error(`Error al obtener los datos: ${error.message}`);
    } finally {
      db.release();  // IMPORTANTE: liberar la conexión después de usarla
  }
  }

  static async getPaginated(offset, limit) {
    const db = await pool.getConnection();;
    const query = 'SELECT * FROM trading_data_afternoons ORDER BY ID DESC LIMIT ? OFFSET ?';
    try {
      const [rows] = await db.query(query, [limit, offset]);
      return rows;
    } catch (error) {
      throw new Error(`Error al obtener los datos paginados: ${error.message}`);
    } finally {
      db.release();  // IMPORTANTE: liberar la conexión después de usarla
  }
  }

  static async updateById(id, data) {
    const db = await pool.getConnection();;
    const query = "UPDATE trading_data_afternoons SET ? WHERE ID = ?";
    try {
      await db.query(query, [data, id]);
    } catch (error) {
      throw new Error(`Error al actualizar el registro: ${error.message}`);
    } finally {
      db.release();  // IMPORTANTE: liberar la conexión después de usarla
  }
  }

  static async getLast() {
    const db = await pool.getConnection();;
    const query = "SELECT * FROM trading_data_afternoons ORDER BY ID DESC LIMIT 1";
    try {
      const [rows] = await db.query(query);
      return rows[0]; // Devuelve solo el último registro
    } catch (error) {
      throw new Error(`Error al obtener el último registro: ${error.message}`);
    } finally {
      db.release();  // IMPORTANTE: liberar la conexión después de usarla
  }
  }
}

export default whalesDataAndPricesAfternoons;
