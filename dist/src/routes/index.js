"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const express_1 = require("express");
exports.index = (0, express_1.Router)();
exports.index.get('/', async (req, res) => {
    res.status(200).json('hello there');
});
//# sourceMappingURL=index.js.map