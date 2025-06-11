"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@mysten/sui/client");
const constants_1 = require("../../constants");
const client = new client_1.SuiClient({
    transport: new client_1.SuiHTTPTransport({
        url: constants_1.SUI_RPC_ENDPOINT,
    }),
});
exports.default = client;
//# sourceMappingURL=index.js.map