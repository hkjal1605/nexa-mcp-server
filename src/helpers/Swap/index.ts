import { bcs } from '@mysten/sui/bcs';
import {
  Transaction,
  type TransactionObjectArgument,
} from '@mysten/sui/transactions';
import type { RouterCompleteTradeRoute } from 'aftermath-ts-sdk';

import {
  NEXA_CONTRACTS_PRECISION,
  NEXA_PACKAGE_ID,
  NEXA_REVENUE_WALLET,
  NEXA_TRADE_FEE_OBJECT,
  SUI_COIN_TYPE,
} from '@/constants';
import NexaApiService from '@/services/nexaApiService';

import { AftermathSdk } from './aftermath';
import coinsHelper from '../coinsHelper';
import { denormalizeSuiCoinType } from '../normalizeSuiCoinType';
import client from '../Sui';

// import { CetusSdk } from './cetus';

class SpotTradeSdk {
  private afRouter: AftermathSdk;

  private afQuote: RouterCompleteTradeRoute | undefined;

  private afOutputAmount: number = 0;

  constructor() {
    this.afRouter = new AftermathSdk();
  }

  fetchQuotes = async (tokenIn: string, tokenOut: string, amount: bigint) => {
    try {
      const [afQuote] = await Promise.all([
        this.afRouter.fetchQuote(tokenIn, tokenOut, amount),
      ]);

      if (afQuote) {
        this.afQuote = afQuote;
        this.afOutputAmount = Number(afQuote.coinOut.amount);
      }
    } catch (err) {
      console.error(err);
    }
  };

  getOutputAmount = () => {
    return this.afOutputAmount;
  };

  executeSwapTxn = async (
    address: string,
    slippage: number,
    coinInType: string,
    coinOutType: string,
    amountIn: bigint,
  ) => {
    try {
      let tx = new Transaction();

      const [coinInArg, suiPriceResponse] = await Promise.all([
        coinsHelper.getExactCoinByAmount(address, coinInType, amountIn, tx),
        NexaApiService.getCoinPrice(SUI_COIN_TYPE),
      ]);

      let coinInAfterFeeArg = coinInArg;
      if (denormalizeSuiCoinType(coinInType) === SUI_COIN_TYPE) {
        const [suiCoinAfterFee] = tx.moveCall({
          target: `${NEXA_PACKAGE_ID}::nexa_trade_fee::register_fee_v2`,
          typeArguments: [coinInType, coinOutType],
          arguments: [
            tx.object(NEXA_TRADE_FEE_OBJECT),
            coinInArg,
            tx.pure.u256(
              BigInt(
                Math.floor(
                  (suiPriceResponse?.data?.price || 0) *
                    NEXA_CONTRACTS_PRECISION,
                ),
              ),
            ),
            tx.pure.bool(true),
          ],
        });

        coinInAfterFeeArg = suiCoinAfterFee!;
      }

      let coinOut: TransactionObjectArgument | undefined;

      try {
        const data = await this.afRouter.getSwapTxnWithCoinOut(
          tx,
          coinInAfterFeeArg,
          this.afQuote!,
          address,
          slippage,
        );

        tx = data.tx;
        coinOut = data.coinOut;
      } catch (err) {
        console.error(err);
      }

      let coinOutAfterFeeArg = coinOut;

      if (coinOutType === SUI_COIN_TYPE) {
        const [suiCoinAfterFee] = tx.moveCall({
          target: `${NEXA_PACKAGE_ID}::nexa_trade_fee::register_fee_v2`,
          typeArguments: [coinOutType, coinInType],
          arguments: [
            tx.object(NEXA_TRADE_FEE_OBJECT),
            coinOut!,
            tx.pure.u256(
              BigInt(
                Math.floor(
                  (suiPriceResponse?.data?.price || 0) *
                    NEXA_CONTRACTS_PRECISION,
                ),
              ),
            ),
            tx.pure.bool(false),
          ],
        });

        coinOutAfterFeeArg = suiCoinAfterFee!;
      }

      if (coinInType !== SUI_COIN_TYPE && coinOutType !== SUI_COIN_TYPE) {
        // None of the coins are SUI, we will deduct 1% of the output coin value and swap it to SUI and transfer to the revenue wallet
        tx.moveCall({
          target: '0x2::coin::value',
          typeArguments: [coinOutType],
          arguments: [coinOutAfterFeeArg!],
        });

        const devInspectResult = await client.devInspectTransactionBlock({
          transactionBlock: tx,
          sender: address,
        });

        if (!devInspectResult.results || !devInspectResult.results.length) {
          throw new Error('Failed to create transaction');
        }

        const coinOutValue = bcs
          .u64()
          .parse(
            new Uint8Array(
              devInspectResult.results[
                devInspectResult.results.length - 1
              ]?.returnValues[0][0],
            ),
          );

        const [feeCoin] = tx.splitCoins(coinOut!, [
          tx.pure.u64(Math.floor(Number(coinOutValue) * 0.01)),
        ]);

        const feeCoinToSuiQuote = await this.afRouter.fetchQuote(
          coinOutType,
          SUI_COIN_TYPE,
          BigInt(Math.floor(Number(coinOutValue) * 0.01)),
        );

        if (feeCoinToSuiQuote) {
          const data = await this.afRouter.getSwapTxnWithCoinOut(
            tx,
            feeCoin!,
            feeCoinToSuiQuote,
            address,
            0.05,
          );

          tx = data.tx;
          tx.transferObjects([data.coinOut!], NEXA_REVENUE_WALLET);
        }
      }

      tx.transferObjects([coinOutAfterFeeArg!], tx.pure.address(address));

      return tx;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  getAfQuote = () => this.afQuote;

  executeTrade = async (
    address: string,
    slippage: number,
    coinIn: {
      coinType: string;
      decimals: number;
    },
    coinOut: {
      coinType: string;
      decimals: number;
    },
    amountIn: string,
    route?: RouterCompleteTradeRoute,
  ) => {
    if (route) {
      this.afQuote = route;
    }

    const tx = await this.executeSwapTxn(
      address,
      slippage,
      coinIn.coinType,
      coinOut.coinType,
      BigInt(Math.floor(Number(amountIn) * 10 ** coinIn.decimals)),
    );

    if (!tx) {
      throw new Error('Failed to create transaction!');
    }

    return tx;
  };
}

const spotTradeSdk = new SpotTradeSdk();
export default spotTradeSdk;
