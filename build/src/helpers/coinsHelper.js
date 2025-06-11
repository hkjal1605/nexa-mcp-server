"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const constants_1 = require("../constants");
const normalizeSuiCoinType_1 = require("./normalizeSuiCoinType");
const Sui_1 = tslib_1.__importDefault(require("./Sui"));
class CoinsHelper {
    getCoinsGreaterThanAmount = (amount, coins) => {
        const coinsWithBalance = [];
        let collectedAmount = BigInt(0);
        for (const coin of coins) {
            if (collectedAmount < amount &&
                !coinsWithBalance.includes(coin.objectId)) {
                coinsWithBalance.push(coin.objectId);
                collectedAmount += coin.balance;
            }
            if (coin.balance === BigInt(0) &&
                !coinsWithBalance.includes(coin.objectId))
                coinsWithBalance.push(coin.objectId);
        }
        if (collectedAmount >= amount) {
            return coinsWithBalance;
        }
        throw new Error('Insufficient balance');
    };
    async getExactCoinByAmount(address, coinType, amount, tx) {
        const userCoins = await this.getAllUserCoins({
            address,
            type: coinType,
        });
        if ((0, normalizeSuiCoinType_1.denormalizeSuiCoinType)(coinType) === constants_1.SUI_COIN_TYPE) {
            const [coinA] = tx.splitCoins(tx.gas, [tx.pure.u64(amount)]);
            return coinA;
        }
        const coinsX = this.getCoinsGreaterThanAmount(amount, 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        userCoins.map((item) => ({
            balance: BigInt(item.balance),
            objectId: item.coinObjectId,
        })));
        if (coinsX.length > 1) {
            tx.mergeCoins(tx.object(coinsX[0]), coinsX.slice(1).map((coin) => tx.object(coin)));
        }
        const [coinA] = tx.splitCoins(tx.object(coinsX[0]), [
            tx.pure.u64(amount),
        ]);
        return coinA;
    }
    getAllUserCoins = async ({ address, type, }) => {
        let cursor = null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let coins = [];
        let iter = 0;
        do {
            try {
                const res = await Sui_1.default.getCoins({
                    owner: address,
                    coinType: type,
                    cursor,
                    limit: 50,
                });
                coins = coins.concat(res.data);
                cursor = res.nextCursor;
                if (!res.hasNextPage || iter === 8) {
                    cursor = null;
                }
            }
            catch (error) {
                console.error(error);
                cursor = null;
            }
            iter += 1;
        } while (cursor !== null);
        return coins;
    };
}
const coinsHelper = new CoinsHelper();
exports.default = coinsHelper;
//# sourceMappingURL=coinsHelper.js.map