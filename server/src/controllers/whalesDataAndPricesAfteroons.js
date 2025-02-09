import models from '../models/index.js';

export const getAllWhalesAndPricesData = async (req, res) => {
  try {
    const data = await models.whalesDataAndPricesAfternoons.getAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPaginatedWhalesAndPricesData = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const data = await models.whalesDataAndPricesAfternoons.getPaginated(parseInt(offset), parseInt(limit));
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateByIdWhalesAndPricesData = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updateData = req.body;

    await whalesDataAndPricesAfternoons.updateById(id, updateData);
    res.status(200).json({message: "Updated record succesfully"})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}
