/*

Here are some useful URLs

-- Get the page for durability (stills needs scraping)
https://rustlabs.com/item/{itemName}#tab=destroyed-by;filter=0,1,1,1,1;sort=4,0,3


*/

// Types of queries that can be made
enum QueryType {
    Durability
}

// Base Query Class
class Query {
    query: string

    // Empty constructor
    constructor() {
        this.query = ""
    }

    // Execute the query
    run() {

    }

    // Return the query as a string
    getQuery(): string {
        return this.query;
    }
}

// Durability Query
class DurabilityQuery extends Query {
    constructor(itemName: string) {
        super()
        this.query = `https://rustlabs.com/item/${itemName}#tab=destroyed-by;filter=0,1,1,1,1;sort=4,0,3`
    }
}

// Helper function to build the query object
function buildQuery(queryType: QueryType, itemName: string): Query {
    if (queryType == QueryType.Durability) {
        return new DurabilityQuery(itemName)
    } else {
        return new Query()
    }
}

function main() {
    var armoredDoor: Query = buildQuery(QueryType.Durability, 'armored-door');
    console.log(armoredDoor.getQuery());
}
main()