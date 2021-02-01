import { Client } from "./src/components/client.ts";
import { DISCORD_TOKEN } from "./config.ts";

const client = new Client(DISCORD_TOKEN, {
  intents: ["GUILDS", "GUILD_MESSAGES"],
});
