const axios = require("axios")
const cheerio = require("cheerio")

/**
 * The Data class, can scrape or pull from database
 */
class DataMan {

    /**
     * Sets the types of items we're looking for
     */
    constructor() {
        this.types = ["explosive", "melee", "throw"]
    }

    /**
     * Gets the JSON data either from the database or by scraping
     * @param {The url to get data for} url 
     */
    async getData(itemName, url) {
        // TODO: Implement Redis data store
        let results = await axios.get(url)
        
        // Parse the response data here and return the json
        let rawData = this.parseData(results.data)
        return rawData
    }

    /**
     * Parses the pulled webpage
     * @param {The web data to parse} data 
     */
    parseData(data) {
        let results = []
        let $ = cheerio.load(data)

        // For each table row that is one of the types
		$('tr').each((_idx, el) => {
            if (this.types.includes($(el).attr("data-group"))) {
                let parsedJson = {}

                $(el).children('td').each((i, elem) => {
                    switch(i) {
                        case 1:
                            parsedJson["name"] = $(elem).text().trim()
                            break
                        case 2:
                            parsedJson["quantity"] = $(elem).text().trim()
                            break
                        case 3:
                            parsedJson["time"] = $(elem).text().trim()
                            break
                        case 4:
                            parsedJson["fuel"] = $(elem).text().trim()
                            break
                        case 5:
                            parsedJson["sulfur"] = $(elem).text().trim()
                            break
                    }
                })

                results.push(parsedJson)
            }
        })

        return results
    }
}

// Exports
module.exports = {
    DataMan: DataMan
}