"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinSecurityChecksResponseSchema = void 0;
const zod_1 = require("zod");
const common_types_1 = require("../common.types");
exports.CoinSecurityChecksResponseSchema = zod_1.z
    .object({
    coinDev: zod_1.z.string(),
    coinSupply: zod_1.z.number(),
    treasuryCapOwner: zod_1.z.object({
        ObjectOwner: zod_1.z.string().optional(),
        AddressOwner: zod_1.z.string().optional(),
        Immutable: zod_1.z.boolean().optional(),
    }),
    amountBurned: zod_1.z.number().optional().or(zod_1.z.null()),
    timeCreated: zod_1.z.number().optional().or(zod_1.z.null()),
    burntLpPosition: zod_1.z
        .object({
        _id: zod_1.z.string().optional(),
        coinA: zod_1.z.string().optional(),
        coinB: zod_1.z.string().optional(),
        pool: zod_1.z.string().optional(),
        id: zod_1.z.string().optional().or(zod_1.z.null()),
        timestamp: zod_1.z.number().optional(),
        platform: zod_1.z.string().optional(),
        sender: zod_1.z.string().optional(),
        digest: zod_1.z.string().optional(),
        amountA: zod_1.z.number().optional(),
        amountB: zod_1.z.number().optional(),
    })
        .or(zod_1.z.null()),
    coinMetadata: common_types_1.CoinMetadataSchema,
    coinDevName: zod_1.z.string().optional().or(zod_1.z.null()),
    coinPrice: zod_1.z.number(),
    top10HoldersPercent: zod_1.z.number(),
    amountInLiquidity: zod_1.z.number(),
    coinDevHoldings: zod_1.z.number(),
})
    .strip();
//# sourceMappingURL=coinSecurityChecks.type.js.map