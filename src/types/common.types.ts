/**
 * Common type definitions shared across controllers.
 * These types provide a standard interface for controller interactions.
 * Centralized here to ensure consistency across the codebase.
 */

import z from 'zod';

/**
 * Common response structure for controller operations.
 * All controller methods should return this structure.
 *
 * All output, including pagination information and any additional metadata,
 * is now consolidated into the content field as a single Markdown-formatted string.
 */
export interface ControllerResponse {
	/**
	 * Formatted content to be displayed to the user.
	 * A comprehensive Markdown-formatted string that includes all necessary information,
	 * including pagination details and any additional metadata.
	 */
	content: string;
}

export const CoinMetadataSchema = z.object({
	coinType: z.string().describe('The coin address of the coin'),
	decimals: z.number().describe('The number of decimals of the coin'),
	description: z.string().describe('Coin description'),
	iconUrl: z.string().describe('The url to the icon of the coin'),
	id: z.string().describe('Coin id'),
	name: z.string().describe('Coin name'),
	symbol: z.string().describe('Coin symbol'),
	dev: z.string().describe('The developer address of the coin'),
	supply: z.number().describe('Max coin supply'),
	createdAt: z.number().describe('Coin creation timestamp'),
	treasuryCap: z.string().describe('Treasury cap id'),
	treasuryCapOwner: z.object({
		ObjectOwner: z
			.string()
			.optional()
			.describe(
				'Treasury cap owner. Will be object owner if the treasury cap is wrapped within another object',
			),
		AddressOwner: z
			.string()
			.optional()
			.describe(
				'Treasury cap owner. Will be address owner if the treasury cap is owned by an address',
			),
		Immutable: z
			.boolean()
			.optional()
			.describe(
				'Whether the treasury cap is immutable. Will be true if the treasury cap is marked immutable on-chain',
			),
	}),
	lastTradeAt: z.string().describe('Last trade timestamp'),
	website: z.string().optional().describe('Coin website'),
	twitter: z.string().optional().describe('Coin twitter'),
	telegram: z.string().optional().describe('Coin telegram'),
});

export const CoinVolumeStatsSchema = z.object({
	volume: z.number().describe('Volume in given time period'),
	volumeUsd: z.number().describe('Volume in USD in given time period'),
	tradeCount: z.number().describe('Number of trades in given time period'),
	uniqueUsers: z
		.number()
		.describe('Number of unique users in given time period'),
});

export const PoolSchema = z.object({
	pool: z.string().describe('Pool object id'),
	platform: z.string().describe('DEX name where the pool is located'),
	swapCount: z.number().describe('Number of swaps in pool'),
	coinA: z.string().describe('Coin A address'),
	coinB: z.string().describe('Coin B address'),
	liqA: z.number().describe('Liquidity of Coin A'),
	liqB: z.number().describe('Liquidity of Coin B'),
	price: z.number().describe('Price of Coin A in Coin B'),
	liqUsd: z.number().describe('Liquidity in USD'),
});
