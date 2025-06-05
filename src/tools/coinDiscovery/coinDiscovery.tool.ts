import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Logger } from '@/utils/logger.util.js';
import {
	CoinDiscoveryToolArgs,
	CoinDiscoveryToolArgsType,
} from './coinDiscovery.type.js';
import { formatErrorForMcpTool } from '@/utils/error.util.js';
import coinsDiscoveryController from '@/controllers/coinsDiscovery.controller.js';

/**
 * @function handleGetTrendingCoins
 * @description MCP Tool handler to retrieve trending coins.
 *              It calls the coinsDiscoveryController to fetch the data and formats the response for the MCP.
 *
 * @param {CoinDiscoveryToolArgsType} args - Combined arguments (query) provided to the tool.
 * @returns {Promise<{ content: Array<{ type: 'text', text: string }> }>} Formatted response for the MCP.
 * @throws {McpError} Formatted error if the controller or service layer encounters an issue.
 */
async function handleGetTrendingCoins(args: CoinDiscoveryToolArgsType) {
	const methodLogger = Logger.forContext(
		'tools/coinDiscovery.tool.ts',
		'handleCoinDiscovery',
	);
	methodLogger.debug(`Discovering coins...`, args);

	try {
		// Pass args directly to the controller
		const result = await coinsDiscoveryController.getTrendingCoins(args);
		methodLogger.debug(`Got the response from the controller`, result);

		// Format the response for the MCP tool
		return {
			content: [
				{
					type: 'text' as const,
					text: result.content,
				},
			],
		};
	} catch (error) {
		methodLogger.error(
			`Error getting trending coins with filter: ${args}`,
			error,
		);
		return formatErrorForMcpTool(error);
	}
}

/**
 * @function handleGetLatestCreatedCoins
 * @description MCP Tool handler to retrieve latest created coins.
 *              It calls the coinsDiscoveryController to fetch the data and formats the response for the MCP.
 *
 * @param {CoinDiscoveryToolArgsType} args - Combined arguments (query) provided to the tool.
 * @returns {Promise<{ content: Array<{ type: 'text', text: string }> }>} Formatted response for the MCP.
 * @throws {McpError} Formatted error if the controller or service layer encounters an issue.
 */
async function handleGetLatestCreatedCoins(args: CoinDiscoveryToolArgsType) {
	const methodLogger = Logger.forContext(
		'tools/coinDiscovery.tool.ts',
		'handleCoinDiscovery',
	);
	methodLogger.debug(`Discovering coins...`, args);

	try {
		// Pass args directly to the controller
		const result =
			await coinsDiscoveryController.getLatestCreatedCoins(args);
		methodLogger.debug(`Got the response from the controller`, result);

		// Format the response for the MCP tool
		return {
			content: [
				{
					type: 'text' as const,
					text: result.content,
				},
			],
		};
	} catch (error) {
		methodLogger.error(
			`Error getting latest created coins with filter: ${args}`,
			error,
		);
		return formatErrorForMcpTool(error);
	}
}

/**
 * @function registerTools
 * @description Registers the coin discovery tools ('get_trending_coins' and 'get_latest_created_coins') with the MCP server.
 *
 * @param {McpServer} server - The MCP server instance.
 */
function registerTools(server: McpServer) {
	const methodLogger = Logger.forContext(
		'tools/coinDiscovery.tool.ts',
		'registerTools',
	);
	methodLogger.debug(`Registering coin discovery tools...`);

	server.tool(
		'get_trending_coins',
		`Returns the trending coins on Sui, filtered based on the given inputs.`,
		CoinDiscoveryToolArgs.shape,
		handleGetTrendingCoins,
	);

	methodLogger.debug('Successfully registered get_trending_coins tool.');

	server.tool(
		'get_latest_created_coins',
		`Returns the latest created coins on Sui, filtered based on the given inputs.`,
		CoinDiscoveryToolArgs.shape,
		handleGetLatestCreatedCoins,
	);

	methodLogger.debug(
		'Successfully registered get_latest_created_coins tool.',
	);
}

export default { registerTools };
