"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinsListResponseSchema = void 0;
const zod_1 = require("zod");
const common_types_1 = require("../common.types");
/**
 * Zod Schema for the core IP details returned by the ip-api.com JSON endpoint.
 * Includes common fields and optional extended fields.
 */
exports.CoinsListResponseSchema = zod_1.z.array(zod_1.z
    .object({
    coin: zod_1.z.string(),
    coinMetadata: common_types_1.CoinMetadataSchema.describe('The metadata of the coin'),
    price: zod_1.z.number().describe('The price of the coin'),
    totalSupply: zod_1.z.number().describe('The total supply of the coin'),
    price1MinsAgo: zod_1.z
        .number()
        .describe('The price of the coin 1 minute ago')
        .or(zod_1.z.null()),
    price5MinsAgo: zod_1.z
        .number()
        .describe('The price of the coin 5 minutes ago')
        .or(zod_1.z.null()),
    price1HrAgo: zod_1.z
        .number()
        .describe('The price of the coin 1 hour ago')
        .or(zod_1.z.null()),
    price4HrAgo: zod_1.z
        .number()
        .describe('The price of the coin 4 hours ago')
        .or(zod_1.z.null()),
    price1DAgo: zod_1.z
        .number()
        .describe('The price of the coin 1 day ago')
        .or(zod_1.z.null()),
    buyVolumeStats1m: common_types_1.CoinVolumeStatsSchema,
    sellVolumeStats1m: common_types_1.CoinVolumeStatsSchema,
    buyVolumeStats5m: common_types_1.CoinVolumeStatsSchema,
    sellVolumeStats5m: common_types_1.CoinVolumeStatsSchema,
    buyVolumeStats1h: common_types_1.CoinVolumeStatsSchema,
    sellVolumeStats1h: common_types_1.CoinVolumeStatsSchema,
    buyVolumeStats4h: common_types_1.CoinVolumeStatsSchema,
    sellVolumeStats4h: common_types_1.CoinVolumeStatsSchema,
    buyVolumeStats1d: common_types_1.CoinVolumeStatsSchema,
    sellVolumeStats1d: common_types_1.CoinVolumeStatsSchema,
    coin1mTradeCount: zod_1.z
        .number()
        .describe('The number of trades of the coin in the last 1 minute'),
    coin1mTradeVolumeUsd: zod_1.z
        .number()
        .describe('The volume of the coin in the last 1 minute'),
    coin5mTradeCount: zod_1.z
        .number()
        .describe('The number of trades of the coin in the last 5 minutes'),
    coin5mTradeVolumeUsd: zod_1.z
        .number()
        .describe('The volume of the coin in the last 5 minutes'),
    coin4hTradeCount: zod_1.z
        .number()
        .describe('The number of trades of the coin in the last 4 hours'),
    coin4hTradeVolumeUsd: zod_1.z
        .number()
        .describe('The volume of the coin in the last 4 hours'),
    coin1dTradeCount: zod_1.z
        .number()
        .describe('The number of trades of the coin in the last 1 day'),
    coin1dTradeVolumeUsd: zod_1.z
        .number()
        .describe('The volume of the coin in the last 1 day'),
    coin1hTradeCount: zod_1.z
        .number()
        .describe('The number of trades of the coin in the last 1 hour'),
    coin1hTradeVolumeUsd: zod_1.z
        .number()
        .describe('The volume of the coin in the last 1 hour'),
    coinDev: zod_1.z.string().describe('The developer of the coin'),
    coinSupply: zod_1.z.number().describe('The supply of the coin'),
    amountBurned: zod_1.z
        .number()
        .describe('The amount of the coin that has been burned'),
    timeCreated: zod_1.z.number().describe('The time the coin was created'),
    totalLiquidityUsd: zod_1.z.number().describe('The total liquidity of the coin'),
    percentageTokenSupplyInLiquidity: zod_1.z
        .number()
        .describe('The percentage of the token supply in liquidity'),
    fullyDilutedMarketCap: zod_1.z
        .number()
        .describe('The fully diluted market cap of the coin'),
    marketCap: zod_1.z.number().describe('The market cap of the coin'),
    percentagePriceChange1m: zod_1.z
        .number()
        .describe('The percentage price change of the coin in the last 1 minute'),
    percentagePriceChange5m: zod_1.z
        .number()
        .describe('The percentage price change of the coin in the last 5 minutes'),
    percentagePriceChange1h: zod_1.z
        .number()
        .describe('The percentage price change of the coin in the last 1 hour'),
    percentagePriceChange4h: zod_1.z
        .number()
        .describe('The percentage price change of the coin in the last 4 hours'),
    percentagePriceChange1d: zod_1.z
        .number()
        .describe('The percentage price change of the coin in the last 1 day'),
    coinDevHoldings: zod_1.z
        .number()
        .describe('The number of the coin that the developer holds'),
    coinDevHoldingsPercentage: zod_1.z
        .number()
        .describe('The percentage of the coin that the developer holds'),
    holderScore: zod_1.z.number().describe('The holder score of the coin'),
    top10HoldersPercent: zod_1.z
        .number()
        .describe('The percentage of the top 10 holders of the coin'),
    uniqueTraders1m: zod_1.z
        .number()
        .describe('The number of unique traders of the coin in the last 1 minute'),
    uniqueTraders5m: zod_1.z
        .number()
        .describe('The number of unique traders of the coin in the last 5 minutes'),
    uniqueTraders1h: zod_1.z
        .number()
        .describe('The number of unique traders of the coin in the last 1 hour'),
    uniqueTraders4h: zod_1.z
        .number()
        .describe('The number of unique traders of the coin in the last 4 hours'),
    uniqueTraders1d: zod_1.z
        .number()
        .describe('The number of unique traders of the coin in the last 1 day'),
    priceLineSeries: zod_1.z.array(zod_1.z.object({
        time: zod_1.z.string().describe('The time of the price'),
        value: zod_1.z.number().describe('The price of the coin at that time'),
    })),
    holdersCount: zod_1.z.number().describe('The number of holders of the coin'),
    pools: zod_1.z.array(common_types_1.PoolSchema),
})
    .strip());
//# sourceMappingURL=coinsListApi.types.js.map