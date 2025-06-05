import { Logger } from '../utils/logger.util.js';
import { handleControllerError } from '../utils/error-handler.util.js';
import { ControllerResponse } from '../types/common.types.js';
import { buildErrorContext } from '../utils/error-handler.util.js';
import NexaApiService from '@/services/nexaApiService.js';

/**
 * @namespace SearchController
 * @description Controller responsible for handling coin search logic.
 */

/**
 * @function searchCoin
 * @description Search for a coin by name or address
 * @memberof SearchController
 * @param {Object} args - Arguments containing query
 * @param {string} [args.query] - Optional query to search for
 * @returns {Promise<ControllerResponse>} A promise that resolves to the standard controller response containing the coin details in Markdown.
 * @throws {McpError} Throws an McpError (handled by `handleControllerError`) if the service call fails or returns an error.
 */
async function searchCoin(
	args: {
		query?: string;
	} = {},
): Promise<ControllerResponse> {
	const methodLogger = Logger.forContext(
		'controllers/search.controller.ts',
		'searchCoin',
	);
	methodLogger.debug(
		`Searching for coin with query: ${args.query || 'current device'}...`,
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
			`Searching for coin with query: ${args.query || 'current IP'}`,
			{
				query: args.query,
				originalOptions: args,
				isTestEnvironment,
			},
		);

		try {
			// Call the service with ipAddress and the mapped serviceOptions
			const data = await NexaApiService.searchCoin(args.query || '');
			methodLogger.debug(`Got the response from the service`, data);
			return { content: JSON.stringify(data) };
		} catch (error) {
			methodLogger.error('Error searching for coin', error);
			throw error;
		}
	} catch (error) {
		throw handleControllerError(
			error,
			buildErrorContext(
				'Coin Search',
				'searchCoin',
				'controllers/search.controller.ts@searchCoin',
				args.query || 'current device',
				{ args },
			),
		);
	}
}

export default { searchCoin };
