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
        return this.parseData(results.data)
    }

    /**
     * Parses the pulled webpage
     * @param {The web data to parse} data 
     */
    parseData(data) {
        // Dictionary of type to list of items
        let results = {}
        this.types.forEach(type => {
            results[type] = []
        })

        let $ = cheerio.load(data)

        // For each table row that is one of the types
		$('tr').each((_idx, el) => {

            let dataGroup = $(el).attr("data-group")
            if (this.types.includes(dataGroup)) {
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

                results[dataGroup].push(parsedJson)
            }
        })

        return results
    }
}

// Exports
module.exports = {
    DataMan: DataMan
}