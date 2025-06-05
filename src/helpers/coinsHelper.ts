import type { Transaction } from '@mysten/sui/transactions';

import { SUI_COIN_TYPE } from '@/constants';

import { denormalizeSuiCoinType } from './normalizeSuiCoinType';
import client from './Sui';

class CoinsHelper {
	private getCoinsGreaterThanAmount = (
		amount: bigint,
		coins: { objectId: string; balance: bigint }[],
	) => {
		const coinsWithBalance: string[] = [];

		let collectedAmount = BigInt(0);

		for (const coin of coins) {
			if (
				collectedAmount < amount &&
				!coinsWithBalance.includes(coin.objectId)
			) {
				coinsWithBalance.push(coin.objectId);
				collectedAmount += coin.balance;
			}
			if (
				coin.balance === BigInt(0) &&
				!coinsWithBalance.includes(coin.objectId)
			)
				coinsWithBalance.push(coin.objectId);
		}

		if (collectedAmount >= amount) {
			return coinsWithBalance;
		}
		throw new Error('Insufficient balance');
	};

	public async getExactCoinByAmount(
		address: string,
		coinType: string,
		amount: bigint,
		tx: Transaction,
	) {
		const userCoins = await this.getAllUserCoins({
			address,
			type: coinType,
		});

		if (denormalizeSuiCoinType(coinType) === SUI_COIN_TYPE) {
			const [coinA] = tx.splitCoins(tx.gas, [tx.pure.u64(amount)]);
			return coinA;
		}
		const coinsX = this.getCoinsGreaterThanAmount(
			amount,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			userCoins.map((item: any) => ({
				balance: BigInt(item.balance),
				objectId: item.coinObjectId,
			})),
		);

		if (coinsX.length > 1) {
			tx.mergeCoins(
				tx.object(coinsX[0]!),
				coinsX.slice(1).map((coin) => tx.object(coin)),
			);
		}

		const [coinA] = tx.splitCoins(tx.object(coinsX[0]!), [
			tx.pure.u64(amount),
		]);

		return coinA;
	}

	public getAllUserCoins = async ({
		address,
		type,
	}: {
		type: string;
		address: string;
	}) => {
		let cursor: string | null | undefined = null;

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let coins: any[] = [];
		let iter = 0;

		do {
			try {
				const res = await client.getCoins({
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
			} catch (error) {
				console.error(error);
				cursor = null;
			}
			iter += 1;
		} while (cursor !== null);

		return coins;
	};
}

const coinsHelper = new CoinsHelper();
export default coinsHelper;
