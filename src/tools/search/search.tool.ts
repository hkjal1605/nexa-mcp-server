import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Logger } from '@/utils/logger.util.js';
import { SearchCoinToolArgs, SearchCoinToolArgsType } from './search.types.js';
import { formatErrorForMcpTool } from '@/utils/error.util.js';
import searchController from '@/controllers/search.controller.js';

/**
 * @function handleSearchCoin
 * @description MCP Tool handler to retrieve details for a given coin query.
 *              It calls the searchController to fetch the data and formats the response for the MCP.
 *
 * @param {SearchCoinToolArgsType} args - Combined arguments (query) provided to the tool.
 * @returns {Promise<{ content: Array<{ type: 'text', text: string }> }>} Formatted response for the MCP.
 * @throws {McpError} Formatted error if the controller or service layer encounters an issue.
 */
async function handleSearchCoin(args: SearchCoinToolArgsType) {
	const methodLogger = Logger.forContext(
		'tools/search.tool.ts',
		'handleSearchCoin',
	);
	methodLogger.debug(`Searching for coin with query: ${args.query}...`, args);

	try {
		// Pass args directly to the controller
		const result = await searchController.searchCoin(args);
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
		methodLogger.error(`Error searching for coin: ${args.query}`, error);
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
		'tools/ipaddress.tool.ts',
		'registerTools',
	);
	methodLogger.debug(`Registering coin search tools...`);

	server.tool(
		'search_coin',
		`Searches for a coin by ticker or address, returning array of matching coins.`,
		SearchCoinToolArgs.shape,
		handleSearchCoin,
	);

	methodLogger.debug('Successfully registered search_coin tool.');
}

export default { registerTools };
