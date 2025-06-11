"use strict";
/**
 * Common type definitions shared across controllers.
 * These types provide a standard interface for controller interactions.
 * Centralized here to ensure consistency across the codebase.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolSchema = exports.CoinVolumeStatsSchema = exports.CoinMetadataSchema = void 0;
const tslib_1 = require("tslib");
const zod_1 = tslib_1.__importDefault(require("zod"));
exports.CoinMetadataSchema = zod_1.default.object({
    coinType: zod_1.default.string().describe('The coin address of the coin'),
    decimals: zod_1.default.number().describe('The number of decimals of the coin'),
    description: zod_1.default.string().describe('Coin description'),
    iconUrl: zod_1.default
        .string()
        .describe('The url to the icon of the coin')
        .or(zod_1.default.undefined()),
    id: zod_1.default.string().describe('Coin id'),
    name: zod_1.default.string().describe('Coin name'),
    symbol: zod_1.default.string().describe('Coin symbol'),
    dev: zod_1.default.string().describe('The developer address of the coin'),
    supply: zod_1.default.number().describe('Max coin supply'),
    createdAt: zod_1.default.number().describe('Coin creation timestamp'),
    treasuryCap: zod_1.default.string().describe('Treasury cap id').or(zod_1.default.undefined()),
    // Treasury cap owner can be an object or a string "Immutable"
    treasuryCapOwner: zod_1.default
        .string()
        .or(zod_1.default.object({
        ObjectOwner: zod_1.default
            .string()
            .optional()
            .describe('Treasury cap owner. Will be object owner if the treasury cap is wrapped within another object'),
        AddressOwner: zod_1.default
            .string()
            .optional()
            .describe('Treasury cap owner. Will be address owner if the treasury cap is owned by an address'),
    }))
        .or(zod_1.default.undefined()),
    lastTradeAt: zod_1.default.string().describe('Last trade timestamp'),
    website: zod_1.default.string().optional().describe('Coin website'),
    twitter: zod_1.default.string().optional().describe('Coin twitter'),
    telegram: zod_1.default.string().optional().describe('Coin telegram'),
});
exports.CoinVolumeStatsSchema = zod_1.default.object({
    volume: zod_1.default.number().describe('Volume in given time period'),
    volumeUsd: zod_1.default.number().describe('Volume in USD in given time period'),
    tradeCount: zod_1.default.number().describe('Number of trades in given time period'),
    uniqueUsers: zod_1.default
        .number()
        .describe('Number of unique users in given time period'),
});
exports.PoolSchema = zod_1.default.object({
    pool: zod_1.default.string().describe('Pool object id'),
    platform: zod_1.default.string().describe('DEX name where the pool is located'),
    swapCount: zod_1.default.number().describe('Number of swaps in pool'),
    coinA: zod_1.default.string().describe('Coin A address'),
    coinB: zod_1.default.string().describe('Coin B address'),
    liqA: zod_1.default.number().describe('Liquidity of Coin A'),
    liqB: zod_1.default.number().describe('Liquidity of Coin B'),
    price: zod_1.default.number().describe('Price of Coin A in Coin B'),
    liqUsd: zod_1.default.number().describe('Liquidity in USD'),
});
//# sourceMappingURL=common.types.js.map