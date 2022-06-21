import { client } from 'tmi.js'
import fs from 'fs'
import { ms_to_min } from './utils/time_converter';
import { mapToArray } from './utils/array_helpers';


const streamers = JSON.parse(fs.readFileSync('./streamers.json', 'utf8'));
streamers.push('lontartv', 'notmes');

type viewer = Record<string, {
    seen?: number,
    retention?: number,
    table?: { time: Date, message: string }[],
}>

type Tracker = {
    [channel: string]: viewer
}
const chat_tracker: Tracker = {};

const Client = new client({
    options: { debug: true, messagesLogLevel: "info", skipMembership: true, joinInterval: 300 },
    connection: {
        reconnect: true,
        secure: true
    },
    channels: streamers
});

Client.connect().catch(console.error);

Client.on('message', (channel, tags, message, self) => {
    if (self) return;
    if (!chat_tracker[channel]) {
        chat_tracker[channel] = {};
    };
    
    if (!chat_tracker[channel][tags?.username]) {
        chat_tracker[channel][tags.username] = {
            table: [],
            seen: 0
        }
    }
    
    const currentTime = new Date();

    chat_tracker[channel][tags.username].seen += 1;
    
    chat_tracker[channel][tags.username].table.push({ message, time: currentTime })
    
    chat_tracker[channel][tags.username].retention = ms_to_min(currentTime.getTime() - chat_tracker[channel][tags.username].table[0].time.getTime());

    setInterval(() => {
        fs.writeFileSync('./data/chat_tracker.json', JSON.stringify(chat_tracker));
    }, 100_000);
});