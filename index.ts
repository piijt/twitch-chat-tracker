import { client } from 'tmi.js'
import fs from 'fs'

const channels = ['lontartv', 'notmes'];

type viewer = Record<string, {
    seen?: number,
    retention?: number,
    table?: { time: Date, message: string }[],
}>

type Tracker = {
    [channel: string]: viewer
}



const chat_tracker: Tracker = {};

for (const channel of channels) {
    if (!chat_tracker[`#${channel}`]) {
        chat_tracker[`#${channel}`] = {};
    }
}




const Client = new client({
    options: { debug: true, messagesLogLevel: "info", skipMembership: true, joinInterval: 300 },
    connection: {
        reconnect: true,
        secure: true
    },
    channels: channels
});

Client.connect().catch(console.error);

let m = new Map()

Client.on('message', (channel, tags, message, self) => {
    if (self) return;
    if (!m.has(channel)) {
        m.set(channel,
            new Map()
        )
    }

    if (!m.get(channel).has(
        tags.username
    )) {
        m.get(channel).set(tags.username,
            {
                table: [],
                seen: 0
            }
        )
    }

    const currentTime = new Date();
    m.get(channel).get(tags.username).seen += 1;
    m.get(channel).get(tags.username).table.push(
        { message, time: currentTime }
    )
    m.get(channel).get(tags.username).retention = currentTime.getTime() - m.get(channel).get(tags.username).table[0].time.getTime()
        
    console.log(m)
    // console.log(channel)
    // if (!chat_tracker[channel][tags.username] && chat_tracker[channel][tags.username] === null && chat_tracker[channel][tags.username] === undefined) {
    //     chat_tracker[channel][tags.username] = {
    //         table :  [],
    //         seen : 0
    //     }

    
    //  };
    // const chatter = chat_tracker[channel][tags.username]
    // /* console.log(sentiment.analyze(message)); */

    // chat_tracker[channel][tags.username].table.push({ message: message, time: new Date(), /* sentiment: sentiment.analyze(message) */ })
    // const realTimeRetention: number = new Date(chat_tracker[channel][tags.username].table[chat_tracker[channel][tags.username].table.length - 1].time).getTime() - new Date(chat_tracker[channel][tags.username].table[0].time).getTime()
    // chatter.retention = realTimeRetention
    // ++chat_tracker[channel][tags.username].seen;
    setInterval(() => {
        fs.writeFileSync('./data/chat_tracker.json', JSON.stringify(m));
    }, 100_000)
});