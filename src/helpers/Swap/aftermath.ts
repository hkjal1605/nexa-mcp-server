import type {
	Transaction,
	TransactionObjectArgument,
} from '@mysten/sui/transactions';
import type { Router, RouterCompleteTradeRoute } from 'aftermath-ts-sdk';
import { Aftermath } from 'aftermath-ts-sdk';

import { SWAP_FEE_WALLET } from '@/constants';

class AftermathSdk {
	sdk: Aftermath;

	router: Router;

	constructor() {
		this.sdk = new Aftermath('MAINNET');
		this.router = this.sdk.Router();

		this.init();
	}

	async init() {
		await this.sdk.init();
	}

	fetchQuote = async (tokenIn: string, tokenOut: string, amount: bigint) => {
		try {
			const route = await this.router.getCompleteTradeRouteGivenAmountIn({
				coinInType: tokenIn,
				coinOutType: tokenOut,
				coinInAmount: amount,

				referrer: SWAP_FEE_WALLET,
				externalFee: {
					recipient: SWAP_FEE_WALLET,
					feePercentage: 0,
				},
			});

			return route;
		} catch (error) {
			console.log(error);
			return null;
		}
	};

	getSwapTxn = async (
		route: RouterCompleteTradeRoute,
		address: string,
		slippage: number,
	) => {
		const tx = await this.router.getTransactionForCompleteTradeRoute({
			walletAddress: address,
			completeRoute: route,
			slippage,
		});

		return tx;
	};

	getSwapTxnWithCoinOut = async (
		tx: Transaction,
		coinIn: TransactionObjectArgument,
		route: RouterCompleteTradeRoute,
		address: string,
		slippage: number,
	) => {
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

const aftermathSdk = new AftermathSdk();

export { AftermathSdk };
export default aftermathSdk;
