"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const constants_1 = require("../constants");
const coinMarketData_type_1 = require("../types/dataTypes/coinMarketData.type");
const coinSecurityChecks_type_1 = require("../types/dataTypes/coinSecurityChecks.type");
const coinsListApi_types_1 = require("../types/dataTypes/coinsListApi.types");
const searchApi_types_1 = require("../types/dataTypes/searchApi.types");
const axios_1 = tslib_1.__importDefault(require("axios"));
const HEADERS = {
    'Content-Type': 'application/json',
    'User-Agent': 'NexaMCP/1.0',
    Origin: 'https://app.nexa.xyz',
};
class NexaApiService {
    static async searchCoin(query) {
        const response = await axios_1.default.get(`${constants_1.NEXA_API_URL}/search/query/${query}`, {
            headers: HEADERS,
        });
        return searchApi_types_1.CoinSearchResponseSchema.parse(response.data);
    }
    static async getTrendingCoins(liquidityRangeMin, liquidityRangeMax, volumeRangeMin, volumeRangeMax, marketCapRangeMin, marketCapRangeMax, hideLstCoins, hideStableCoins) {
        const response = await axios_1.default.get(`${constants_1.NEXA_API_URL}/meme-coins/trending?liquidityRangeMin=${liquidityRangeMin}&liquidityRangeMax=${liquidityRangeMax}&volumeRangeMin=${volumeRangeMin}&volumeRangeMax=${volumeRangeMax}&marketCapRangeMin=${marketCapRangeMin}&marketCapRangeMax=${marketCapRangeMax}&hideLstCoins=${hideLstCoins}&hideStableCoins=${hideStableCoins}`, { headers: HEADERS });
        return coinsListApi_types_1.CoinsListResponseSchema.parse(response.data);
    }
    static async getLatestCreatedCoins(liquidityRangeMin, liquidityRangeMax, volumeRangeMin, volumeRangeMax, marketCapRangeMin, marketCapRangeMax, hideLstCoins, hideStableCoins) {
        const response = await axios_1.default.get(`${constants_1.NEXA_API_URL}/coins/latest-v2?liquidityRangeMin=${liquidityRangeMin}&liquidityRangeMax=${liquidityRangeMax}&volumeRangeMin=${volumeRangeMin}&volumeRangeMax=${volumeRangeMax}&marketCapRangeMin=${marketCapRangeMin}&marketCapRangeMax=${marketCapRangeMax}&hideLstCoins=${hideLstCoins}&hideStableCoins=${hideStableCoins}`, { headers: HEADERS });
        return coinsListApi_types_1.CoinsListResponseSchema.parse(response.data);
    }
    static async getSecurityCheckForCoin(coinType) {
        const response = await axios_1.default.get(`${constants_1.NEXA_API_URL}/coins/${coinType}/safety-checks`, { headers: HEADERS });
        return coinSecurityChecks_type_1.CoinSecurityChecksResponseSchema.parse(response.data);
    }
    static async getCoinMarketData(coinType) {
        const response = await axios_1.default.get(`${constants_1.NEXA_API_URL}/coins/${coinType}/market-data`, { headers: HEADERS });
        return coinMarketData_type_1.CoinMarketDataResponseSchema.parse(response.data);
    }
    static async getCoinPrice(coinId) {
        return axios_1.default.get(`${constants_1.NEXA_API_URL}/coins/${coinId}/price`, {
            headers: HEADERS,
        });
    }
}
exports.default = NexaApiService;
//# sourceMappingURL=nexaApiService.js.map