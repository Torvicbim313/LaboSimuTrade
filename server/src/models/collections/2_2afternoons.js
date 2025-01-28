import connectDB from "../../database/dbConnection.js";

const db = await connectDB();


class afternoons2_2 {
  static async getAll() {
    const query = 'SELECT * FROM 2_2tardes_ballenas';
    try {
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      throw new Error(`Error al obtener los datos en 2_2tardes_ballenas: ${error.message}`);
    }
  }


}

export default afternoons2_2
