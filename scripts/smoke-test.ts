import path from "node:path";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function main() {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) {
    throw new Error("XAI_API_KEY is required for smoke-test");
  }

  const serverPath = path.resolve(process.cwd(), "dist/index.js");
  const transport = new StdioClientTransport({
    command: "node",
    args: [serverPath],
    env: { XAI_API_KEY: apiKey },
  });

  const client = new Client({ name: "x-search-smoke-test", version: "0.1.0" });
  await client.connect(transport);

  const tools = await client.listTools();
  console.log("tools:", tools.tools.map((tool) => tool.name));

  const result = await client.callTool({
    name: "x_search",
    arguments: {
      query: "Summarize the latest post from @xai in one sentence.",
      allowed_x_handles: ["xai"],
      from_date: "2025-12-01",
    },
  });

  const responseText = result.content?.[0]?.text ?? "";
  console.log("result:", responseText);

  await client.close();
}

main().catch((error) => {
  console.error("Smoke test failed:", error);
  process.exit(1);
});
