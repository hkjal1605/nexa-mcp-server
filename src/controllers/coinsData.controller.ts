import { Logger } from '../utils/logger.util.js';
import { handleControllerError } from '../utils/error-handler.util.js';
import { ControllerResponse } from '../types/common.types.js';
import { buildErrorContext } from '../utils/error-handler.util.js';
import NexaApiService from '@/services/nexaApiService.js';

/**
 * @namespace CoinsDataController
 * @description Controller responsible for handling coin data logic.
 */

/**
 * @function getCoinSecurityChecks
 * @description Get security/audit checks for a coin
 * @memberof CoinsDataController
 * @param {Object} args - Arguments containing coinType
 * @param {string} args.coinType - Coin type to get security checks for
 * @returns {Promise<ControllerResponse>} A promise that resolves to the standard controller response containing the coin security checks in Markdown.
 * @throws {McpError} Throws an McpError (handled by `handleControllerError`) if the service call fails or returns an error.
 */
async function getCoinSecurityChecks(
	args: {
		coinType?: string;
	} = {},
): Promise<ControllerResponse> {
	const methodLogger = Logger.forContext(
		'controllers/coinsData.controller.ts',
		'getCoinSecurityChecks',
	);
	methodLogger.debug(
		`Getting security checks for coin with coinType: ${args.coinType}...`,
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
			`Getting security checks for coin with coinType: ${args.coinType || 'current IP'}`,
			{
				coinType: args.coinType,
				originalOptions: args,
				isTestEnvironment,
			},
		);

		try {
			// Call the service with ipAddress and the mapped serviceOptions
			const data = await NexaApiService.getSecurityCheckForCoin(
				args.coinType || '',
			);
			methodLogger.debug(`Got the response from the service`, data);
			return { content: JSON.stringify(data) };
		} catch (error) {
			methodLogger.error('Error getting coin security checks', error);
			throw error;
		}
	} catch (error) {
		throw handleControllerError(
			error,
			buildErrorContext(
				'Coin Security Checks',
				'getCoinSecurityChecks',
				'controllers/coinsData.controller.ts@getCoinSecurityChecks',
				args.coinType || 'current device',
				{ args },
			),
		);
	}
}

/**
 * @function getCoinMarketData
 * @description Get market data for a coin
 * @memberof CoinsDataController
 * @param {Object} args - Arguments containing coinType
 * @param {string} args.coinType - Coin type to get market data for
 * @returns {Promise<ControllerResponse>} A promise that resolves to the standard controller response containing the coin market data in Markdown.
 * @throws {McpError} Throws an McpError (handled by `handleControllerError`) if the service call fails or returns an error.
 */
async function getCoinMarketData(
	args: {
		coinType?: string;
	} = {},
): Promise<ControllerResponse> {
	const methodLogger = Logger.forContext(
		'controllers/coinsData.controller.ts',
		'getCoinMarketData',
	);
	methodLogger.debug(
		`Getting market data for coin with coinType: ${args.coinType}...`,
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
			`Getting market data for coin with coinType: ${args.coinType || 'current IP'}`,
			{
				coinType: args.coinType,
				originalOptions: args,
				isTestEnvironment,
			},
		);

		try {
			// Call the service with ipAddress and the mapped serviceOptions
			const data = await NexaApiService.getCoinMarketData(
				args.coinType || '',
			);
			methodLogger.debug(`Got the response from the service`, data);
			return { content: JSON.stringify(data) };
		} catch (error) {
			methodLogger.error('Error getting coin market data', error);
			throw error;
		}
	} catch (error) {
		throw handleControllerError(
			error,
			buildErrorContext(
				'Coin Market Data',
				'getCoinMarketData',
				'controllers/coinsData.controller.ts@getCoinMarketData',
				args.coinType || 'current device',
				{ args },
			),
		);
	}
}

export default { getCoinSecurityChecks, getCoinMarketData };
