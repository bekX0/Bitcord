module.exports = {
    name: "ready",
    execute: (client) => {
        console.log(`${client.user.username} hazır!`)
    }
}