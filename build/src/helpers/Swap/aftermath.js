"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AftermathSdk = void 0;
const aftermath_ts_sdk_1 = require("aftermath-ts-sdk");
const constants_1 = require("../../constants");
class AftermathSdk {
    sdk;
    router;
    constructor() {
        this.sdk = new aftermath_ts_sdk_1.Aftermath('MAINNET');
        this.router = this.sdk.Router();
        this.init();
    }
    async init() {
        await this.sdk.init();
    }
    fetchQuote = async (tokenIn, tokenOut, amount) => {
        try {
            const route = await this.router.getCompleteTradeRouteGivenAmountIn({
                coinInType: tokenIn,
                coinOutType: tokenOut,
                coinInAmount: amount,
                referrer: constants_1.SWAP_FEE_WALLET,
                externalFee: {
                    recipient: constants_1.SWAP_FEE_WALLET,
                    feePercentage: 0,
                },
            });
            return route;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    };
    getSwapTxn = async (route, address, slippage) => {
        const tx = await this.router.getTransactionForCompleteTradeRoute({
            walletAddress: address,
            completeRoute: route,
            slippage,
        });
        return tx;
    };
    getSwapTxnWithCoinOut = async (tx, coinIn, route, address, slippage) => {
        const data = await this.router.addTransactionForCompleteTradeRoute({
            tx,
            coinInId: coinIn,
            walletAddress: address,
            completeRoute: route,
            slippage,
        });
        return {
            tx: data.tx,
            coinOut: data.coinOutId,
        };
    };
}
exports.AftermathSdk = AftermathSdk;
const aftermathSdk = new AftermathSdk();
exports.default = aftermathSdk;
//# sourceMappingURL=aftermath.js.map