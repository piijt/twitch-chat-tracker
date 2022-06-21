"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const app_1 = require("./app");
const port = app_1.app.get('port');
exports.server = app_1.app.listen(port, () => console.log('app listening', port));
//# sourceMappingURL=server.js.map