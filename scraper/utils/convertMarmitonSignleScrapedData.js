const cheerio = require('cheerio');


async function convertMarmitonSignleScrapedData(data) {
    try {
        const $ = cheerio.load(data.data);

        const recetteInfos = $('.recipe-primary__item').toArray().map(async (element, index) => {
            return {
                index: $(element).text().trim()
            }
           
        })

        const preparationInfos = $('.recipe-preparation__time').find('.time__details').find('div').toArray().map(async (element, index) => {
            const timeInfo = $(element).find('div').text().trim()
            if (timeInfo != ""){
                return {
                    index: $(element).find('div').text().trim()
                }
            }
        })

        const ingredientsPromise = $('.card-ingredient').toArray().map(async (element, index) => {
            const ingredientName = $(element).attr('data-name')
            const ingredientQte = `${$(element).find('.card-ingredient-quantity').attr('data-ingredientquantity')} ${$(element).find('.unit').attr('data-unitplural')}`

            return  {
                "name": ingredientName,
                "number": ingredientQte

            }
        })

        const ingredient = await Promise.all(ingredientsPromise);
        
        const instructionsPromise = $('.recipe-step-list').find('.recipe-step-list__container').toArray().map(async (element, index) => {
            return $(element).find('p').text().trim()
        
        })

        const instructions = await Promise.all(instructionsPromise);

        return {  
            "preparation_time": (await preparationInfos?.[0]).index,
            "rest_time": (await preparationInfos?.[2]).index,
            "cooking_time": (await preparationInfos?.[4]).index,
            "dificuty": (await recetteInfos?.[1]).index,
            "price": (await recetteInfos?.[2]).index,
            "ingredients": ingredient,
            "instructions": instructions,
        }
      
    } catch (error) {
      console.error('convertMarmitonSignleScrapedData err', error);
      throw error;
    }
  }
  
  module.exports = convertMarmitonSignleScrapedData;
  