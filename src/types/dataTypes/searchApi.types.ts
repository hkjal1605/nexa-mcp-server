import { z } from 'zod';
import { CoinMetadataSchema } from '../common.types';

/**
 * Zod Schema for the core IP details returned by the ip-api.com JSON endpoint.
 * Includes common fields and optional extended fields.
 */

export const CoinSearchResponseSchema = z.object({
	type: z
		.string()
		.describe(
			'The type of the object found for that query, can be "coin" or "address" or "pool"',
		),
	icon: z.string().optional().describe('The url to the icon of the coin'),
	symbol: z.string().describe('The symbol of the coin'),
	name: z.string().describe('The name of the coin'),
	coinType: z.string().describe('The type of the coin'),
	mc: z.number().describe('The market cap of the coin'),
	holderScore: z
		.number()
		.describe('The holder score of the coin, the higher the better'),
	coinMetadata: CoinMetadataSchema.describe('The metadata of the coin'),
	sellVolumeStats1d: z.object({
		volume: z.number().describe('Volume in the last 24 hours'),
		volumeUsd: z.number().describe('Volume in USD in the last 24 hours'),
		tradeCount: z
			.number()
			.describe('Number of trades in the last 24 hours'),
		uniqueUsers: z
			.number()
			.describe('Number of unique users in the last 24 hours'),
	}),
	buyVolumeStats1d: z.object({
		volume: z.number().describe('Volume in the last 24 hours'),
		volumeUsd: z.number().describe('Volume in USD in the last 24 hours'),
		tradeCount: z
			.number()
			.describe('Number of trades in the last 24 hours'),
		uniqueUsers: z
			.number()
			.describe('Number of unique users in the last 24 hours'),
	}),
	price: z.number().describe('The price of the coin'),
});

/**
 * TypeScript type inferred from the CoinSearchResponseSchema.
 * Represents the expected structure of a successful coin search response.
 */
export type CoinSearchResponse = z.infer<typeof CoinSearchResponseSchema>;
