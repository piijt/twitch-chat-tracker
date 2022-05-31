const tmi = require('tmi.js');
const fs = require('fs');
const Sentiment = require('sentiment');

const channels = ["posty", "asmongold", "lontartv", "jazggz", 'notmes'];
const chat_tracker = {};
const sentiment = new Sentiment();

for(const channel of channels) {
    if(!chat_tracker[`#${channel}`]) {
        chat_tracker[`#${channel}`] = {};
    }
}

console.log(chat_tracker);

const client = new tmi.Client({
    options: { debug: true, messagesLogLevel: "info" },
    connection: {
        reconnect: true,
        secure: true
    },
    channels: channels
});

client.connect().catch(console.error);

client.on('message', (channel, tags, message, self) => {
    if (self) return;

    if(!chat_tracker[channel][tags.username]) {
        chat_tracker[channel][tags.username] = {}
        chat_tracker[channel][tags.username].table = []
        chat_tracker[channel][tags.username].seen = 0;
    };
    const chatter = chat_tracker[channel][tags.username]
    /* console.log(sentiment.analyze(message)); */

    chat_tracker[channel][tags.username].table.push({message: message, time: new Date(), /* sentiment: sentiment.analyze(message) */ })
    const realTimeRetention = new Date(chat_tracker[channel][tags.username].table[chat_tracker[channel][tags.username].table.length -1].time) - new Date(chat_tracker[channel][tags.username].table[0].time)
    chatter.retention = realTimeRetention
    ++chat_tracker[channel][tags.username].seen;

    setInterval(() => {
        fs.writeFileSync('chat_tracker.json', JSON.stringify(chat_tracker));
    }, 100_000)
});