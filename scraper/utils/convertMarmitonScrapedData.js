
async function convertMarmitonScrapedData(data) {
    try {
      return data
    } catch (error) {
      console.error('fetchMarmitonData err', error);
      throw error;
    }
  }
  
  module.exports = convertMarmitonScrapedData;
  