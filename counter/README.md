# Counter MCP Server

A simple Model Context Protocol (MCP) server that counts letters in text prompts.

## Features

- Count letters (a-z, A-Z) in text
- Simple, focused functionality
- Fast and efficient

## Installation

```bash
cd counter
npm install
```

## Usage

### As an MCP Server

The server can be used with any MCP-compatible client by adding it to your configuration:

```json
{
  "mcpServers": {
    "counter": {
      "command": "node",
      "args": ["path/to/counter/index.js"]
    }
  }
}
```

### Development

```bash
# Start the server
npm start

# Start with auto-reload during development
npm run dev
```

## Tool: count_letters

Counts the number of letters (alphabetic characters a-z, A-Z) in the provided text.

### Parameters

- `text` (required): The text to count letters in

### Example Usage

```javascript
// Count letters in text
await mcp.callTool("count_letters", { text: "Hello World!" });
// Returns: 10

await mcp.callTool("count_letters", { text: "mic test" });
// Returns: 7
```

## Response Format

The tool returns just the number of letters found in the text. 