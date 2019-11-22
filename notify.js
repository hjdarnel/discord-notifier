const { json } = require('micro')
const Discord = require('discord.js');

module.exports = async (req, res) => {
    const {text} = await json(req);

    if (!text) {
        res.writeHead(400, {'Content-Type': 'application/json' }).end();
        return;
    }

    const client = new Discord.Client();
    const TOKEN = process.env.TOKEN;
    const USER = process.env.USER;

    client.on('ready', async () => {
        const user = client.users.get(USER);

        if (user.presence.status === "online") {
            await user.send(text);
        } else {
            console.log(`User is ${user.presence.status}`);
        }

        res.writeHead(200, { 'Content-Type': 'application/json' }).end();
    });

    client.login(TOKEN);
};
