"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const logger_util_js_1 = require("../utils/logger.util.js");
const search_controller_js_1 = tslib_1.__importDefault(require("../controllers/search.controller.js"));
const error_util_js_1 = require("../utils/error.util.js");
const logger = logger_util_js_1.Logger.forContext('resources/search.resource.ts');
/**
 * Register an IP address lookup resource with the MCP server
 *
 * @param server The MCP server instance
 */
function registerResources(server) {
    const registerLogger = logger.forMethod('registerResources');
    registerLogger.debug('Registering search resources...');
    // Register the IP lookup resource
    server.resource('search-coin', new mcp_js_1.ResourceTemplate('search://coin/{query}', { list: undefined }), async (uri) => {
        const methodLogger = logger.forMethod('searchCoinResource');
        try {
            methodLogger.info('Search coin resource called', {
                uri: uri.toString(),
            });
            // Call the controller to get the IP details
            const result = await search_controller_js_1.default.searchCoin({
                query: uri.pathname.replace('/', ''),
            });
            // Return the content as a text resource
            return {
                contents: [
                    {
                        uri: uri.toString(),
                        text: result.content,
                        mimeType: 'text/markdown',
                        description: `Coin Search for ${uri.pathname.replace('/', '')}`,
                    },
                ],
            };
        }
        catch (error) {
            methodLogger.error('Resource error', error);
            return (0, error_util_js_1.formatErrorForMcpResource)(error, uri.toString());
        }
    });
    registerLogger.debug('Coin search resources registered successfully');
}
exports.default = { registerResources };
//# sourceMappingURL=search.resource.js.map