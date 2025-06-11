"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const logger_util_js_1 = require("../../utils/logger.util.js");
const coinsData_type_js_1 = require("./coinsData.type.js");
const error_util_js_1 = require("../../utils/error.util.js");
const coinsData_controller_js_1 = tslib_1.__importDefault(require("../../controllers/coinsData.controller.js"));
/**
 * @function handleGetCoinMarketData
 * @description MCP Tool handler to retrieve coin market data.
 *              It calls the coinsDataController to fetch the data and formats the response for the MCP.
 *
 * @param {CoinDataToolArgsType} args - Combined arguments (query) provided to the tool.
 * @returns {Promise<{ content: Array<{ type: 'text', text: string }> }>} Formatted response for the MCP.
 * @throws {McpError} Formatted error if the controller or service layer encounters an issue.
 */
async function handleGetCoinMarketData(args) {
    const methodLogger = logger_util_js_1.Logger.forContext('tools/coinsData.tool.ts', 'handleCoinMarketData');
    methodLogger.debug(`Discovering coins...`, args);
    try {
        // Pass args directly to the controller
        const result = await coinsData_controller_js_1.default.getCoinMarketData(args);
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
 * @function handleGetCoinSecurityChecks
 * @description MCP Tool handler to retrieve coin security checks.
 *              It calls the coinsDataController to fetch the data and formats the response for the MCP.
 *
 * @param {CoinDataToolArgsType} args - Combined arguments (query) provided to the tool.
 * @returns {Promise<{ content: Array<{ type: 'text', text: string }> }>} Formatted response for the MCP.
 * @throws {McpError} Formatted error if the controller or service layer encounters an issue.
 */
async function handleGetCoinSecurityChecks(args) {
    const methodLogger = logger_util_js_1.Logger.forContext('tools/coinsData.tool.ts', 'handleCoinSecurityChecks');
    methodLogger.debug(`Discovering coins...`, args);
    try {
        // Pass args directly to the controller
        const result = await coinsData_controller_js_1.default.getCoinSecurityChecks(args);
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
 * @description Registers the IP address lookup tool ('ip_get_details') with the MCP server.
 *
 * @param {McpServer} server - The MCP server instance.
 */
function registerTools(server) {
    const methodLogger = logger_util_js_1.Logger.forContext('tools/coinsData.tool.ts', 'registerTools');
    methodLogger.debug(`Registering coins data tools...`);
    server.tool('get_coin_market_data', `Return the market data of the coin.`, coinsData_type_js_1.CoinDataToolArgs.shape, handleGetCoinMarketData);
    methodLogger.debug('Successfully registered get_coin_market_data tool.');
    server.tool('get_coin_security_checks', `Returns the audit checks of the coin.`, coinsData_type_js_1.CoinDataToolArgs.shape, handleGetCoinSecurityChecks);
    methodLogger.debug('Successfully registered get_coin_security_checks tool.');
}
exports.default = { registerTools };
//# sourceMappingURL=coinsData.tool.js.map