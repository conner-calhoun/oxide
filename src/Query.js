const DataMan = require("./DataMan")

/**
 * Query Types
 */
const QueryType = {
    Durability: "Durability"
}

/**
 * Base query class
 */
class Query {

    /**
     * Empty constructor
     */
    constructor() {
        this.dataBoy = new DataMan.DataMan()

        this.itemName = ""
        this.query = ""
    }

    /**
     * Run the query, return the results
     */
    async run() {
        console.log(`Running query: ${this.query}`)

        // TODO: Either pull data from scraper or from data store
        let data = await this.dataBoy.getData(this.itemName, this.query)
        return data
    }

    /**
     * Access the query string
     */
    getQuery() {
        return this.query
    }
}

/**
 * Durability Query subtype
 */
class DurabilityQuery extends Query {

    /**
     * Builds the durabilty query
     * @param itemName -- The name of the item to query for
     */
    constructor(itemName) {
        super()
        this.itemName = itemName
        this.query = `https://rustlabs.com/item/${itemName}#tab=destroyed-by;filter=0,1,1,1,0;sort=4,0,3`
    }
}

/**
 * Exported query class to build and run queries
 */
class QueryMan {

    /**
     * Runs a durability query
     * @param queryType -- The type of query to run
     * @param itemName -- The item name to run the query for
     */
    runQuery(queryType, itemName) {
        this.buildQuery(queryType, itemName).run()
    }

    /**
     * Builds query of the provided type
     * @param queryType -- The type of query
     * @param itemName -- The name of the item
     * @return The new query
     */
    buildQuery(queryType, itemName) {
        // TODO: Sanitize and return the closest item name to the provided one

        switch(queryType) {
            case QueryType.Durability:
                return new DurabilityQuery(itemName)
            default:
                return new Query()
        }
    }

}

// Exports
module.exports = {
    QueryType: QueryType,
    QueryMan: QueryMan
}