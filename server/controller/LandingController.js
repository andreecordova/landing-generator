const Landing = require("../models/Landing");

const saveLanding = async (req, res) => {
  try {
    const { content, image,prompt } = req.body;
    const newLanding = new Landing({ content, image, prompt });
    await newLanding.save();
    res.status(201).json(newLanding);
  } catch (error) {
    res.status(500).json({ error: "Error al guardar la landing" });
  }
};

const getAllLandings = async (req, res) => {
  try {
    const landings = await Landing.find().sort({ createdAt: -1 });
    res.json(landings);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las landings" });
  }
};

module.exports = {
  saveLanding,
  getAllLandings,
};
