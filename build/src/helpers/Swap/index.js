"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bcs_1 = require("@mysten/sui/bcs");
const transactions_1 = require("@mysten/sui/transactions");
const constants_1 = require("../../constants");
const nexaApiService_1 = tslib_1.__importDefault(require("../../services/nexaApiService"));
const aftermath_1 = require("./aftermath");
const coinsHelper_1 = tslib_1.__importDefault(require("../coinsHelper"));
const normalizeSuiCoinType_1 = require("../normalizeSuiCoinType");
const Sui_1 = tslib_1.__importDefault(require("../Sui"));
// import { CetusSdk } from './cetus';
class SpotTradeSdk {
    afRouter;
    afQuote;
    afOutputAmount = 0;
    constructor() {
        this.afRouter = new aftermath_1.AftermathSdk();
    }
    fetchQuotes = async (tokenIn, tokenOut, amount) => {
        try {
            const [afQuote] = await Promise.all([
                this.afRouter.fetchQuote(tokenIn, tokenOut, amount),
            ]);
            if (afQuote) {
                this.afQuote = afQuote;
                this.afOutputAmount = Number(afQuote.coinOut.amount);
            }
        }
        catch (err) {
            console.error(err);
        }
    };
    getOutputAmount = () => {
        return this.afOutputAmount;
    };
    executeSwapTxn = async (address, slippage, coinInType, coinOutType, amountIn) => {
        try {
            let tx = new transactions_1.Transaction();
            const [coinInArg, suiPriceResponse] = await Promise.all([
                coinsHelper_1.default.getExactCoinByAmount(address, coinInType, amountIn, tx),
                nexaApiService_1.default.getCoinPrice(constants_1.SUI_COIN_TYPE),
            ]);
            let coinInAfterFeeArg = coinInArg;
            if ((0, normalizeSuiCoinType_1.denormalizeSuiCoinType)(coinInType) === constants_1.SUI_COIN_TYPE) {
                const [suiCoinAfterFee] = tx.moveCall({
                    target: `${constants_1.NEXA_PACKAGE_ID}::nexa_trade_fee::register_fee_v2`,
                    typeArguments: [coinInType, coinOutType],
                    arguments: [
                        tx.object(constants_1.NEXA_TRADE_FEE_OBJECT),
                        coinInArg,
                        tx.pure.u256(BigInt(Math.floor((suiPriceResponse?.data?.price || 0) *
                            constants_1.NEXA_CONTRACTS_PRECISION))),
                        tx.pure.bool(true),
                    ],
                });
                coinInAfterFeeArg = suiCoinAfterFee;
            }
            let coinOut;
            try {
                const data = await this.afRouter.getSwapTxnWithCoinOut(tx, coinInAfterFeeArg, this.afQuote, address, slippage);
                tx = data.tx;
                coinOut = data.coinOut;
            }
            catch (err) {
                console.error(err);
            }
            let coinOutAfterFeeArg = coinOut;
            if (coinOutType === constants_1.SUI_COIN_TYPE) {
                const [suiCoinAfterFee] = tx.moveCall({
                    target: `${constants_1.NEXA_PACKAGE_ID}::nexa_trade_fee::register_fee_v2`,
                    typeArguments: [coinOutType, coinInType],
                    arguments: [
                        tx.object(constants_1.NEXA_TRADE_FEE_OBJECT),
                        coinOut,
                        tx.pure.u256(BigInt(Math.floor((suiPriceResponse?.data?.price || 0) *
                            constants_1.NEXA_CONTRACTS_PRECISION))),
                        tx.pure.bool(false),
                    ],
                });
                coinOutAfterFeeArg = suiCoinAfterFee;
            }
            if (coinInType !== constants_1.SUI_COIN_TYPE && coinOutType !== constants_1.SUI_COIN_TYPE) {
                // None of the coins are SUI, we will deduct 1% of the output coin value and swap it to SUI and transfer to the revenue wallet
                tx.moveCall({
                    target: '0x2::coin::value',
                    typeArguments: [coinOutType],
                    arguments: [coinOutAfterFeeArg],
                });
                const devInspectResult = await Sui_1.default.devInspectTransactionBlock({
                    transactionBlock: tx,
                    sender: address,
                });
                if (!devInspectResult.results || !devInspectResult.results.length) {
                    throw new Error('Failed to create transaction');
                }
                const coinOutValue = bcs_1.bcs
                    .u64()
                    .parse(new Uint8Array(devInspectResult.results[devInspectResult.results.length - 1]?.returnValues[0][0]));
                const [feeCoin] = tx.splitCoins(coinOut, [
                    tx.pure.u64(Math.floor(Number(coinOutValue) * 0.01)),
                ]);
                const feeCoinToSuiQuote = await this.afRouter.fetchQuote(coinOutType, constants_1.SUI_COIN_TYPE, BigInt(Math.floor(Number(coinOutValue) * 0.01)));
                if (feeCoinToSuiQuote) {
                    const data = await this.afRouter.getSwapTxnWithCoinOut(tx, feeCoin, feeCoinToSuiQuote, address, 0.05);
                    tx = data.tx;
                    tx.transferObjects([data.coinOut], constants_1.NEXA_REVENUE_WALLET);
                }
            }
            tx.transferObjects([coinOutAfterFeeArg], tx.pure.address(address));
            return tx;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    };
    getAfQuote = () => this.afQuote;
    executeTrade = async (address, slippage, coinIn, coinOut, amountIn, route) => {
        if (route) {
            this.afQuote = route;
        }
        const tx = await this.executeSwapTxn(address, slippage, coinIn.coinType, coinOut.coinType, BigInt(Math.floor(Number(amountIn) * 10 ** coinIn.decimals)));
        if (!tx) {
            throw new Error('Failed to create transaction!');
        }
        return tx;
    };
}
const spotTradeSdk = new SpotTradeSdk();
exports.default = spotTradeSdk;
//# sourceMappingURL=index.js.map