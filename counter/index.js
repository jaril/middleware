#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

/**
 * Counter MCP Server
 * 
 * Provides a simple tool to count letters in text prompts.
 */

const server = new Server(
  {
    name: "counter-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "count_letters",
        description: "Count letters in text",
        inputSchema: {
          type: "object",
          properties: {
            text: {
              type: "string",
              description: "Text to count letters in",
            },
          },
          required: ["text"],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const text = request.params.arguments.text;
  const letterCount = text.replace(/[^a-zA-Z]/g, '').length;

  return {
    content: [
      {
        type: "text",
        text: `${letterCount}`,
      },
    ],
  };
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Counter MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
}); 