/**
 * Query Types
 */
export enum QueryType {
    Durability
}

/**
 * Base query class
 */
class Query {
    query: string;

    /**
     * Empty constructor
     */
    constructor() {
        this.query = "";
    }

    /**
     * Run the query, return the results
     */
    run(): string {
        console.log(`Running query: ${this.query}`);

        // TODO: Either pull data from scraper or from data store
        return "";
    }

    /**
     * Access the query string
     */
    getQuery(): string {
        return this.query;
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
    constructor(itemName: string) {
        super();
        this.query = `https://rustlabs.com/item/${itemName}#tab=destroyed-by;filter=0,1,1,1,0;sort=4,0,3`;
    }
}

/**
 * Exported query class to build and run queries
 */
export class QueryMan {

    /**
     * Runs a durability query
     * @param queryType -- The type of query to run
     * @param itemName -- The item name to run the query for
     */
    public runQuery(queryType: QueryType, itemName: string) {
        this.buildQuery(queryType, itemName).run();
    }

    /**
     * Builds query of the provided type
     * @param queryType -- The type of query
     * @param itemName -- The name of the item
     */
    private buildQuery(queryType: QueryType, itemName: string): Query {

        // TODO: Sanitize and return the closest item name to the provided one

        switch(queryType) {
            case QueryType.Durability:
                return new DurabilityQuery(itemName);
            default:
                return new Query();
        }
    }

}