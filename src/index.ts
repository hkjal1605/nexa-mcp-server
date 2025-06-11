import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { Logger } from './utils/logger.util.js';
import { VERSION, PACKAGE_NAME } from './utils/constants.util.js';

// Import tools
import coinDiscoveryTools from './tools/coinDiscovery/coinDiscovery.tool.js';
import swapTools from './tools/swap/swap.tool.js';

// Import resources
import searchResources from './resources/search.resource.js';
import coinsDataResources from './resources/coinsData.resource.js';
import { isInitializeRequest } from '@modelcontextprotocol/sdk/types.js';
import { randomUUID } from 'crypto';

// Create file-level logger
const indexLogger = Logger.forContext('index.ts');
indexLogger.debug('Nexa MCP server module loaded');

const sessions: Record<
  string,
  { server: McpServer; transport: StreamableHTTPServerTransport }
> = {};

/**
 * Initializes and returns the MCP server instance.
 */
function createMcpServer() {
  const serverLogger = Logger.forContext('index.ts', 'startServer');

  serverLogger.info(`Initializing Nexa MCP server v${VERSION}`);
  const server = new McpServer({
    name: PACKAGE_NAME,
    version: VERSION,
    capabilities: {
      tools: { listChanged: true },
      resources: { listChanged: true },
    },
  });

  // Register resources
  serverLogger.info('Registering MCP resources...');
  coinsDataResources.registerResources(server);
  searchResources.registerResources(server);

  // Register tools
  serverLogger.info('Registering MCP tools...');
  coinDiscoveryTools.registerTools(server);
  swapTools.registerTools(server);

  serverLogger.info('All tools and resources registered successfully');
  return server;
}

const app = express();
app.use(bodyParser.json());

app.post('/mcp', async (req, res) => {
  const sessionIdHeader = req.headers['mcp-session-id'];
  let sessionEntry: {
    server: McpServer;
    transport: StreamableHTTPServerTransport;
  } | null = null;

  if (sessionIdHeader && sessions[sessionIdHeader as string]) {
    sessionEntry = sessions[sessionIdHeader as string];
  } else if (!sessionIdHeader && isInitializeRequest(req.body)) {
    const newSessionId = randomUUID();

    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => newSessionId,
      onsessioninitialized: (sid) => {
        sessions[sid] = { server, transport };
      },
    });

    transport.onclose = () => {
      if (transport.sessionId && sessions[transport.sessionId]) {
        delete sessions[transport.sessionId];
      }
    };

    const server = createMcpServer();
    await server.connect(transport);
    sessions[newSessionId] = { server, transport };
    sessionEntry = sessions[newSessionId as string];
  } else {
    res.status(400).json({
      jsonrpc: '2.0',
      error: {
        code: -32000,
        message: 'Bad Request: No valid session ID provided',
      },
      id: null,
    });
    return;
  }

  await sessionEntry.transport.handleRequest(req, res, req.body);
});

async function handleSessionRequest(req: Request, res: Response) {
  const sessionIdHeader = req.headers['mcp-session-id'];
  if (!sessionIdHeader || !sessions[sessionIdHeader as string]) {
    res.status(400).send('Invalid or missing session ID');
    return;
  }
  const { transport } = sessions[sessionIdHeader as string];
  await transport.handleRequest(req, res);
}

app.get('/mcp', handleSessionRequest);
app.delete('/mcp', handleSessionRequest);

const PORT = 7171;
app.listen(PORT, () => {
  console.log(`MCP Server listening on port ${PORT}`);
});
