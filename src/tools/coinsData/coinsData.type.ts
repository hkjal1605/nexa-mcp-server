import { z } from 'zod';

/**
 * Zod schema for the coin discovery tool arguments.
 */
export const CoinDataToolArgs = z
	.object({
		coinType: z.string().optional().describe('Coin type'),
	})
	.strict();

/**
 * TypeScript type inferred from the CoinDiscoveryToolArgs Zod schema.
 * This represents the optional arguments passed to the tool handler and controller.
 */
export type CoinDataToolArgsType = z.infer<typeof CoinDataToolArgs>;
