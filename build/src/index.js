"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const streamableHttp_js_1 = require("@modelcontextprotocol/sdk/server/streamableHttp.js");
const logger_util_js_1 = require("./utils/logger.util.js");
const constants_util_js_1 = require("./utils/constants.util.js");
// Import tools
const coinDiscovery_tool_js_1 = tslib_1.__importDefault(require("./tools/coinDiscovery/coinDiscovery.tool.js"));
const swap_tool_js_1 = tslib_1.__importDefault(require("./tools/swap/swap.tool.js"));
// Import resources
const search_resource_js_1 = tslib_1.__importDefault(require("./resources/search.resource.js"));
const coinsData_resource_js_1 = tslib_1.__importDefault(require("./resources/coinsData.resource.js"));
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
const crypto_1 = require("crypto");
// Create file-level logger
const indexLogger = logger_util_js_1.Logger.forContext('index.ts');
indexLogger.debug('Nexa MCP server module loaded');
const sessions = {};
/**
 * Initializes and returns the MCP server instance.
 */
function createMcpServer() {
    const serverLogger = logger_util_js_1.Logger.forContext('index.ts', 'startServer');
    serverLogger.info(`Initializing Nexa MCP server v${constants_util_js_1.VERSION}`);
    const server = new mcp_js_1.McpServer({
        name: constants_util_js_1.PACKAGE_NAME,
        version: constants_util_js_1.VERSION,
        capabilities: {
            tools: { listChanged: true },
            resources: { listChanged: true },
        },
    });
    // Register resources
    serverLogger.info('Registering MCP resources...');
    coinsData_resource_js_1.default.registerResources(server);
    search_resource_js_1.default.registerResources(server);
    // Register tools
    serverLogger.info('Registering MCP tools...');
    coinDiscovery_tool_js_1.default.registerTools(server);
    swap_tool_js_1.default.registerTools(server);
    serverLogger.info('All tools and resources registered successfully');
    return server;
}
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.post('/mcp', async (req, res) => {
    const sessionIdHeader = req.headers['mcp-session-id'];
    let sessionEntry = null;
    if (sessionIdHeader && sessions[sessionIdHeader]) {
        sessionEntry = sessions[sessionIdHeader];
    }
    else if (!sessionIdHeader && (0, types_js_1.isInitializeRequest)(req.body)) {
        const newSessionId = (0, crypto_1.randomUUID)();
        const transport = new streamableHttp_js_1.StreamableHTTPServerTransport({
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
        sessionEntry = sessions[newSessionId];
    }
    else {
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
async function handleSessionRequest(req, res) {
    const sessionIdHeader = req.headers['mcp-session-id'];
    if (!sessionIdHeader || !sessions[sessionIdHeader]) {
        res.status(400).send('Invalid or missing session ID');
        return;
    }
    const { transport } = sessions[sessionIdHeader];
    await transport.handleRequest(req, res);
}
app.get('/mcp', handleSessionRequest);
app.delete('/mcp', handleSessionRequest);
const PORT = 7171;
app.listen(PORT, () => {
    console.log(`MCP Server listening on port ${PORT}`);
});
//# sourceMappingURL=index.js.map