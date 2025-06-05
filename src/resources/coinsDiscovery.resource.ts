import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Logger } from '../utils/logger.util.js';
import coinsDiscoveryController from '../controllers/coinsDiscovery.controller.js';
import { formatErrorForMcpResource } from '../utils/error.util.js';

const logger = Logger.forContext('resources/coinsDiscovery.resource.ts');

/**
 * Register coin discovery resources with the MCP server
 *
 * @param server The MCP server instance
 */
function registerResources(server: McpServer) {
	const registerLogger = logger.forMethod('registerResources');
	registerLogger.debug('Registering coins discovery resources...');

	// Register the trending coins resource
	server.resource(
		'trending-coins',
		'Get trending coins',
		async (uri: URL) => {
			const methodLogger = logger.forMethod('coinsDiscoveryResource');
			try {
				methodLogger.debug('Coins discovery resource called', {
					uri: uri.toString(),
				});

				// Call the controller to get the trending coins
				const result = await coinsDiscoveryController.getTrendingCoins({
					liquidityRangeMin: Number(
						uri.searchParams.get('liquidityRangeMin') || 0,
					),
					liquidityRangeMax: Number(
						uri.searchParams.get('liquidityRangeMax') || 0,
					),
					volumeRangeMin: Number(
						uri.searchParams.get('volumeRangeMin') || 0,
					),
					volumeRangeMax: Number(
						uri.searchParams.get('volumeRangeMax') || 0,
					),
					marketCapRangeMin: Number(
						uri.searchParams.get('marketCapRangeMin') || 0,
					),
					marketCapRangeMax: Number(
						uri.searchParams.get('marketCapRangeMax') || 0,
					),
					hideLstCoins:
						uri.searchParams.get('hideLstCoins') === 'true',
					hideStableCoins:
						uri.searchParams.get('hideStableCoins') === 'true',
				});

				// Return the content as a text resource
				return {
					contents: [
						{
							uri: uri.toString(),
							text: result.content,
							mimeType: 'text/markdown',
							description: `Trending coins`,
						},
					],
				};
			} catch (error) {
				methodLogger.error('Resource error', error);
				return formatErrorForMcpResource(error, uri.toString());
			}
		},
	);

	// Register the latest created coins resource
	server.resource(
		'latest-created-coins',
		'Get latest created coins',
		async (uri: URL) => {
			const methodLogger = logger.forMethod('coinsDiscoveryResource');
			try {
				methodLogger.debug('Coins discovery resource called', {
					uri: uri.toString(),
				});

				// Call the controller to get the latest created coins
				const result =
					await coinsDiscoveryController.getLatestCreatedCoins({
						liquidityRangeMin: Number(
							uri.searchParams.get('liquidityRangeMin') || 0,
						),
						liquidityRangeMax: Number(
							uri.searchParams.get('liquidityRangeMax') || 0,
						),
						volumeRangeMin: Number(
							uri.searchParams.get('volumeRangeMin') || 0,
						),
						volumeRangeMax: Number(
							uri.searchParams.get('volumeRangeMax') || 0,
						),
						marketCapRangeMin: Number(
							uri.searchParams.get('marketCapRangeMin') || 0,
						),
						marketCapRangeMax: Number(
							uri.searchParams.get('marketCapRangeMax') || 0,
						),
						hideLstCoins:
							uri.searchParams.get('hideLstCoins') === 'true',
						hideStableCoins:
							uri.searchParams.get('hideStableCoins') === 'true',
					});

				// Return the content as a text resource
				return {
					contents: [
						{
							uri: uri.toString(),
							text: result.content,
							mimeType: 'text/markdown',
							description: `Latest created coins`,
						},
					],
				};
			} catch (error) {
				methodLogger.error('Resource error', error);
				return formatErrorForMcpResource(error, uri.toString());
			}
		},
	);

	registerLogger.debug('Coin discovery resources registered successfully');
}

export default { registerResources };
