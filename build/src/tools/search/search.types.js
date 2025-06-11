"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchCoinToolArgs = void 0;
const zod_1 = require("zod");
/**
 * Zod schema for the IP address tool arguments.
 */
exports.SearchCoinToolArgs = zod_1.z
    .object({
    query: zod_1.z
        .string()
        .describe('The query to search for. Can be the ticker of the coin or the coin address'),
})
    .strict();
//# sourceMappingURL=search.types.js.map