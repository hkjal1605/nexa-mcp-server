"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.McpError = exports.ErrorType = void 0;
exports.createAuthMissingError = createAuthMissingError;
exports.createAuthInvalidError = createAuthInvalidError;
exports.createApiError = createApiError;
exports.createUnexpectedError = createUnexpectedError;
exports.ensureMcpError = ensureMcpError;
exports.getDeepOriginalError = getDeepOriginalError;
exports.formatErrorForMcpTool = formatErrorForMcpTool;
exports.formatErrorForMcpResource = formatErrorForMcpResource;
exports.handleCliError = handleCliError;
const logger_util_js_1 = require("./logger.util.js");
/**
 * Error types for classification
 */
var ErrorType;
(function (ErrorType) {
    ErrorType["AUTH_MISSING"] = "AUTH_MISSING";
    ErrorType["AUTH_INVALID"] = "AUTH_INVALID";
    ErrorType["API_ERROR"] = "API_ERROR";
    ErrorType["UNEXPECTED_ERROR"] = "UNEXPECTED_ERROR";
})(ErrorType || (exports.ErrorType = ErrorType = {}));
/**
 * Custom error class with type classification
 */
class McpError extends Error {
    type;
    statusCode;
    originalError;
    constructor(message, type, statusCode, originalError) {
        super(message);
        this.name = 'McpError';
        this.type = type;
        this.statusCode = statusCode;
        this.originalError = originalError;
    }
}
exports.McpError = McpError;
/**
 * Create an authentication missing error
 */
function createAuthMissingError(message = 'Authentication credentials are missing') {
    return new McpError(message, ErrorType.AUTH_MISSING);
}
/**
 * Create an authentication invalid error
 */
function createAuthInvalidError(message = 'Authentication credentials are invalid') {
    return new McpError(message, ErrorType.AUTH_INVALID, 401);
}
/**
 * Create an API error
 */
function createApiError(message, statusCode, originalError) {
    return new McpError(message, ErrorType.API_ERROR, statusCode, originalError);
}
/**
 * Create an unexpected error
 */
function createUnexpectedError(message = 'An unexpected error occurred', originalError) {
    return new McpError(message, ErrorType.UNEXPECTED_ERROR, undefined, originalError);
}
/**
 * Ensure an error is an McpError
 */
function ensureMcpError(error) {
    if (error instanceof McpError) {
        return error;
    }
    if (error instanceof Error) {
        return createUnexpectedError(error.message, error);
    }
    return createUnexpectedError(String(error));
}
/**
 * Get the deepest original error from an error chain
 * @param error The error to extract the original cause from
 * @returns The deepest original error or the error itself
 */
function getDeepOriginalError(error) {
    if (!error) {
        return error;
    }
    let current = error;
    let depth = 0;
    const maxDepth = 10; // Prevent infinite recursion
    while (depth < maxDepth &&
        current instanceof Error &&
        'originalError' in current &&
        current.originalError) {
        current = current.originalError;
        depth++;
    }
    return current;
}
/**
 * Format error for MCP tool response
 */
function formatErrorForMcpTool(error) {
    const methodLogger = logger_util_js_1.Logger.forContext('utils/error.util.ts', 'formatErrorForMcpTool');
    const mcpError = ensureMcpError(error);
    methodLogger.error(`${mcpError.type} error`, mcpError);
    // Get the deep original error for additional context
    const originalError = getDeepOriginalError(mcpError.originalError);
    // Safely extract details from the original error
    const errorDetails = originalError instanceof Error
        ? { message: originalError.message }
        : originalError;
    return {
        content: [
            {
                type: 'text',
                text: `Error: ${mcpError.message}`,
            },
        ],
        metadata: {
            errorType: mcpError.type,
            statusCode: mcpError.statusCode,
            errorDetails,
        },
    };
}
/**
 * Format error for MCP resource response
 */
function formatErrorForMcpResource(error, uri) {
    const methodLogger = logger_util_js_1.Logger.forContext('utils/error.util.ts', 'formatErrorForMcpResource');
    const mcpError = ensureMcpError(error);
    methodLogger.error(`${mcpError.type} error`, mcpError);
    return {
        contents: [
            {
                uri,
                text: `Error: ${mcpError.message}`,
                mimeType: 'text/plain',
                description: `Error: ${mcpError.type}`,
            },
        ],
    };
}
/**
 * Handle error in CLI context with improved user feedback
 */
function handleCliError(error) {
    const methodLogger = logger_util_js_1.Logger.forContext('utils/error.util.ts', 'handleCliError');
    const mcpError = ensureMcpError(error);
    methodLogger.error(`${mcpError.type} error`, mcpError);
    // Get the deep original error for more context
    const originalError = getDeepOriginalError(mcpError.originalError);
    // Print the error message
    console.error(`Error: ${mcpError.message}`);
    // Provide helpful context based on error type
    if (mcpError.type === ErrorType.AUTH_MISSING) {
        console.error('\nTip: Make sure to set up your API token in the configuration file or environment variables.');
    }
    else if (mcpError.type === ErrorType.AUTH_INVALID) {
        console.error('\nTip: Check that your API token is correct and has not expired.');
    }
    else if (mcpError.type === ErrorType.API_ERROR) {
        if (mcpError.statusCode === 429) {
            console.error('\nTip: You may have exceeded your API rate limits. Try again later or upgrade your API plan.');
        }
        // Add ip-api.com specific context if available
        if (originalError && typeof originalError === 'object') {
            const origErr = originalError;
            if (origErr.status === 'fail' && origErr.message) {
                console.error(`\nAPI returned failure: ${String(origErr.message)}`);
            }
        }
    }
    // Display DEBUG tip
    if (process.env.DEBUG !== 'mcp:*') {
        console.error('\nFor more detailed error information, run with DEBUG=mcp:* environment variable.');
    }
    process.exit(1);
}
//# sourceMappingURL=error.util.js.map