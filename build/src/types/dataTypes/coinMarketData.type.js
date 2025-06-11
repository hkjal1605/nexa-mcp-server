"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinMarketDataResponseSchema = void 0;
const zod_1 = require("zod");
const common_types_1 = require("../common.types");
exports.CoinMarketDataResponseSchema = zod_1.z
    .object({
    coinMetadata: common_types_1.CoinMetadataSchema,
    coinPrice: zod_1.z.number(),
    coinSupply: zod_1.z.number(),
    marketCap: zod_1.z.number(),
    coin24hTradeCount: zod_1.z.number(),
    coin24hTradeVolumeUsd: zod_1.z.number(),
    coin24hTradeVolume: zod_1.z.number(),
    suiPrice: zod_1.z.number(),
    price5MinsAgo: zod_1.z.number(),
    price1HrAgo: zod_1.z.number(),
    price4HrAgo: zod_1.z.number(),
    price1DayAgo: zod_1.z.number(),
    totalCoinLiquidityUsd: zod_1.z.number(),
    totalSuiLiquidityUsd: zod_1.z.number(),
    totalCoinLiquidity: zod_1.z.number(),
    totalSuiLiquidity: zod_1.z.number(),
    holdersCount: zod_1.z.number(),
    coin24hUniqueBuyers: zod_1.z.number(),
    coin24hUniqueSellers: zod_1.z.number(),
    sellVolumeStats5m: common_types_1.CoinVolumeStatsSchema,
    buyVolumeStats5m: common_types_1.CoinVolumeStatsSchema,
    sellVolumeStats1h: common_types_1.CoinVolumeStatsSchema,
    buyVolumeStats1h: common_types_1.CoinVolumeStatsSchema,
    sellVolumeStats4h: common_types_1.CoinVolumeStatsSchema,
    buyVolumeStats4h: common_types_1.CoinVolumeStatsSchema,
    sellVolumeStats1d: common_types_1.CoinVolumeStatsSchema,
    buyVolumeStats1d: common_types_1.CoinVolumeStatsSchema,
    holderScore: zod_1.z.number(),
    totalUsdcLiquidity: zod_1.z.number(),
    totalUsdcLiquidityUsd: zod_1.z.number(),
})
    .strip();
//# sourceMappingURL=coinMarketData.type.js.map