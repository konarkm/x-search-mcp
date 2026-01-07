# x-search-mcp

Minimal MCP server for xAI X search using the Responses API and structured outputs.

## Features
- Single MCP tool: `x_search`
- Uses xAI Responses API with `x_search` tool calling
- Structured output parsing + citation normalization

## Requirements
- Node.js >= 18
- `XAI_API_KEY` environment variable

## Install
```bash
npm install
npm run build
```

## Run (stdio)
```bash
XAI_API_KEY=your-key-here node dist/index.js
```

## MCP Tool
### `x_search`
Searches X with optional filters.

**Input**
```json
{
  "query": "string",
  "allowed_x_handles": ["string"],
  "excluded_x_handles": ["string"],
  "from_date": "YYYY-MM-DD",
  "to_date": "YYYY-MM-DD",
  "enable_image_understanding": true,
  "enable_video_understanding": true,
  "include_raw_response": false
}
```

**Output**
```json
{
  "answer": "string",
  "citations": ["https://x.com/..."],
  "inline_citations": [
    {
      "url": "https://x.com/...",
      "start_index": 10,
      "end_index": 42,
      "title": "1"
    }
  ]
}
```

## Environment Variables
- `XAI_API_KEY` (required)
- `XAI_MODEL` (default: `grok-4-1-fast`)
- `XAI_BASE_URL` (default: `https://api.x.ai/v1`)
- `XAI_TIMEOUT` (default: `30000`)

## Notes
- `allowed_x_handles` and `excluded_x_handles` are mutually exclusive.
- Date filters must be `YYYY-MM-DD` and `from_date` must be <= `to_date`.
