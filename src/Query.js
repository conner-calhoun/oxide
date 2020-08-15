const DataMan = require("./DataMan")

// The object that gathers the data
var dataBoy = new DataMan.DataMan()

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
     * Initialize values
     */
    constructor() {
        // The name of the item being queried
        this.itemName = ""

        // The url being queried
        this.query = ""
    }

    /**
     * Run the query, return the results
     */
    async run() {
        // TODO: Either pull data from scraper or from data store
        let data = await dataBoy.getData(this.itemName, this.query)
        return data
    }

    /**
     * Accessor for the query string
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
     * @param {The name of the item to query for} itemName
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
     * Builds and runs a query
     * @param {The type of query to run} queryType
     * @param {The item name to run the query for} itemName
     */
    runQuery(queryType, itemName) {
        this.buildQuery(queryType, itemName).run()
    }

    /**
     * Builds query of the provided type
     * @param {The type of query} queryType
     * @param {The name of the item} itemName
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