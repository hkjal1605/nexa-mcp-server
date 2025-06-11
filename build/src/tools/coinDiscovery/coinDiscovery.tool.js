"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const logger_util_js_1 = require("../../utils/logger.util.js");
const coinDiscovery_type_js_1 = require("./coinDiscovery.type.js");
const error_util_js_1 = require("../../utils/error.util.js");
const coinsDiscovery_controller_js_1 = tslib_1.__importDefault(require("../../controllers/coinsDiscovery.controller.js"));
/**
 * @function handleGetTrendingCoins
 * @description MCP Tool handler to retrieve trending coins.
 *              It calls the coinsDiscoveryController to fetch the data and formats the response for the MCP.
 *
 * @param {CoinDiscoveryToolArgsType} args - Combined arguments (query) provided to the tool.
 * @returns {Promise<{ content: Array<{ type: 'text', text: string }> }>} Formatted response for the MCP.
 * @throws {McpError} Formatted error if the controller or service layer encounters an issue.
 */
async function handleGetTrendingCoins(args) {
    const methodLogger = logger_util_js_1.Logger.forContext('tools/coinDiscovery.tool.ts', 'handleCoinDiscovery');
    methodLogger.debug(`Discovering coins...`, args);
    try {
        // Pass args directly to the controller
        const result = await coinsDiscovery_controller_js_1.default.getTrendingCoins(args);
        methodLogger.debug(`Got the response from the controller`, result);
        // Format the response for the MCP tool
        return {
            content: [
                {
                    type: 'text',
                    text: result.content,
                },
            ],
        };
    }
    catch (error) {
        methodLogger.error(`Error getting trending coins with filter: ${args}`, error);
        return (0, error_util_js_1.formatErrorForMcpTool)(error);
    }
}
/**
 * @function handleGetLatestCreatedCoins
 * @description MCP Tool handler to retrieve latest created coins.
 *              It calls the coinsDiscoveryController to fetch the data and formats the response for the MCP.
 *
 * @param {CoinDiscoveryToolArgsType} args - Combined arguments (query) provided to the tool.
 * @returns {Promise<{ content: Array<{ type: 'text', text: string }> }>} Formatted response for the MCP.
 * @throws {McpError} Formatted error if the controller or service layer encounters an issue.
 */
async function handleGetLatestCreatedCoins(args) {
    const methodLogger = logger_util_js_1.Logger.forContext('tools/coinDiscovery.tool.ts', 'handleCoinDiscovery');
    methodLogger.debug(`Discovering coins...`, args);
    try {
        // Pass args directly to the controller
        const result = await coinsDiscovery_controller_js_1.default.getLatestCreatedCoins(args);
        methodLogger.debug(`Got the response from the controller`, result);
        // Format the response for the MCP tool
        return {
            content: [
                {
                    type: 'text',
                    text: result.content,
                },
            ],
        };
    }
    catch (error) {
        methodLogger.error(`Error getting latest created coins with filter: ${args}`, error);
        return (0, error_util_js_1.formatErrorForMcpTool)(error);
    }
}
/**
 * @function registerTools
 * @description Registers the coin discovery tools ('get_trending_coins' and 'get_latest_created_coins') with the MCP server.
 *
 * @param {McpServer} server - The MCP server instance.
 */
function registerTools(server) {
    const methodLogger = logger_util_js_1.Logger.forContext('tools/coinDiscovery.tool.ts', 'registerTools');
    methodLogger.debug(`Registering coin discovery tools...`);
    server.tool('get_trending_coins', `Returns the trending coins on Sui, filtered based on the given inputs.`, coinDiscovery_type_js_1.CoinDiscoveryToolArgs.shape, handleGetTrendingCoins);
    methodLogger.debug('Successfully registered get_trending_coins tool.');
    server.tool('get_latest_created_coins', `Returns the latest created coins on Sui, filtered based on the given inputs.`, coinDiscovery_type_js_1.CoinDiscoveryToolArgs.shape, handleGetLatestCreatedCoins);
    methodLogger.debug('Successfully registered get_latest_created_coins tool.');
}
exports.default = { registerTools };
//# sourceMappingURL=coinDiscovery.tool.js.map