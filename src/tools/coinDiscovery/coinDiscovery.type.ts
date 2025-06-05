import { z } from 'zod';

/**
 * Zod schema for the coin discovery tool arguments.
 */
export const CoinDiscoveryToolArgs = z
	.object({
		liquidityRangeMin: z.number().optional().describe('Minimum liquidity'),
		liquidityRangeMax: z.number().optional().describe('Maximum liquidity'),
		volumeRangeMin: z.number().optional().describe('Minimum volume'),
		volumeRangeMax: z.number().optional().describe('Maximum volume'),
		marketCapRangeMin: z.number().optional().describe('Minimum market cap'),
		marketCapRangeMax: z.number().optional().describe('Maximum market cap'),
		hideLstCoins: z.boolean().optional().describe('Hide listed coins'),
		hideStableCoins: z.boolean().optional().describe('Hide stable coins'),
	})
	.strict();

/**
 * TypeScript type inferred from the CoinDiscoveryToolArgs Zod schema.
 * This represents the optional arguments passed to the tool handler and controller.
 */
export type CoinDiscoveryToolArgsType = z.infer<typeof CoinDiscoveryToolArgs>;
