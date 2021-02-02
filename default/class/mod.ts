import { DISCORD_TOKEN } from "./config.ts";
import { Client } from "./src/components/client.ts";

const client = new Client(DISCORD_TOKEN, {
  intents: ["GUILDS", "GUILD_MESSAGES"],
});
