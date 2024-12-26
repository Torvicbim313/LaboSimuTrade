import connectDB from "../../database/dbConnection.js";

const db = await connectDB();


class whalesDataAndPrices {
  static async getAll() {
    const query = 'SELECT * FROM trading_data';
    try {
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      throw new Error(`Error al obtener los datos: ${error.message}`);
    }
  }

  static async getPaginated(offset, limit) {
    const query = 'SELECT * FROM trading_data ORDER BY ID DESC LIMIT ? OFFSET ?';
    try {
      const [rows] = await db.query(query, [limit, offset]);
      return rows;
    } catch (error) {
      throw new Error(`Error al obtener los datos paginados: ${error.message}`);
    }
  }

  static async updateById(id, data) {
    const query = "UPDATE trading_data SET ? WHERE ID = ?";
    try {
      await db.query(query, [data, id]);
    } catch (error) {
      throw new Error(`Error al actualizar el registro: ${error.message}`);
    }
  }

  static async getLast() {
    const query = "SELECT * FROM trading_data ORDER BY ID DESC LIMIT 1";
    try {
      const [rows] = await db.query(query);
      return rows[0]; // Devuelve solo el último registro
    } catch (error) {
      throw new Error(`Error al obtener el último registro: ${error.message}`);
    }
  }
}

export default whalesDataAndPrices
