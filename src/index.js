/**

Main driver for the Oxide bot

*/

const discord = require("discord.js")
const query = require("./Query")
const config = require("../data/config.json")
const itemList = require("../data/itemNames.json")

/** Qman can run queries based on the type */
var qman = new query.QueryMan()
var client = new discord.Client()

// Login to the server using the token from the config
client.login(config.bot_token)

/**
 * Callback for when the bot has successfully logged into the server
 */
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})
 
/**
 * Callback for when the bot percieves a message
 */
client.on('message', msg => {
    let messageData = msg.content.trim().split(" ")
    if (messageData[0] == "!oxide") {

        let item = getItem(messageData)
        if (!item) {
            let errorMessage = `\`usage: !oxide <item_type>\`
**Possible Items:**`
            itemList.forEach(item => {
                errorMessage += "\n\t> " + item
            })

            msg.channel.send(errorMessage)
            return
        }

        // Build query, display link
        q = qman.buildQuery(query.QueryType.Durability, item)
        
        // Run the query and display results
        q.run().then((res) => {
            msg.channel.send(q.getQuery())

            formatResults(res).forEach(itemType => {
                msg.channel.send(itemType)
            })
        })

    }
})

/**
 * Get the item to build the query for
 * @param {The parameter string to pull items from} params 
 */
function getItem(params) {
    if (itemList.includes(params[1])) {
        return params[1].trim()
    } else {
        return null
    }
}

/**
 * Formats the results into a pretty little string that discord can display
 * @param {The results to format} res
 */
function formatResults(res) {
    let typeStrings = []

    for(var key in res) {
        let items = ""
        switch(key) {
            case "throw":
                items += "**Thrown**"
                break
            case "explosive":
                items += "**Explosives**"
                break
            case "melee":
                items += "**Melee**"
                break
        }
        items += "\n"

        res[key].forEach(item => {
            let itemDeets = `> **${item["name"]}**\tQuantity: ${item["quantity"]}\tTime: ${item["time"]}\tSulfur: ${item["sulfur"]}`
            items += itemDeets + "\n"
        })
        typeStrings.push(items)
    }

    return typeStrings
}