import { z } from 'zod';
import { CoinMetadataSchema } from '../common.types';

export const CoinSecurityChecksResponseSchema = z
  .object({
    coinDev: z.string(),
    coinSupply: z.number(),
    treasuryCapOwner: z.object({
      ObjectOwner: z.string().optional(),
      AddressOwner: z.string().optional(),
      Immutable: z.boolean().optional(),
    }),
    amountBurned: z.number().optional().or(z.null()),
    timeCreated: z.number().optional().or(z.null()),
    burntLpPosition: z
      .object({
        _id: z.string().optional(),
        coinA: z.string().optional(),
        coinB: z.string().optional(),
        pool: z.string().optional(),
        id: z.string().optional().or(z.null()),
        timestamp: z.number().optional(),
        platform: z.string().optional(),
        sender: z.string().optional(),
        digest: z.string().optional(),
        amountA: z.number().optional(),
        amountB: z.number().optional(),
      })
      .or(z.null()),
    coinMetadata: CoinMetadataSchema,
    coinDevName: z.string().optional().or(z.null()),
    coinPrice: z.number(),
    top10HoldersPercent: z.number(),
    amountInLiquidity: z.number(),
    coinDevHoldings: z.number(),
  })
  .strip();

export type CoinSecurityChecksResponse = z.infer<
  typeof CoinSecurityChecksResponseSchema
>;
