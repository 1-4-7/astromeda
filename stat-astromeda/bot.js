const client = global.client;

client.on("ready", () => {
    console.log("Let's goo!");
});

client.login(global.Settings.Token);