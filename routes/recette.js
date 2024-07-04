var express = require('express');
var router = express.Router();
const {fetchMarmitonData} = require('../scraper/scraper');
const convertMarmitonScrapedData = require('../scraper/utils/convertMarmitonScrapedData');

/* GET recette to scrap. */
router.get('/', async function(req, res, next) {
  const keyword = req.query.keyword;
  try {
    const dataMarmitonData = await fetchMarmitonData(keyword);
    const convertedMarmitonScrapedData = await convertMarmitonScrapedData(dataMarmitonData)
    res.json(convertedMarmitonScrapedData);
  } catch (error) {
    res.status(500).send('Erreur lors de la récupération des données');
  }
});


module.exports = router;
