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
}

export default whalesDataAndPrices
