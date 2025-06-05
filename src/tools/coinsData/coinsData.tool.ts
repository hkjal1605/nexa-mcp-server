import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Logger } from '@/utils/logger.util.js';
import { CoinDataToolArgs, CoinDataToolArgsType } from './coinsData.type.js';
import { formatErrorForMcpTool } from '@/utils/error.util.js';
import coinsDataController from '@/controllers/coinsData.controller.js';

/**
 * @function handleGetCoinMarketData
 * @description MCP Tool handler to retrieve coin market data.
 *              It calls the coinsDataController to fetch the data and formats the response for the MCP.
 *
 * @param {CoinDataToolArgsType} args - Combined arguments (query) provided to the tool.
 * @returns {Promise<{ content: Array<{ type: 'text', text: string }> }>} Formatted response for the MCP.
 * @throws {McpError} Formatted error if the controller or service layer encounters an issue.
 */
async function handleGetCoinMarketData(args: CoinDataToolArgsType) {
	const methodLogger = Logger.forContext(
		'tools/coinsData.tool.ts',
		'handleCoinMarketData',
	);
	methodLogger.debug(`Discovering coins...`, args);

	try {
		// Pass args directly to the controller
		const result = await coinsDataController.getCoinMarketData(args);
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
 * @function handleGetCoinSecurityChecks
 * @description MCP Tool handler to retrieve coin security checks.
 *              It calls the coinsDataController to fetch the data and formats the response for the MCP.
 *
 * @param {CoinDataToolArgsType} args - Combined arguments (query) provided to the tool.
 * @returns {Promise<{ content: Array<{ type: 'text', text: string }> }>} Formatted response for the MCP.
 * @throws {McpError} Formatted error if the controller or service layer encounters an issue.
 */
async function handleGetCoinSecurityChecks(args: CoinDataToolArgsType) {
	const methodLogger = Logger.forContext(
		'tools/coinsData.tool.ts',
		'handleCoinSecurityChecks',
	);
	methodLogger.debug(`Discovering coins...`, args);

	try {
		// Pass args directly to the controller
		const result = await coinsDataController.getCoinSecurityChecks(args);
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
 * @description Registers the IP address lookup tool ('ip_get_details') with the MCP server.
 *
 * @param {McpServer} server - The MCP server instance.
 */
function registerTools(server: McpServer) {
	const methodLogger = Logger.forContext(
		'tools/coinsData.tool.ts',
		'registerTools',
	);
	methodLogger.debug(`Registering coins data tools...`);

	server.tool(
		'get_coin_market_data',
		`Return the market data of the coin.`,
		CoinDataToolArgs.shape,
		handleGetCoinMarketData,
	);

	methodLogger.debug('Successfully registered get_coin_market_data tool.');

	server.tool(
		'get_coin_security_checks',
		`Returns the audit checks of the coin.`,
		CoinDataToolArgs.shape,
		handleGetCoinSecurityChecks,
	);

	methodLogger.debug(
		'Successfully registered get_coin_security_checks tool.',
	);
}

export default { registerTools };
