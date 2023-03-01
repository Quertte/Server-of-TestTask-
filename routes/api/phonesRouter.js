const router = require('express').Router();
const { PhoneNumber } = require('../../db/models');

router.route('/')
  .get(async (req, res) => {
    try {
      const phones = await PhoneNumber.findAll();
      res.json(phones);
    } catch ({ message }) {
      res.json({ error: message });
    }
  })
  .post(async (req, res) => {
    const {
      code, number, country, flag,
    } = req.body;
    try {
      const newPhone = await PhoneNumber.create({
        code, number, country, flag,
      });
      res.status(201).json(newPhone);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
