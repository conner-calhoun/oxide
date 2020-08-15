/**

Here are some useful URLs

-- Get the page for durability (stills needs scraping)
https://rustlabs.com/item/{itemName}#tab=destroyed-by;filter=0,1,1,1,0;sort=4,0,3

*/

const query = require("./Query")
const sanitizer = require("./Sanitizer")
const config = require("../data/bot.json")
const discord = require("discord.js")

/** Qman can run queries based on the type */
var qman = new query.QueryMan()
var client = new discord.Client()

client.login(config.bot_token)

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})
 
client.on('message', msg => {
    // For now send the query any time there is a new message
    if (msg.content.includes("!oxide")) {
        
        // Build query, display link
        q = qman.buildQuery(query.QueryType.Durability, 'armored-door')
        
        // Run the query and display results
        q.run().then((res) => {
            msg.channel.send(q.getQuery())

            let allItems = ""
            res.forEach(item => {
                let dataStr = `> **${item["name"]}**\tQuantity: ${item["quantity"]}\tTime: ${item["time"]}\tSulfur: ${item["sulfur"]}`
                allItems += dataStr + "\n"
            })
            
            msg.channel.send(allItems)
        })
    }
})