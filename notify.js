const { json } = require('micro')
const Discord = require('discord.js');

module.exports = async (req, res) => {
    const {text} = req.body;

    if (!text) {
        res.writeHead(400, {'Content-Type': 'application/json' });
        res.end();
        return;
    }

    const client = new Discord.Client();
    const TOKEN = process.env.TOKEN;
    const USER = process.env.USER;

    client.on('ready', async () => {
        const user = client.users.get(USER);
        
        if (user && user.presence.status === "online") {
            await user.send(text);
        } else {
            console.log(`User is ${user}`);
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end();
    });

    client.login(TOKEN);
};
