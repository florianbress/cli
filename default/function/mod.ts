import { startBot } from "./deps.ts";
import { DISCORD_TOKEN } from "./config.ts";

await startBot({
  token: DISCORD_TOKEN,
  intents: ["GUILDS", "GUILD_MESSAGES"],
});
