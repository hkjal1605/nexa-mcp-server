"use strict";
/**
 * Standardized formatting utilities for consistent output across all CLI and Tool interfaces.
 * These functions should be used by all formatters to ensure consistent formatting.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = formatDate;
exports.formatUrl = formatUrl;
exports.formatHeading = formatHeading;
exports.formatBulletList = formatBulletList;
exports.formatSeparator = formatSeparator;
/**
 * Format a date in a standardized way: YYYY-MM-DD HH:MM:SS UTC
 * @param dateString - ISO date string or Date object
 * @returns Formatted date string
 */
function formatDate(dateString) {
    if (!dateString) {
        return 'Not available';
    }
    try {
        const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
        // Format: YYYY-MM-DD HH:MM:SS UTC
        return date
            .toISOString()
            .replace('T', ' ')
            .replace(/\.\d+Z$/, ' UTC');
    }
    catch {
        return 'Invalid date';
    }
}
/**
 * Format a URL as a markdown link
 * @param url - URL to format
 * @param title - Link title
 * @returns Formatted markdown link
 */
function formatUrl(url, title) {
    if (!url) {
        return 'Not available';
    }
    const linkTitle = title || url;
    return `[${linkTitle}](${url})`;
}
/**
 * Format a heading with consistent style
 * @param text - Heading text
 * @param level - Heading level (1-6)
 * @returns Formatted heading
 */
function formatHeading(text, level = 1) {
    const validLevel = Math.min(Math.max(level, 1), 6);
    const prefix = '#'.repeat(validLevel);
    return `${prefix} ${text}`;
}
/**
 * Format a list of key-value pairs as a bullet list
 * @param items - Object with key-value pairs
 * @param keyFormatter - Optional function to format keys
 * @returns Formatted bullet list
 */
function formatBulletList(items, keyFormatter) {
    const lines = [];
    for (const [key, value] of Object.entries(items)) {
        if (value === undefined || value === null) {
            continue;
        }
        const formattedKey = keyFormatter ? keyFormatter(key) : key;
        const formattedValue = formatValue(value);
        lines.push(`- **${formattedKey}**: ${formattedValue}`);
    }
    return lines.join('\n');
}
/**
 * Format a value based on its type
 * @param value - Value to format
 * @returns Formatted value
 */
function formatValue(value) {
    if (value === undefined || value === null) {
        return 'Not available';
    }
    if (value instanceof Date) {
        return formatDate(value);
    }
    // Handle URL objects with url and title properties
    if (typeof value === 'object' && value !== null && 'url' in value) {
        const urlObj = value;
        if (typeof urlObj.url === 'string') {
            return formatUrl(urlObj.url, urlObj.title);
        }
    }
    if (typeof value === 'string') {
        // Check if it's a URL
        if (value.startsWith('http://') || value.startsWith('https://')) {
            return formatUrl(value);
        }
        // Check if it might be a date
        if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
            return formatDate(value);
        }
        return value;
    }
    if (typeof value === 'boolean') {
        return value ? 'Yes' : 'No';
    }
    return String(value);
}
/**
 * Format a separator line
 * @returns Separator line
 */
function formatSeparator() {
    return '---';
}
//# sourceMappingURL=formatter.util.js.map