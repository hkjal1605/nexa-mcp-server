"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const logger_util_js_1 = require("../utils/logger.util.js");
const error_handler_util_js_1 = require("../utils/error-handler.util.js");
const error_handler_util_js_2 = require("../utils/error-handler.util.js");
const nexaApiService_js_1 = tslib_1.__importDefault(require("../services/nexaApiService.js"));
/**
 * @namespace CoinDiscoveryController
 * @description Controller responsible for handling coin discovery logic.
 */
const DEFAULT_FILTERS = {
    liquidityRangeMin: 0,
    liquidityRangeMax: 10000000000,
    volumeRangeMin: 0,
    volumeRangeMax: 10000000000,
    marketCapRangeMin: 0,
    marketCapRangeMax: 10000000000,
    hideLstCoins: false,
    hideStableCoins: true,
};
/**
 * @function getTrendingCoins
 * @description Fetches the list of coin that are trending on Sui
 * @memberof CoinDiscoveryController
 * @param {Object} args - Arguments containing filter options
 * @param {number} [args.liquidityRangeMin] - Minimum liquidity of the coin
 * @param {number} [args.liquidityRangeMax] - Maximum liquidity of the coin
 * @param {number} [args.volumeRangeMin] - Minimum volume of the coin
 * @param {number} [args.volumeRangeMax] - Maximum volume of the coin
 * @param {number} [args.marketCapRangeMin] - Minimum market cap of the coin
 * @param {number} [args.marketCapRangeMax] - Maximum market cap of the coin
 * @param {boolean} [args.hideLstCoins] - Whether to hide LST coins
 * @param {boolean} [args.hideStableCoins] - Whether to hide stable coins
 * @returns {Promise<ControllerResponse>} A promise that resolves to the standard controller response containing the list of trending coins in Markdown.
 * @throws {McpError} Throws an McpError (handled by `handleControllerError`) if the service call fails or returns an error.
 */
async function getTrendingCoins(args) {
    if (!args.liquidityRangeMin)
        args.liquidityRangeMin = DEFAULT_FILTERS.liquidityRangeMin;
    if (!args.liquidityRangeMax)
        args.liquidityRangeMax = DEFAULT_FILTERS.liquidityRangeMax;
    if (!args.volumeRangeMin)
        args.volumeRangeMin = DEFAULT_FILTERS.volumeRangeMin;
    if (!args.volumeRangeMax)
        args.volumeRangeMax = DEFAULT_FILTERS.volumeRangeMax;
    if (!args.marketCapRangeMin)
        args.marketCapRangeMin = DEFAULT_FILTERS.marketCapRangeMin;
    if (!args.marketCapRangeMax)
        args.marketCapRangeMax = DEFAULT_FILTERS.marketCapRangeMax;
    if (!args.hideLstCoins)
        args.hideLstCoins = DEFAULT_FILTERS.hideLstCoins;
    if (!args.hideStableCoins)
        args.hideStableCoins = DEFAULT_FILTERS.hideStableCoins;
    const methodLogger = logger_util_js_1.Logger.forContext('controllers/coinsDiscovery.controller.ts', 'getTrendingCoins');
    methodLogger.debug(`Getting trending coins with filters: ${JSON.stringify(args)}`);
    try {
        // Detect if we're running in a test environment
        const isTestEnvironment = process.env.NODE_ENV === 'test' ||
            process.env.JEST_WORKER_ID !== undefined;
        // Special handling for test environments
        if (isTestEnvironment) {
            methodLogger.debug('Running in test environment');
        }
        methodLogger.debug(`Getting trending coins with filters: ${JSON.stringify(args)}`, {
            originalOptions: args,
            isTestEnvironment,
        });
        try {
            // Call the service with ipAddress and the mapped serviceOptions
            const data = await nexaApiService_js_1.default.getTrendingCoins(args.liquidityRangeMin, args.liquidityRangeMax, args.volumeRangeMin, args.volumeRangeMax, args.marketCapRangeMin, args.marketCapRangeMax, args.hideLstCoins, args.hideStableCoins);
            methodLogger.debug(`Got the response from the service`, data);
            return { content: JSON.stringify(data) };
        }
        catch (error) {
            methodLogger.error('Error getting trending coins', error);
            throw error;
        }
    }
    catch (error) {
        throw (0, error_handler_util_js_1.handleControllerError)(error, (0, error_handler_util_js_2.buildErrorContext)('Coin Search', 'getTrendingCoins', 'controllers/coinsDiscovery.controller.ts@getTrendingCoins'));
    }
}
/**
 * @function getLatestCreatedCoins
 * @description Fetches the list of coin that are latest created on Sui
 * @memberof CoinDiscoveryController
 * @param {Object} args - Arguments containing filter options
 * @param {number} [args.liquidityRangeMin] - Minimum liquidity of the coin
 * @param {number} [args.liquidityRangeMax] - Maximum liquidity of the coin
 * @param {number} [args.volumeRangeMin] - Minimum volume of the coin
 * @param {number} [args.volumeRangeMax] - Maximum volume of the coin
 * @param {number} [args.marketCapRangeMin] - Minimum market cap of the coin
 * @param {number} [args.marketCapRangeMax] - Maximum market cap of the coin
 * @param {boolean} [args.hideLstCoins] - Whether to hide LST coins
 * @param {boolean} [args.hideStableCoins] - Whether to hide stable coins
 * @returns {Promise<ControllerResponse>} A promise that resolves to the standard controller response containing the list of trending coins in Markdown.
 * @throws {McpError} Throws an McpError (handled by `handleControllerError`) if the service call fails or returns an error.
 */
