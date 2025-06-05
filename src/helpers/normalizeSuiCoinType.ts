export const normalizeSuiCoinType = (coinType: string) => {
	if (coinType !== '0x2::sui::SUI') return coinType;
	return '0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI';
};

export const denormalizeSuiCoinType = (coinType: string) => {
	if (
		coinType !==
		'0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI'
	)
		return coinType;
	return '0x2::sui::SUI';
};
