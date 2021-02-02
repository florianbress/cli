import { List } from "https://deno.land/x/cliffy@v0.17.0/prompt/list.ts";
import { Secret } from "https://deno.land/x/cliffy@v0.17.0/prompt/secret.ts";
import { Checkbox, Input, prompt } from "./deps.ts";

const result = await prompt([{
  name: "name",
  message: "Enter the name of the bot:",
  default: "discordeno-bot",
  type: Input,
}, {
  name: "template",
  message: "Select a template for the bot:",
  default: "basic",
  type: Input,
  suggestions: ["basic", "advanced"],
  list: true,
}, {
  name: "type",
  message: "Enter the type for the project:",
  default: "function",
  type: Input,
  suggestions: ["class", "function"],
  list: true,
}, {
  name: "configuration",
  message: "Select the Setting to Configure",
  type: Checkbox,
  options: [
    "token",
    "prefix",
    "supportServerID",
    "channelIds",
    "roleIDs",
    "userIDs",
  ],
}, {
  name: "token",
  message: "Enter the Bot Token:",
  type: Secret,
  before: async ({ configuration }, next) => {
    if (configuration?.includes("token")) {
      await next(); // run token prompt
    } else {
      await next(true); // skip token prompt
    }
  },
}, {
  name: "prefix",
  message: "Enter the Prefix:",
  type: Input,
  default: "!",
  before: async ({ configuration }, next) => {
    if (configuration?.includes("prefix")) {
      await next(); // run prefix prompt
    } else {
      await next(true); // skip prefix prompt
    }
  },
}, {
  name: "supportServerID",
  message: "Enter the support-server ID:",
  type: Input,
  default: "",
  before: async ({ configuration }, next) => {
    if (configuration?.includes("supportServerID")) {
      await next(); // run prefix prompt
    } else {
      await next(true); // skip prefix prompt
    }
  },
}, {
  name: "missingTranslationID",
  message: "Enter the missing-translation ID:",
  type: Input,
  default: "",
  before: async ({ configuration }, next) => {
    if (configuration?.includes("channelIds")) {
      await next(); // run prefix prompt
    } else {
      await next(true); // skip prefix prompt
    }
  },
}, {
  name: "errorChannelID",
  message: "Enter the error-channel ID:",
  type: Input,
  default: "",
  before: async ({ configuration }, next) => {
    if (configuration?.includes("channelIds")) {
      await next(); // run prefix prompt
    } else {
      await next(true); // skip prefix prompt
    }
  },
}, {
  name: "patreonVIPRoleID",
  message: "Enter the patreon-VIP-role ID:",
  type: Input,
  default: "!",
  before: async ({ configuration }, next) => {
    if (configuration?.includes("roleIDs")) {
      await next(); // run prefix prompt
    } else {
      await next(true); // skip prefix prompt
    }
  },
}, {
  name: "botSupporters",
  message: "Enter the bot-Supporters ID:",
  type: List,
  before: async ({ configuration }, next) => {
    if (configuration?.includes("userIDs")) {
      await next(); // run prefix prompt
    } else {
      await next(true); // skip prefix prompt
    }
  },
}, {
  name: "botDevs",
  message: "Enter the bot-devs ID:",
  type: List,
  before: async ({ configuration }, next) => {
    if (configuration?.includes("userIDs")) {
      await next(); // run prefix prompt
    } else {
      await next(true); // skip prefix prompt
    }
  },
}, {
  name: "botOwners",
  message: "Enter the bot-Owners ID:",
  type: List,
  before: async ({ configuration }, next) => {
    if (configuration?.includes("userIDs")) {
      await next(); // run prefix prompt
    } else {
      await next(true); // skip prefix prompt
    }
  },
}]);

console.log(result);
