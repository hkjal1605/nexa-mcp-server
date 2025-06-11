"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinDiscoveryToolArgs = void 0;
const zod_1 = require("zod");
/**
 * Zod schema for the coin discovery tool arguments.
 */
exports.CoinDiscoveryToolArgs = zod_1.z
    .object({
    liquidityRangeMin: zod_1.z.number().optional().describe('Minimum liquidity'),
    liquidityRangeMax: zod_1.z.number().optional().describe('Maximum liquidity'),
    volumeRangeMin: zod_1.z.number().optional().describe('Minimum volume'),
    volumeRangeMax: zod_1.z.number().optional().describe('Maximum volume'),
    marketCapRangeMin: zod_1.z.number().optional().describe('Minimum market cap'),
    marketCapRangeMax: zod_1.z.number().optional().describe('Maximum market cap'),
    hideLstCoins: zod_1.z.boolean().optional().describe('Hide listed coins'),
    hideStableCoins: zod_1.z.boolean().optional().describe('Hide stable coins'),
})
    .strict();
//# sourceMappingURL=coinDiscovery.type.js.map