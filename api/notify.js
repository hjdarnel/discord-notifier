const Discord = require("discord.js");

module.exports = async (req, res) => {
  if (!process.env.USER || !process.env.TOKEN || !process.env.SECRET) {
    res
      .status(500)
      .json({ error: { code: 500, message: "Missing environment variables" } });
    return;
  }

  const { text } = req.body;
  const secret = req.headers["x-secret"];
  console.log;

  if (!secret || secret != process.env.SECRET) {
    res
      .status(400)
      .json({ error: { code: 401, message: "Invalid x-secret header" } });
    return;
  }

  if (!text) {
    res.status(400).json({ error: { code: 400, message: "Missing text" } });
    return;
  }

  const client = new Discord.Client();
  const TOKEN = process.env.TOKEN;
  const USER = process.env.USER;

  client.on("ready", async () => {
    const user = client.users.get(USER);

    if (user && user.presence.status === "online") {
      await user.send(text);
    } else {
      console.log(`${user} isn't online, skipping`);
    }

    res
      .writeHead(200, {
        "Content-Type": "text/plain",
      })
      .end("OK");
  });

  client.login(TOKEN);
};
