import models from '../models/index.js';

export const getAllWhalesAndPricesData = async (req, res) => {
  try {
    const data = await models.whalesDataAndPrices.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPaginatedWhalesAndPricesData = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const data = await models.whalesDataAndPrices.getPaginated(parseInt(offset), parseInt(limit));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
