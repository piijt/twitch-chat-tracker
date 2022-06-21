"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tmi_js_1 = require("tmi.js");
const fs_1 = __importDefault(require("fs"));
const time_converter_1 = require("./utils/time_converter");
const streamers = JSON.parse(fs_1.default.readFileSync('./data/streamers.json', 'utf8'));
streamers.push('lontartv', 'notmes');
const chat_tracker = {};
const Client = new tmi_js_1.client({
    options: { debug: true, messagesLogLevel: "info", skipMembership: true, joinInterval: 300 },
    connection: {
        reconnect: true,
        secure: true
    },
    channels: streamers
});
Client.connect().catch(console.error);
Client.on('message', (channel, tags, message, self) => {
    if (self)
        return;
    if (!chat_tracker[channel]) {
        chat_tracker[channel] = {};
    }
    ;
    if (!chat_tracker[channel][tags === null || tags === void 0 ? void 0 : tags.username]) {
        chat_tracker[channel][tags.username] = {
            table: [],
            seen: 0
        };
    }
    const currentTime = new Date();
    chat_tracker[channel][tags.username].seen += 1;
    chat_tracker[channel][tags.username].table.push({ message, time: currentTime });
    chat_tracker[channel][tags.username].retention = (0, time_converter_1.ms_to_min)(currentTime.getTime() - chat_tracker[channel][tags.username].table[0].time.getTime());
    setInterval(() => {
        fs_1.default.writeFileSync('./data/chat_tracker.json', JSON.stringify(chat_tracker));
    }, 10000);
});
//# sourceMappingURL=chat_tracker.js.map