const tmi = require('tmi.js');
const fs = require('fs');
// const Sentiment = require('sentiment');
// const { v4: uuidv4 } = require('uuid');

const ms_to_min = (ms) => (ms / 1000 / 60);

module.exports = async function main() {
    const chat_tracker = {};
    // const sentiment = new Sentiment();
    // const session_name = uuidv4();
    const streamers = JSON.parse(fs.readFileSync('./streamers.json', 'utf8'));
    streamers.push('lontartv', 'notmes', 'jazggz');
    
    const client = new tmi.Client({
        options: { debug: true, messagesLogLevel: "info", skipMembership: true, joinInterval: 300 },
        connection: {
            reconnect: true,
            secure: true
        },
        channels: streamers
    });

    client.connect().catch(console.error);

    client.on('message', (channel, tags, message, self) => {
        if (self) return;

        if(!chat_tracker[channel]) {
            chat_tracker[channel] = {};
        }

        if(!chat_tracker[channel][tags.username]) {
            chat_tracker[channel][tags.username] = {};
            chat_tracker[channel][tags.username].table = [];
            chat_tracker[channel][tags.username].seen = 0;
        };
        
        const chatter = chat_tracker[channel][tags.username]
        /* console.log(sentiment.analyze(message)); */
        const currentTime = new Date();

        
        chat_tracker[channel][tags.username].table.push({message: message, time: new Date(), /* sentiment: sentiment.analyze(message) */ })
        
        const realTimeRetention = ms_to_min(currentTime.getTime() - new Date(chat_tracker[channel][tags.username].table[0].time).getTime())
        
        chatter.retention = realTimeRetention
        
        ++chat_tracker[channel][tags.username].seen;

        setInterval(() => {
            fs.writeFileSync(`./data/${"session_name"}.json`, JSON.stringify(chat_tracker));
            // const retentionAvg = [];
            // for(const items of Object.entries(chat_tracker)){
            //     console.log(items)
                
            //     for(const key of Object.keys(items[1])) {
            //         const viewer_info = items[1][key];
            //         const retention = new Date(viewer_info.table[viewer_info.table.length -1].time) - new Date(viewer_info.table[0].time)
                    
            //         viewer_info.watchTime = retention;
            //         retentionAvg.push(retention);
            //         // for(const info of viewer_info.table) {
            //         //     console.log(info[info.length -1].time - info[0].time);
            //         // }
                    
            //     }
            // }
            // console.log('retention len', retentionAvg.length);
            // console.log('average retention', average(retentionAvg.map(x => ms_to_min(x))) )
        }, 10_000)
        
    });
}
