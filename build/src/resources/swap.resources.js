"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const logger_util_js_1 = require("../utils/logger.util.js");
const swap_controller_js_1 = tslib_1.__importDefault(require("../controllers/swap.controller.js"));
const error_util_js_1 = require("../utils/error.util.js");
const logger = logger_util_js_1.Logger.forContext('resources/swap.resource.ts');
/**
 * Register an swap execution resource with the MCP server
 *
 * @param server The MCP server instance
 */
function registerResources(server) {
    const registerLogger = logger.forMethod('registerResources');
    registerLogger.debug('Registering swap resources...');
    // Register the IP lookup resource
    server.resource('swap', 'Generate a transaction block for a swap', async (uri) => {
        const methodLogger = logger.forMethod('swapResource');
        try {
            methodLogger.debug('Swap resource called', {
                uri: uri.toString(),
            });
            // Call the controller to get the IP details
            const result = await swap_controller_js_1.default.generateTransactionBlock({
                coinIn: uri.searchParams.get('coinIn') || '',
                coinOut: uri.searchParams.get('coinOut') || '',
                amountIn: Number(uri.searchParams.get('amountIn')) || 0,
                address: uri.searchParams.get('address') || '',
            });
            // Return the content as a text resource
            return {
                contents: [
                    {
                        uri: uri.toString(),
                        text: result.content,
                        mimeType: 'text/markdown',
                        description: `Swap for ${uri.toString()}`,
                    },
                ],
            };
        }
        catch (error) {
            methodLogger.error('Resource error', error);
            return (0, error_util_js_1.formatErrorForMcpResource)(error, uri.toString());
        }
    });
    registerLogger.debug('Swap resources registered successfully');
}
exports.default = { registerResources };
//# sourceMappingURL=swap.resources.js.map