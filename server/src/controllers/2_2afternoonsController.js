import models from '../models/index.js';

export const afternoons2_2 = async (req, res) => {
  try {
    const data = await models.afternoons2_2.getAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



