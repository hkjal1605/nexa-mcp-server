"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const logger_util_js_1 = require("../utils/logger.util.js");
const coinsData_controller_js_1 = tslib_1.__importDefault(require("../controllers/coinsData.controller.js"));
const error_util_js_1 = require("../utils/error.util.js");
const logger = logger_util_js_1.Logger.forContext('resources/coinData.resource.ts');
/**
 * Register coin data resources with the MCP server
 *
 * @param server The MCP server instance
 */
function registerResources(server) {
    const registerLogger = logger.forMethod('registerResources');
    registerLogger.debug('Registering coins data resources...');
    // Register the trending coins resource
    server.resource('coin-security-checks', new mcp_js_1.ResourceTemplate('coin-data://coin-security-checks/{coinType}', {
        list: undefined,
    }), async (uri) => {
        const methodLogger = logger.forMethod('coinsDataResource');
        try {
            methodLogger.debug('Coin security checks resource called', {
                uri: uri.toString(),
            });
            // Call the controller to get the trending coins
            const result = await coinsData_controller_js_1.default.getCoinSecurityChecks({
                coinType: uri.pathname.replace('/', ''),
            });
            // Return the content as a text resource
            return {
                contents: [
                    {
                        uri: uri.toString(),
                        text: result.content,
                        mimeType: 'text/markdown',
                        description: `Coin security checks for ${uri.pathname.replace('/', '')}`,
                    },
                ],
            };
        }
        catch (error) {
            methodLogger.error('Resource error', error);
            return (0, error_util_js_1.formatErrorForMcpResource)(error, uri.toString());
        }
    });
    // Register the coin market data resource
    server.resource('coin-market-data', new mcp_js_1.ResourceTemplate('coin-data://coin-market-data/{coinType}', {
        list: undefined,
    }), async (uri) => {
        const methodLogger = logger.forMethod('coinsDataResource');
        try {
            methodLogger.debug('Coin market data resource called', {
                uri: uri.toString(),
            });
            // Call the controller to get the latest created coins
            const result = await coinsData_controller_js_1.default.getCoinMarketData({
                coinType: uri.pathname.replace('/', ''),
            });
            // Return the content as a text resource
            return {
                contents: [
                    {
                        uri: uri.toString(),
                        text: result.content,
                        mimeType: 'text/markdown',
                        description: `Coin market data for ${uri.pathname.replace('/', '')}`,
                    },
                ],
            };
        }
        catch (error) {
            methodLogger.error('Resource error', error);
            return (0, error_util_js_1.formatErrorForMcpResource)(error, uri.toString());
        }
    });
    registerLogger.debug('Coin data resources registered successfully');
}
exports.default = { registerResources };
//# sourceMappingURL=coinsData.resource.js.map