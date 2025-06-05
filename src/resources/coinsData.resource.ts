import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Logger } from '../utils/logger.util.js';
import coinsDataController from '../controllers/coinsData.controller.js';
import { formatErrorForMcpResource } from '../utils/error.util.js';

const logger = Logger.forContext('resources/coinData.resource.ts');

/**
 * Register coin data resources with the MCP server
 *
 * @param server The MCP server instance
 */
function registerResources(server: McpServer) {
	const registerLogger = logger.forMethod('registerResources');
	registerLogger.debug('Registering coins data resources...');

	// Register the trending coins resource
	server.resource(
		'coin-security-checks',
		'Get coin security checks',
		async (uri: URL) => {
			const methodLogger = logger.forMethod('coinsDataResource');
			try {
				methodLogger.debug('Coin security checks resource called', {
					uri: uri.toString(),
				});

				// Call the controller to get the trending coins
				const result = await coinsDataController.getCoinSecurityChecks({
					coinType: uri.searchParams.get('coinType') || '',
				});

				// Return the content as a text resource
				return {
					contents: [
						{
							uri: uri.toString(),
							text: result.content,
							mimeType: 'text/markdown',
							description: `Coin security checks for ${uri.searchParams.get(
								'coinType',
							)}`,
						},
					],
				};
			} catch (error) {
				methodLogger.error('Resource error', error);
				return formatErrorForMcpResource(error, uri.toString());
			}
		},
	);

	// Register the coin market data resource
	server.resource(
		'coin-market-data',
		'Get coin market data',
		async (uri: URL) => {
			const methodLogger = logger.forMethod('coinsDataResource');
			try {
				methodLogger.debug('Coin market data resource called', {
					uri: uri.toString(),
				});

				// Call the controller to get the latest created coins
				const result = await coinsDataController.getCoinMarketData({
					coinType: uri.searchParams.get('coinType') || '',
				});

				// Return the content as a text resource
				return {
					contents: [
						{
							uri: uri.toString(),
							text: result.content,
							mimeType: 'text/markdown',
							description: `Coin market data for ${uri.searchParams.get(
								'coinType',
							)}`,
						},
					],
				};
			} catch (error) {
				methodLogger.error('Resource error', error);
				return formatErrorForMcpResource(error, uri.toString());
			}
		},
	);

	registerLogger.debug('Coin data resources registered successfully');
}

export default { registerResources };
