"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.denormalizeSuiCoinType = exports.normalizeSuiCoinType = void 0;
const normalizeSuiCoinType = (coinType) => {
    if (coinType !== '0x2::sui::SUI')
        return coinType;
    return '0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI';
};
exports.normalizeSuiCoinType = normalizeSuiCoinType;
const denormalizeSuiCoinType = (coinType) => {
    if (coinType !==
        '0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI')
        return coinType;
    return '0x2::sui::SUI';
};
exports.denormalizeSuiCoinType = denormalizeSuiCoinType;
//# sourceMappingURL=normalizeSuiCoinType.js.map