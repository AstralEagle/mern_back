
async function fetchMarmitonData(keyword) {
  const url = `https://www.marmiton.org/recettes/recherche.aspx?aqt=${keyword}`;
  try {
    const fetch = (await import('node-fetch')).default;

    const response = await fetch(url, {
        "headers": {
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
          "priority": "u=0, i",
          "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"macOS\"",
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "same-origin",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
          "Referer": "https://www.marmiton.org/",
          "Referrer-Policy": "no-referrer-when-downgrade"
        },
        "body": null,
        "method": "GET"
      });;
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    }

    return {
        "data": 
        await response.text()
    }
    
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
    throw error;
  }
}

module.exports = fetchMarmitonData;
