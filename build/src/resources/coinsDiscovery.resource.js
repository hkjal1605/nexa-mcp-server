"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const logger_util_js_1 = require("../utils/logger.util.js");
const coinsDiscovery_controller_js_1 = tslib_1.__importDefault(require("../controllers/coinsDiscovery.controller.js"));
const error_util_js_1 = require("../utils/error.util.js");
const logger = logger_util_js_1.Logger.forContext('resources/coinsDiscovery.resource.ts');
/**
 * Register coin discovery resources with the MCP server
 *
 * @param server The MCP server instance
 */
function registerResources(server) {
    const registerLogger = logger.forMethod('registerResources');
    registerLogger.debug('Registering coins discovery resources...');
    // Register the trending coins resource
    server.resource('trending-coins', new mcp_js_1.ResourceTemplate('coins-discovery://trending-coins', {
        list: undefined,
    }), async (uri) => {
        const methodLogger = logger.forMethod('coinsDiscoveryResource');
        try {
            methodLogger.info('Coins discovery resource called', {
                uri: uri.toString(),
            });
            // Call the controller to get the trending coins
            const result = await coinsDiscovery_controller_js_1.default.getTrendingCoins({
                liquidityRangeMin: Number(uri.searchParams.get('liquidityRangeMin') || 0),
                liquidityRangeMax: Number(uri.searchParams.get('liquidityRangeMax') || 0),
                volumeRangeMin: Number(uri.searchParams.get('volumeRangeMin') || 0),
                volumeRangeMax: Number(uri.searchParams.get('volumeRangeMax') || 0),
                marketCapRangeMin: Number(uri.searchParams.get('marketCapRangeMin') || 0),
                marketCapRangeMax: Number(uri.searchParams.get('marketCapRangeMax') || 0),
                hideLstCoins: uri.searchParams.get('hideLstCoins') === 'true',
                hideStableCoins: uri.searchParams.get('hideStableCoins') === 'true',
            });
            // Return the content as a text resource
            return {
                contents: [
                    {
                        uri: uri.toString(),
                        text: result.content,
                        mimeType: 'text/markdown',
                        description: `Trending coins`,
                    },
                ],
            };
        }
        catch (error) {
            methodLogger.error('Resource error', error);
            return (0, error_util_js_1.formatErrorForMcpResource)(error, uri.toString());
        }
    });
    // Register the latest created coins resource
    server.resource('latest-created-coins', new mcp_js_1.ResourceTemplate('coins-discovery://latest-created-coins', {
        list: undefined,
    }), async (uri) => {
        const methodLogger = logger.forMethod('coinsDiscoveryResource');
        try {
            methodLogger.debug('Coins discovery resource called', {
                uri: uri.toString(),
            });
            // Call the controller to get the latest created coins
            const result = await coinsDiscovery_controller_js_1.default.getLatestCreatedCoins({
                liquidityRangeMin: Number(uri.searchParams.get('liquidityRangeMin') || 0),
                liquidityRangeMax: Number(uri.searchParams.get('liquidityRangeMax') || 0),
                volumeRangeMin: Number(uri.searchParams.get('volumeRangeMin') || 0),
                volumeRangeMax: Number(uri.searchParams.get('volumeRangeMax') || 0),
                marketCapRangeMin: Number(uri.searchParams.get('marketCapRangeMin') || 0),
                marketCapRangeMax: Number(uri.searchParams.get('marketCapRangeMax') || 0),
                hideLstCoins: uri.searchParams.get('hideLstCoins') === 'true',
                hideStableCoins: uri.searchParams.get('hideStableCoins') === 'true',
            });
            // Return the content as a text resource
            return {
                contents: [
                    {
                        uri: uri.toString(),
                        text: result.content,
                        mimeType: 'text/markdown',
                        description: `Latest created coins`,
                    },
                ],
            };
        }
        catch (error) {
            methodLogger.error('Resource error', error);
            return (0, error_util_js_1.formatErrorForMcpResource)(error, uri.toString());
        }
    });
    registerLogger.debug('Coin discovery resources registered successfully');
}
exports.default = { registerResources };
//# sourceMappingURL=coinsDiscovery.resource.js.map