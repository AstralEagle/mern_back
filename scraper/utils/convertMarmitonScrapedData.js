const cheerio = require('cheerio');
const {fetchSingleMarmitonData} = require('../scraper');
const convertMarmitonSignleScrapedData = require('../utils/convertMarmitonSignleScrapedData')


async function convertMarmitonScrapedData(data) {
    try {
        const $ = cheerio.load(data.data);

        const results = $('.recipe-card-algolia').toArray();

        const recipeResultsPromises =  results.map(async (element, index) => {
            const name = $(element).find('.recipe-card__title').text().trim()
            const image = $(element).find('img').attr('data-srcset')
            const recettelink = $(element).find('.recipe-card-link').attr('href')

            const singleMarmitonData = await fetchSingleMarmitonData(recettelink)
            const convertedMarmitonSignleScrapedData = await convertMarmitonSignleScrapedData(singleMarmitonData)

            return {
                "name": name,
                "preparation_time": convertedMarmitonSignleScrapedData.preparation_time,
                "rest_time": convertedMarmitonSignleScrapedData.rest_time,
                "cooking_time": convertedMarmitonSignleScrapedData.cooking_time,
                "dificuty": convertedMarmitonSignleScrapedData.dificuty,
                "price": convertedMarmitonSignleScrapedData.price,
                "image":image,
                "ingredients": convertedMarmitonSignleScrapedData.ingredients,
                "instructions": convertedMarmitonSignleScrapedData.instructions,
            }
        });

        
        const recipeResults = await Promise.all(recipeResultsPromises);

        return recipeResults
      
    } catch (error) {
      console.error('fetchMarmitonData err', error);
      throw error;
    }
  }
  
  module.exports = convertMarmitonScrapedData;
  