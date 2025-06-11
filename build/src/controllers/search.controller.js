"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const logger_util_js_1 = require("../utils/logger.util.js");
const error_handler_util_js_1 = require("../utils/error-handler.util.js");
const error_handler_util_js_2 = require("../utils/error-handler.util.js");
const nexaApiService_js_1 = tslib_1.__importDefault(require("../services/nexaApiService.js"));
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
async function searchCoin(args = {}) {
    const methodLogger = logger_util_js_1.Logger.forContext('controllers/search.controller.ts', 'searchCoin');
    methodLogger.info(`Searching for coin with query: ${args.query || 'current device'}...`);
    try {
        methodLogger.info(`Searching for coin with query: ${args.query || 'current IP'}`, {
            query: args.query,
            originalOptions: args,
        });
        try {
            // Call the service with ipAddress and the mapped serviceOptions
            const data = await nexaApiService_js_1.default.searchCoin(args.query || '');
            methodLogger.info(`Got the response from the service`, data);
            return { content: JSON.stringify(data) };
        }
        catch (error) {
            methodLogger.error('Error searching for coin', error);
            throw error;
        }
    }
    catch (error) {
        throw (0, error_handler_util_js_1.handleControllerError)(error, (0, error_handler_util_js_2.buildErrorContext)('Coin Search', 'searchCoin', 'controllers/search.controller.ts@searchCoin', args.query || 'current device', { args }));
    }
}
exports.default = { searchCoin };
//# sourceMappingURL=search.controller.js.map