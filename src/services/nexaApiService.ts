import { NEXA_API_URL } from '@/constants';
import {
	CoinMarketDataResponseSchema,
	type CoinMarketDataResponse,
} from '@/types/dataTypes/coinMarketData.type';
import {
	CoinSecurityChecksResponseSchema,
	type CoinSecurityChecksResponse,
} from '@/types/dataTypes/coinSecurityChecks.type';
import {
	CoinsListResponseSchema,
	type CoinsListResponse,
} from '@/types/dataTypes/coinsListApi.types';
import {
	CoinSearchResponse,
	CoinSearchResponseSchema,
} from '@/types/dataTypes/searchApi.types';
import axios from 'axios';

class NexaApiService {
	static async searchCoin(query: string): Promise<CoinSearchResponse> {
		const response = await axios.get(
			`${NEXA_API_URL}/search/query/${query}`,
		);
		return CoinSearchResponseSchema.parse(response.data);
	}

	static async getTrendingCoins(
		liquidityRangeMin: number,
		liquidityRangeMax: number,
		volumeRangeMin: number,
		volumeRangeMax: number,
		marketCapRangeMin: number,
		marketCapRangeMax: number,
		hideLstCoins: boolean,
		hideStableCoins: boolean,
	): Promise<CoinsListResponse> {
		const response = await axios.get(
			`${NEXA_API_URL}/meme-coins/trending?liquidityRangeMin=${liquidityRangeMin}&liquidityRangeMax=${liquidityRangeMax}&volumeRangeMin=${volumeRangeMin}&volumeRangeMax=${volumeRangeMax}&marketCapRangeMin=${marketCapRangeMin}&marketCapRangeMax=${marketCapRangeMax}&hideLstCoins=${hideLstCoins}&hideStableCoins=${hideStableCoins}`,
		);
		return CoinsListResponseSchema.parse(response.data);
	}

	static async getLatestCreatedCoins(
		liquidityRangeMin: number,
		liquidityRangeMax: number,
		volumeRangeMin: number,
		volumeRangeMax: number,
		marketCapRangeMin: number,
		marketCapRangeMax: number,
		hideLstCoins: boolean,
		hideStableCoins: boolean,
	): Promise<CoinsListResponse> {
		const response = await axios.get(
			`${NEXA_API_URL}/coins/latest-v2?liquidityRangeMin=${liquidityRangeMin}&liquidityRangeMax=${liquidityRangeMax}&volumeRangeMin=${volumeRangeMin}&volumeRangeMax=${volumeRangeMax}&marketCapRangeMin=${marketCapRangeMin}&marketCapRangeMax=${marketCapRangeMax}&hideLstCoins=${hideLstCoins}&hideStableCoins=${hideStableCoins}`,
		);
		return CoinsListResponseSchema.parse(response.data);
	}

	static async getSecurityCheckForCoin(
		coinType: string,
	): Promise<CoinSecurityChecksResponse> {
		const response = await axios.get(
			`${NEXA_API_URL}/coins/${coinType}/safety-checks`,
		);
		return CoinSecurityChecksResponseSchema.parse(response.data);
	}

	static async getCoinMarketData(
		coinType: string,
	): Promise<CoinMarketDataResponse> {
		const response = await axios.get(
			`${NEXA_API_URL}/coins/${coinType}/market-data`,
		);
		return CoinMarketDataResponseSchema.parse(response.data);
	}

	static async getCoinPrice(coinId: string) {
		return axios.get(`${NEXA_API_URL}/coins/${coinId}/price`);
	}
}

export default NexaApiService;
