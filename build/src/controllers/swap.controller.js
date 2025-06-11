"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const logger_util_js_1 = require("../utils/logger.util.js");
const error_handler_util_js_1 = require("../utils/error-handler.util.js");
const error_handler_util_js_2 = require("../utils/error-handler.util.js");
const index_js_1 = tslib_1.__importDefault(require("../helpers/Swap/index.js"));
/**
 * @namespace SwapController
 * @description Controller responsible for handling swap/buy/sell logic.
 */
/**
 * @function generateTransactionBlock
 * @description Generate a transaction block for a swap
 * @memberof SwapController
 * @param {Object} args - Arguments containing coinIn, coinOut, amountIn, and address
 * @param {string} args.coinIn - Coin type to swap from
 * @param {string} args.coinOut - Coin type to swap to
 * @param {number} args.amountIn - Amount of coinIn to swap
 * @param {string} args.address - Address to send the swap to
 * @returns {Promise<ControllerResponse>} A promise that resolves to the standard controller response containing the transaction block in base64.
 * @throws {McpError} Throws an McpError (handled by `handleControllerError`) if the service call fails or returns an error.
 */
async function generateTransactionBlock(args) {
    const methodLogger = logger_util_js_1.Logger.forContext('controllers/swap.controller.ts', 'generateTransactionBlock');
    methodLogger.debug(`Generating transaction block for swap with coinIn: ${args.coinIn}, coinOut: ${args.coinOut}, amountIn: ${args.amountIn}, address: ${args.address}...`);
    try {
        // Detect if we're running in a test environment
        const isTestEnvironment = process.env.NODE_ENV === 'test' ||
            process.env.JEST_WORKER_ID !== undefined;
        // Special handling for test environments
        if (isTestEnvironment) {
            methodLogger.debug('Running in test environment');
        }
        methodLogger.debug(`Generating transaction block for swap with coinIn: ${args.coinIn}, coinOut: ${args.coinOut}, amountIn: ${args.amountIn}, address: ${args.address}`, {
            coinIn: args.coinIn,
            coinOut: args.coinOut,
            amountIn: args.amountIn,
            address: args.address,
            originalOptions: args,
            isTestEnvironment,
        });
        try {
            // Call the service with ipAddress and the mapped serviceOptions
            await index_js_1.default.fetchQuotes(args.coinIn, args.coinOut, BigInt(args.amountIn));
            if (!index_js_1.default.getOutputAmount()) {
                throw new Error('No routes found for the given pair');
            }
            const tx = await index_js_1.default.executeSwapTxn(args.address, 0.05, args.coinIn, args.coinOut, BigInt(args.amountIn));
            if (!tx) {
                throw new Error('Failed to create transaction!');
            }
            const txn = await tx.build();
            return { content: txn.toString() };
        }
        catch (error) {
            methodLogger.error('Error generating transaction block', error);
            throw error;
        }
    }
    catch (error) {
        throw (0, error_handler_util_js_1.handleControllerError)(error, (0, error_handler_util_js_2.buildErrorContext)('Generate Transaction Block', 'generateTransactionBlock', 'controllers/swap.controller.ts@generateTransactionBlock', args.coinIn || 'current device', { args }));
    }
}
exports.default = { generateTransactionBlock };
//# sourceMappingURL=swap.controller.js.map