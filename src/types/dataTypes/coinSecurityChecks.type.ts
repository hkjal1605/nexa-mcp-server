import { z } from 'zod';
import { CoinMetadataSchema } from '../common.types';

export const CoinSecurityChecksResponseSchema = z
	.object({
		coinDev: z.string(),
		coinSupply: z.number(),
		treasuryCapOwner: z.object({
			ObjectOwner: z.string().optional(),
			AddressOwner: z.string().optional(),
			Immutable: z.boolean().optional(),
		}),
		amountBurned: z.number(),
		timeCreated: z.number(),
		burntLpPosition: z.object({
			_id: z.string(),
			coinA: z.string(),
			coinB: z.string(),
			pool: z.string(),
			id: z.string(),
			timestamp: z.number(),
			platform: z.string(),
			sender: z.string(),
			digest: z.string(),
			amountA: z.number(),
			amountB: z.number(),
		}),
		coinMetadata: CoinMetadataSchema,
		coinDevName: z.string().optional(),
		coinPrice: z.number(),
		top10HoldersPercent: z.number(),
		amountInLiquidity: z.number(),
		coinDevHoldings: z.number(),
	})
	.strict();

export type CoinSecurityChecksResponse = z.infer<
	typeof CoinSecurityChecksResponseSchema
>;
