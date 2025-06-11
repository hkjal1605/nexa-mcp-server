import { z } from 'zod';
import {
  CoinMetadataSchema,
  CoinVolumeStatsSchema,
  PoolSchema,
} from '../common.types';

/**
 * Zod Schema for the core IP details returned by the ip-api.com JSON endpoint.
 * Includes common fields and optional extended fields.
 */

export const CoinsListResponseSchema = z.array(
  z
    .object({
      coin: z.string(),
      coinMetadata: CoinMetadataSchema.describe('The metadata of the coin'),
      price: z.number().describe('The price of the coin'),
      totalSupply: z.number().describe('The total supply of the coin'),
      price1MinsAgo: z
        .number()
        .describe('The price of the coin 1 minute ago')
        .or(z.null()),
      price5MinsAgo: z
        .number()
        .describe('The price of the coin 5 minutes ago')
        .or(z.null()),
      price1HrAgo: z
        .number()
        .describe('The price of the coin 1 hour ago')
        .or(z.null()),
      price4HrAgo: z
        .number()
        .describe('The price of the coin 4 hours ago')
        .or(z.null()),
      price1DAgo: z
        .number()
        .describe('The price of the coin 1 day ago')
        .or(z.null()),
      buyVolumeStats1m: CoinVolumeStatsSchema,
      sellVolumeStats1m: CoinVolumeStatsSchema,
      buyVolumeStats5m: CoinVolumeStatsSchema,
      sellVolumeStats5m: CoinVolumeStatsSchema,
      buyVolumeStats1h: CoinVolumeStatsSchema,
      sellVolumeStats1h: CoinVolumeStatsSchema,
      buyVolumeStats4h: CoinVolumeStatsSchema,
      sellVolumeStats4h: CoinVolumeStatsSchema,
      buyVolumeStats1d: CoinVolumeStatsSchema,
      sellVolumeStats1d: CoinVolumeStatsSchema,
      coin1mTradeCount: z
        .number()
        .describe('The number of trades of the coin in the last 1 minute'),
      coin1mTradeVolumeUsd: z
        .number()
        .describe('The volume of the coin in the last 1 minute'),
      coin5mTradeCount: z
        .number()
        .describe('The number of trades of the coin in the last 5 minutes'),
      coin5mTradeVolumeUsd: z
        .number()
        .describe('The volume of the coin in the last 5 minutes'),
      coin4hTradeCount: z
        .number()
        .describe('The number of trades of the coin in the last 4 hours'),
      coin4hTradeVolumeUsd: z
        .number()
        .describe('The volume of the coin in the last 4 hours'),
      coin1dTradeCount: z
        .number()
        .describe('The number of trades of the coin in the last 1 day'),
      coin1dTradeVolumeUsd: z
        .number()
        .describe('The volume of the coin in the last 1 day'),
      coin1hTradeCount: z
        .number()
        .describe('The number of trades of the coin in the last 1 hour'),
      coin1hTradeVolumeUsd: z
        .number()
        .describe('The volume of the coin in the last 1 hour'),
      coinDev: z.string().describe('The developer of the coin'),
      coinSupply: z.number().describe('The supply of the coin'),
      amountBurned: z
        .number()
        .describe('The amount of the coin that has been burned'),
      timeCreated: z.number().describe('The time the coin was created'),
      totalLiquidityUsd: z.number().describe('The total liquidity of the coin'),
      percentageTokenSupplyInLiquidity: z
        .number()
        .describe('The percentage of the token supply in liquidity'),
      fullyDilutedMarketCap: z
        .number()
        .describe('The fully diluted market cap of the coin'),
      marketCap: z.number().describe('The market cap of the coin'),
      percentagePriceChange1m: z
        .number()
        .describe(
          'The percentage price change of the coin in the last 1 minute',
        ),
      percentagePriceChange5m: z
        .number()
        .describe(
          'The percentage price change of the coin in the last 5 minutes',
        ),
      percentagePriceChange1h: z
        .number()
        .describe('The percentage price change of the coin in the last 1 hour'),
      percentagePriceChange4h: z
        .number()
        .describe(
          'The percentage price change of the coin in the last 4 hours',
        ),
      percentagePriceChange1d: z
        .number()
        .describe('The percentage price change of the coin in the last 1 day'),
      coinDevHoldings: z
        .number()
        .describe('The number of the coin that the developer holds'),
      coinDevHoldingsPercentage: z
        .number()
        .describe('The percentage of the coin that the developer holds'),
      holderScore: z.number().describe('The holder score of the coin'),
      top10HoldersPercent: z
        .number()
        .describe('The percentage of the top 10 holders of the coin'),
      uniqueTraders1m: z
        .number()
        .describe(
          'The number of unique traders of the coin in the last 1 minute',
        ),
      uniqueTraders5m: z
        .number()
        .describe(
          'The number of unique traders of the coin in the last 5 minutes',
        ),
      uniqueTraders1h: z
        .number()
        .describe(
          'The number of unique traders of the coin in the last 1 hour',
        ),
      uniqueTraders4h: z
        .number()
        .describe(
          'The number of unique traders of the coin in the last 4 hours',
        ),
      uniqueTraders1d: z
        .number()
        .describe('The number of unique traders of the coin in the last 1 day'),
      priceLineSeries: z.array(
        z.object({
          time: z.string().describe('The time of the price'),
          value: z.number().describe('The price of the coin at that time'),
        }),
      ),
      holdersCount: z.number().describe('The number of holders of the coin'),
      pools: z.array(PoolSchema),
    })
    .strip(),
);

export type CoinsListResponse = z.infer<typeof CoinsListResponseSchema>;
