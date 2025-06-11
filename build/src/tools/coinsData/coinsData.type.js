"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinDataToolArgs = void 0;
const zod_1 = require("zod");
/**
 * Zod schema for the coin discovery tool arguments.
 */
exports.CoinDataToolArgs = zod_1.z
    .object({
    coinType: zod_1.z.string().optional().describe('Coin type'),
})
    .strict();
//# sourceMappingURL=coinsData.type.js.map