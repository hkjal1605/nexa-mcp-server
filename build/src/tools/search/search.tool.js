"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const logger_util_js_1 = require("../../utils/logger.util.js");
const search_types_js_1 = require("./search.types.js");
const error_util_js_1 = require("../../utils/error.util.js");
const search_controller_js_1 = tslib_1.__importDefault(require("../../controllers/search.controller.js"));
/**
 * @function handleSearchCoin
 * @description MCP Tool handler to retrieve details for a given coin query.
 *              It calls the searchController to fetch the data and formats the response for the MCP.
 *
 * @param {SearchCoinToolArgsType} args - Combined arguments (query) provided to the tool.
 * @returns {Promise<{ content: Array<{ type: 'text', text: string }> }>} Formatted response for the MCP.
 * @throws {McpError} Formatted error if the controller or service layer encounters an issue.
 */
async function handleSearchCoin(args) {
    const methodLogger = logger_util_js_1.Logger.forContext('tools/search.tool.ts', 'handleSearchCoin');
    methodLogger.debug(`Searching for coin with query: ${args.query}...`, args);
    try {
        // Pass args directly to the controller
        const result = await search_controller_js_1.default.searchCoin(args);
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
        methodLogger.error(`Error searching for coin: ${args.query}`, error);
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
    const methodLogger = logger_util_js_1.Logger.forContext('tools/ipaddress.tool.ts', 'registerTools');
    methodLogger.debug(`Registering coin search tools...`);
    server.tool('search_coin', `Searches for a coin by ticker or address, returning array of matching coins.`, search_types_js_1.SearchCoinToolArgs.shape, handleSearchCoin);
    methodLogger.debug('Successfully registered search_coin tool.');
}
exports.default = { registerTools };
//# sourceMappingURL=search.tool.js.map