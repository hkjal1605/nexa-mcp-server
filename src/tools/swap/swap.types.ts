import { z } from 'zod';

/**
 * Zod schema for the IP address tool arguments.
 */
export const SwapToolArgs = z
	.object({
		coinIn: z.string().describe('The coin to swap from'),
		coinOut: z.string().describe('The coin to swap to'),
		amountIn: z.number().describe('The amount of coinIn to swap'),
		address: z
			.string()
			.describe('The address that will sign the transaction'),
	})
	.strict();

/**
 * TypeScript type inferred from the IpAddressToolArgs Zod schema.
 * This represents the optional arguments passed to the tool handler and controller.
 */
export type SwapToolArgsType = z.infer<typeof SwapToolArgs>;
