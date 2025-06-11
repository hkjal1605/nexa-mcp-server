"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapToolArgs = void 0;
const zod_1 = require("zod");
/**
 * Zod schema for the IP address tool arguments.
 */
exports.SwapToolArgs = zod_1.z
    .object({
    coinIn: zod_1.z.string().describe('The coin to swap from'),
    coinOut: zod_1.z.string().describe('The coin to swap to'),
    amountIn: zod_1.z.number().describe('The amount of coinIn to swap'),
    address: zod_1.z
        .string()
        .describe('The address that will sign the transaction'),
})
    .strict();
//# sourceMappingURL=swap.types.js.map