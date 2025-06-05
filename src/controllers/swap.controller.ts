import { Logger } from '../utils/logger.util.js';
import { handleControllerError } from '../utils/error-handler.util.js';
import { ControllerResponse } from '../types/common.types.js';
import { buildErrorContext } from '../utils/error-handler.util.js';
import spotTradeSdk from '@/helpers/Swap/index.js';

/**
 * @namespace SwapController
 * @description Controller responsible for handling swap/buy/sell logic.
 */

/**
 * @function generateTransactionBlock
 * @description Generate a transaction block for a swap
 * @memberof SwapController
 * @param {Object} args - Arguments containing coinIn, coinOut, amountIn, and address
 * @param {string} args.coinIn - Coin type to swap from
 * @param {string} args.coinOut - Coin type to swap to
 * @param {number} args.amountIn - Amount of coinIn to swap
 * @param {string} args.address - Address to send the swap to
 * @returns {Promise<ControllerResponse>} A promise that resolves to the standard controller response containing the transaction block in base64.
 * @throws {McpError} Throws an McpError (handled by `handleControllerError`) if the service call fails or returns an error.
 */
async function generateTransactionBlock(args: {
	coinIn: string;
	coinOut: string;
	amountIn: number;
	address: string;
}): Promise<ControllerResponse> {
	const methodLogger = Logger.forContext(
		'controllers/swap.controller.ts',
		'generateTransactionBlock',
	);
	methodLogger.debug(
		`Generating transaction block for swap with coinIn: ${args.coinIn}, coinOut: ${args.coinOut}, amountIn: ${args.amountIn}, address: ${args.address}...`,
	);

	try {
		// Detect if we're running in a test environment
		const isTestEnvironment =
			process.env.NODE_ENV === 'test' ||
			process.env.JEST_WORKER_ID !== undefined;

		// Special handling for test environments
		if (isTestEnvironment) {
			methodLogger.debug('Running in test environment');
		}

		methodLogger.debug(
			`Generating transaction block for swap with coinIn: ${args.coinIn}, coinOut: ${args.coinOut}, amountIn: ${args.amountIn}, address: ${args.address}`,
			{
				coinIn: args.coinIn,
				coinOut: args.coinOut,
				amountIn: args.amountIn,
				address: args.address,
				originalOptions: args,
				isTestEnvironment,
			},
		);

		try {
			// Call the service with ipAddress and the mapped serviceOptions
			await spotTradeSdk.fetchQuotes(
				args.coinIn,
				args.coinOut,
				BigInt(args.amountIn),
			);

			if (!spotTradeSdk.getOutputAmount()) {
				throw new Error('No routes found for the given pair');
			}

			const tx = await spotTradeSdk.executeSwapTxn(
				args.address,
				0.05,
				args.coinIn,
				args.coinOut,
				BigInt(args.amountIn),
			);

			if (!tx) {
				throw new Error('Failed to create transaction!');
			}

			const txn = await tx.build();

			return { content: txn.toString() };
		} catch (error) {
			methodLogger.error('Error generating transaction block', error);
			throw error;
		}
	} catch (error) {
		throw handleControllerError(
			error,
			buildErrorContext(
				'Generate Transaction Block',
				'generateTransactionBlock',
				'controllers/swap.controller.ts@generateTransactionBlock',
				args.coinIn || 'current device',
				{ args },
			),
		);
	}
}

export default { generateTransactionBlock };
