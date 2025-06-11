"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinSearchResponseSchema = void 0;
const zod_1 = require("zod");
const common_types_1 = require("../common.types");
/**
 * Zod Schema for the core IP details returned by the ip-api.com JSON endpoint.
 * Includes common fields and optional extended fields.
 */
exports.CoinSearchResponseSchema = zod_1.z.array(zod_1.z
    .object({
    type: zod_1.z
        .string()
        .describe('The type of the object found for that query, can be "coin" or "address" or "pool"'),
    icon: zod_1.z.string().optional().describe('The url to the icon of the coin'),
    symbol: zod_1.z.string().describe('The symbol of the coin'),
    name: zod_1.z.string().describe('The name of the coin'),
    coinType: zod_1.z.string().describe('The type of the coin'),
    mc: zod_1.z.number().describe('The market cap of the coin'),
    holderScore: zod_1.z
        .number()
        .describe('The holder score of the coin, the higher the better'),
    coinMetadata: common_types_1.CoinMetadataSchema.describe('The metadata of the coin'),
    sellVolumeStats1d: zod_1.z.object({
        volume: zod_1.z.number().describe('Volume in the last 24 hours'),
        volumeUsd: zod_1.z.number().describe('Volume in USD in the last 24 hours'),
        tradeCount: zod_1.z
            .number()
            .describe('Number of trades in the last 24 hours'),
        uniqueUsers: zod_1.z
            .number()
            .describe('Number of unique users in the last 24 hours'),
    }),
    buyVolumeStats1d: zod_1.z.object({
        volume: zod_1.z.number().describe('Volume in the last 24 hours'),
        volumeUsd: zod_1.z.number().describe('Volume in USD in the last 24 hours'),
        tradeCount: zod_1.z
            .number()
            .describe('Number of trades in the last 24 hours'),
        uniqueUsers: zod_1.z
            .number()
            .describe('Number of unique users in the last 24 hours'),
    }),
    price: zod_1.z.number().describe('The price of the coin'),
})
    .strip());
//# sourceMappingURL=searchApi.types.js.map