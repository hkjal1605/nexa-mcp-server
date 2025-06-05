import { z } from 'zod';

/**
 * Zod schema for the IP address tool arguments.
 */
export const SearchCoinToolArgs = z
	.object({
		query: z
			.string()
			.describe(
				'The query to search for. Can be the ticker of the coin or the coin address',
			),
	})
	.strict();

/**
 * TypeScript type inferred from the IpAddressToolArgs Zod schema.
 * This represents the optional arguments passed to the tool handler and controller.
 */
export type SearchCoinToolArgsType = z.infer<typeof SearchCoinToolArgs>;
