import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Logger } from '../utils/logger.util.js';
import swapController from '../controllers/swap.controller.js';
import { formatErrorForMcpResource } from '../utils/error.util.js';

const logger = Logger.forContext('resources/swap.resource.ts');

/**
 * Register an swap execution resource with the MCP server
 *
 * @param server The MCP server instance
 */
function registerResources(server: McpServer) {
	const registerLogger = logger.forMethod('registerResources');
	registerLogger.debug('Registering swap resources...');

	// Register the IP lookup resource
	server.resource(
		'swap',
		'Generate a transaction block for a swap',
		async (uri: URL) => {
			const methodLogger = logger.forMethod('swapResource');
			try {
				methodLogger.debug('Swap resource called', {
					uri: uri.toString(),
				});

				// Call the controller to get the IP details
				const result = await swapController.generateTransactionBlock({
					coinIn: uri.searchParams.get('coinIn') || '',
					coinOut: uri.searchParams.get('coinOut') || '',
					amountIn: Number(uri.searchParams.get('amountIn')) || 0,
					address: uri.searchParams.get('address') || '',
				});

				// Return the content as a text resource
				return {
					contents: [
						{
							uri: uri.toString(),
							text: result.content,
							mimeType: 'text/markdown',
							description: `Swap for ${uri.toString()}`,
						},
					],
				};
			} catch (error) {
				methodLogger.error('Resource error', error);
				return formatErrorForMcpResource(error, uri.toString());
			}
		},
	);

	registerLogger.debug('Swap resources registered successfully');
}

export default { registerResources };
