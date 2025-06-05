import { SuiClient, SuiHTTPTransport } from '@mysten/sui/client';

import { SUI_RPC_ENDPOINT } from '@/constants';

const client = new SuiClient({
	transport: new SuiHTTPTransport({
		url: SUI_RPC_ENDPOINT,
	}),
});

export default client;
