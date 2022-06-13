const express = require('express');
const { spawn } = require('node:child_process');
const TWC = require('./index.js');
const PORT = 6600;
const app = express();

const worker = {
    run: () => {
        TWC();
    }
}


app.get('/', async (req,res) => {
    res.json('twitch tracker')
});

const server = app.listen(PORT, () => console.log('twitch tracker listening on port:', PORT))
worker.run();