import { BotConfig, startBot } from "../../deps.ts";

export class Client {
  constructor(protected token: string, protected options?: ClientOptions) {
  }

  async connect() {
    await startBot({
      token: this.token,
      intents: this.options?.intents ?? [],
    });
  }
}

export interface ClientOptions {
  intents: BotConfig["intents"];
}
