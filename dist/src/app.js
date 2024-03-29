"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json({ limit: '256mb' }));
exports.app.set('port', 1337);
exports.app.set('host', 'localhost');
exports.app.use(routes_1.index);
//# sourceMappingURL=app.js.map