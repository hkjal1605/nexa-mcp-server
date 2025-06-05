import { z } from 'zod';
import { CoinMetadataSchema, CoinVolumeStatsSchema } from '../common.types';

export const CoinMarketDataResponseSchema = z.object({
	coinMetadata: CoinMetadataSchema,
	coinPrice: z.number(),
	coinSupply: z.number(),
	marketCap: z.number(),
	coin24hTradeCount: z.number(),
	coin24hTradeVolumeUsd: z.number(),
	coin24hTradeVolume: z.number(),
	suiPrice: z.number(),
	price5MinsAgo: z.number(),
	price1HrAgo: z.number(),
	price4HrAgo: z.number(),
	price1DayAgo: z.number(),
	totalCoinLiquidityUsd: z.number(),
	totalSuiLiquidityUsd: z.number(),
	totalCoinLiquidity: z.number(),
	totalSuiLiquidity: z.number(),
	holdersCount: z.number(),
	coin24hUniqueBuyers: z.number(),
	coin24hUniqueSellers: z.number(),
	sellVolumeStats5m: CoinVolumeStatsSchema,
	buyVolumeStats5m: CoinVolumeStatsSchema,
	sellVolumeStats1h: CoinVolumeStatsSchema,
	buyVolumeStats1h: CoinVolumeStatsSchema,
	sellVolumeStats4h: CoinVolumeStatsSchema,
	buyVolumeStats4h: CoinVolumeStatsSchema,
	sellVolumeStats1d: CoinVolumeStatsSchema,
	buyVolumeStats1d: CoinVolumeStatsSchema,
	holderScore: z.number(),
	totalUsdcLiquidity: z.number(),
	totalUsdcLiquidityUsd: z.number(),
});

export type CoinMarketDataResponse = z.infer<
	typeof CoinMarketDataResponseSchema
>;
