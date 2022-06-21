"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
exports.index = (0, express_1.Router)();
exports.index.get('/', async (req, res) => {
    res.status(200).json('hello there');
});
exports.index.get('/session', async (req, res) => {
    try {
        const entries = fs_1.default.readFileSync('./data/chat_tracker.json', 'utf8');
        const session = JSON.parse(entries);
        res.status(200).json(session);
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
        return;
    }
});
exports.index.get('/streamer/:handle', async (req, res) => {
    try {
        const entries = fs_1.default.readFileSync('./data/chat_tracker.json', 'utf8');
        const session = JSON.parse(entries);
        const streamer = req.params.handle;
        const data = session[`#${streamer}`];
        console.log(data);
        res.status(200).json(data);
        return;
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.index.post('/streamer/add', async (req, res) => {
    try {
        const entries = fs_1.default.readFileSync('./data/streamers.json', 'utf8');
        const s = JSON.parse(entries);
        res.status(200).json(s);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
//# sourceMappingURL=index.js.map