async function getLatestCreatedCoins(args) {
    if (!args.liquidityRangeMin)
        args.liquidityRangeMin = DEFAULT_FILTERS.liquidityRangeMin;
    if (!args.liquidityRangeMax)
        args.liquidityRangeMax = DEFAULT_FILTERS.liquidityRangeMax;
    if (!args.volumeRangeMin)
        args.volumeRangeMin = DEFAULT_FILTERS.volumeRangeMin;
    if (!args.volumeRangeMax)
        args.volumeRangeMax = DEFAULT_FILTERS.volumeRangeMax;
    if (!args.marketCapRangeMin)
        args.marketCapRangeMin = DEFAULT_FILTERS.marketCapRangeMin;
    if (!args.marketCapRangeMax)
        args.marketCapRangeMax = DEFAULT_FILTERS.marketCapRangeMax;
    if (!args.hideLstCoins)
        args.hideLstCoins = DEFAULT_FILTERS.hideLstCoins;
    if (!args.hideStableCoins)
        args.hideStableCoins = DEFAULT_FILTERS.hideStableCoins;
    const methodLogger = logger_util_js_1.Logger.forContext('controllers/coinsDiscovery.controller.ts', 'getLatestCreatedCoins');
    methodLogger.debug(`Getting latest created coins with filters: ${JSON.stringify(args)}`);
    try {
        // Detect if we're running in a test environment
        const isTestEnvironment = process.env.NODE_ENV === 'test' ||
            process.env.JEST_WORKER_ID !== undefined;
        // Special handling for test environments
        if (isTestEnvironment) {
            methodLogger.debug('Running in test environment');
        }
        methodLogger.debug(`Getting trending coins with filters: ${JSON.stringify(args)}`, {
            originalOptions: args,
            isTestEnvironment,
        });
        try {
            // Call the service with ipAddress and the mapped serviceOptions
            const data = await nexaApiService_js_1.default.getLatestCreatedCoins(args.liquidityRangeMin, args.liquidityRangeMax, args.volumeRangeMin, args.volumeRangeMax, args.marketCapRangeMin, args.marketCapRangeMax, args.hideLstCoins, args.hideStableCoins);
            methodLogger.debug(`Got the response from the service`, data);
            return { content: JSON.stringify(data) };
        }
        catch (error) {
            methodLogger.error('Error getting latest created coins', error);
            throw error;
        }
    }
    catch (error) {
        throw (0, error_handler_util_js_1.handleControllerError)(error, (0, error_handler_util_js_2.buildErrorContext)('Coin Search', 'getLatestCreatedCoins', 'controllers/coinsDiscovery.controller.ts@getLatestCreatedCoins'));
    }
}
exports.default = { getTrendingCoins, getLatestCreatedCoins };
//# sourceMappingURL=coinsDiscovery.controller.js.map