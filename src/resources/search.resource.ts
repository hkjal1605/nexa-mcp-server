import {
  McpServer,
  ResourceTemplate,
} from '@modelcontextprotocol/sdk/server/mcp.js';
import { Logger } from '../utils/logger.util.js';
import searchController from '../controllers/search.controller.js';
import { formatErrorForMcpResource } from '../utils/error.util.js';

const logger = Logger.forContext('resources/search.resource.ts');

/**
 * Register an IP address lookup resource with the MCP server
 *
 * @param server The MCP server instance
 */
function registerResources(server: McpServer) {
  const registerLogger = logger.forMethod('registerResources');
  registerLogger.debug('Registering search resources...');

  // Register the IP lookup resource
  server.resource(
    'search-coin',
    new ResourceTemplate('search://coin/{query}', { list: undefined }),
    async (uri: URL) => {
      const methodLogger = logger.forMethod('searchCoinResource');
      try {
        methodLogger.info('Search coin resource called', {
          uri: uri.toString(),
        });

        // Call the controller to get the IP details
        const result = await searchController.searchCoin({
          query: uri.pathname.replace('/', ''),
        });

        // Return the content as a text resource
        return {
          contents: [
            {
              uri: uri.toString(),
              text: result.content,
              mimeType: 'text/markdown',
              description: `Coin Search for ${uri.pathname.replace('/', '')}`,
            },
          ],
        };
      } catch (error) {
        methodLogger.error('Resource error', error);
        return formatErrorForMcpResource(error, uri.toString());
      }
    },
  );

  registerLogger.debug('Coin search resources registered successfully');
}

export default { registerResources };
