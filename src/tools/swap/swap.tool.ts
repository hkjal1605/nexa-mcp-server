import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Logger } from '@/utils/logger.util.js';
import { formatErrorForMcpTool } from '@/utils/error.util.js';
import swapController from '@/controllers/swap.controller.js';
import { SwapToolArgs, type SwapToolArgsType } from './swap.types';

/**
 * @function handleGenerateTransactionBlock
 * @description MCP Tool handler to generate a transaction block for a swap.
 *              It calls the swapController to fetch the data and formats the response for the MCP.
 *
 * @param {SwapToolArgsType} args - Combined arguments (coinIn, coinOut, amountIn, address) provided to the tool.
 * @returns {Promise<{ content: Array<{ type: 'text', text: string }> }>} Formatted response for the MCP.
 * @throws {McpError} Formatted error if the controller or service layer encounters an issue.
 */
async function handleGenerateTransactionBlock(args: SwapToolArgsType) {
	const methodLogger = Logger.forContext(
		'tools/swap.tool.ts',
		'handleGenerateTransactionBlock',
	);
	methodLogger.debug(
		`Generating transaction block for swap with args: ${args}...`,
		args,
	);

	try {
		// Pass args directly to the controller
		const result = await swapController.generateTransactionBlock(args);
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
			`Error generating transaction block for ${args.coinIn} -> ${args.coinOut}`,
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
		'tools/ipaddress.tool.ts',
		'registerTools',
	);
	methodLogger.debug(`Registering coin search tools...`);

	server.tool(
		'swap_generate_transaction_block',
		`Generates a transaction block for a swap`,
		SwapToolArgs.shape,
		handleGenerateTransactionBlock,
	);

	methodLogger.debug(
		'Successfully registered swap_generate_transaction_block tool.',
	);
}

export default { registerTools };
